import type { PutObjectCommandInput } from '@aws-sdk/client-s3';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import type { Model } from 'mongoose';

import { Upload } from './upload.schema';
import type { UploadFile, UploadQuery } from './upload.type';

@Injectable()
export class UploadService implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    @InjectModel(Upload.name) private uploadModel: Model<Upload>,
  ) {}

  private s3: S3Client;

  onModuleInit() {
    this.s3 = new S3Client({
      region: this.configService.get('AWS_REGION') as string,
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

        const params: PutObjectCommandInput = {
          Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
          Key: fileKey,
        };

        const command = new PutObjectCommand(params);
        const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

        await this.uploadModel.create({ name: customName, key: fileKey, url });

        return { url, key: fileKey };
      }),
    );

    return urls;
  }

  async getFiles(query: UploadQuery) {
    const filter: Record<string, unknown> = {};

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
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

    return {
      data: files,
      page,
      total_data: totalFiles,
      total_pages: Math.ceil(totalFiles / limit),
    };
  }
}
