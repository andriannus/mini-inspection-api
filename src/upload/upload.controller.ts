import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { UploadService } from './upload.service';
import type { UploadFile, UploadQuery } from './upload.type';

@Controller({ version: '1', path: 'upload' })
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('presigned-urls')
  async generatePresignedUrls(@Body('files') files: UploadFile[]) {
    return this.uploadService.generatePresignedUrls(files);
  }

  @Get('files')
  async getFiles(@Query() query: UploadQuery) {
    return this.uploadService.getFiles(query);
  }
}
