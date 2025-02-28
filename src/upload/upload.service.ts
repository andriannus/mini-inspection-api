import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import type { Model } from 'mongoose';

import { responseSuccess } from 'src/shared/utils/response.util';
import { Pagination } from 'src/shared/types/response.type';

import { Upload } from './upload.schema';
import type { UploadFile, UploadQuery } from './upload.type';

@Injectable()
export class UploadService implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    @InjectModel(Upload.name) private uploadModel: Model<Upload>,
  ) {}

  private s3: S3Client;

  private awsBucketName: string;
  private awsRegion: string;

  onModuleInit() {
    this.awsBucketName = this.configService.get('AWS_BUCKET_NAME') as string;
    this.awsRegion = this.configService.get('AWS_REGION') as string;

    this.s3 = new S3Client({
      region: this.awsRegion,
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') as string,
        secretAccessKey: this.configService.get(
          'AWS_SECRET_ACCESS_KEY',
        ) as string,
      },
    });
  }

  async generatePresignedUrls(files: UploadFile[]) {
    const urls = await Promise.all(
      files.map(async ({ custom_name: customName, name }) => {
        const fileKey = `images/${dayjs().format('YYYY-MM-DD')}/${name}`;
        const fileUrl = `https://${this.awsBucketName}.s3.${this.awsRegion}.amazonaws.com/${fileKey}`;

        const command = new PutObjectCommand({
          Bucket: this.awsBucketName,
          Key: fileKey,
        });

        const presignedUrl = await getSignedUrl(this.s3, command, {
          expiresIn: 3600,
        });

        await this.uploadModel.create({
          name: customName,
          key: fileKey,
          url: fileUrl,
        });

        return presignedUrl;
      }),
    );

    return responseSuccess(urls);
  }

  async getFiles(query: UploadQuery) {
    const filter: Record<string, unknown> = {};

    const page = Number(query.page) || 1;
    const limit = Number(query.per_page) || 10;
    const skip = (page - 1) * limit;

    if (query.start_date && query.end_date) {
      filter.createdAt = {
        $gte: dayjs(query.start_date).format(),
        $lte: dayjs(query.end_date).add(1, 'd').format(), // I don't know why it needs to be added 1 day.
      };
    }

    const files = await this.uploadModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const totalFiles = await this.uploadModel.countDocuments(filter);

    return responseSuccess<{ files: typeof files; pagination: Pagination }>({
      files,
      pagination: {
        page,
        per_page: limit,
        total_data: totalFiles,
        total_page: Math.ceil(totalFiles / limit),
      },
    });
  }
}
