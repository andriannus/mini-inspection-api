import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app
    .enableVersioning({
      type: VersioningType.URI,
    })
    .enableCors();

  await app.listen(process.env.PORT!);
}

bootstrap();
