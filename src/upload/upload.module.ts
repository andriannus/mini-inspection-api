import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Upload, UploadSchema } from 'src/upload/upload.schema';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
  ],
})
export class UploadModule {}
