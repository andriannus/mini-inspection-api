import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import dbConfig from './config/database.config';
import { InspectionsModule } from './inspections/inspections.module';
import { UploadModule } from './upload/upload.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongooseModule.forRootAsync(dbConfig.asProvider()),
    ConfigModule.forRoot(),
    InspectionsModule,
    UploadModule,
  ],
})
export class AppModule {}
