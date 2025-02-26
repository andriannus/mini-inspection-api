import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import dbConfig from 'src/shared/config/database.config';

import { UploadModule } from 'src/upload/upload.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongooseModule.forRootAsync(dbConfig.asProvider()),
    ConfigModule.forRoot(),
    UploadModule,
  ],
})
export class AppModule {}
