import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { InspectionsModule } from './inspections/inspections.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [InspectionsModule],
})
export class AppModule {}
