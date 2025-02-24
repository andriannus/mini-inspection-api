import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import dbConfig from './shared/config/database.config';

import { InspectionsModule } from './inspections/inspections.module';
import { UploadModule } from './upload/upload.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
