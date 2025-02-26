import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app
    .enableVersioning({
      type: VersioningType.URI,
    })
    .enableCors({
      origin: ['http://localhost:3001'],
      methods: ['GET', 'POST'],
      credentials: true,
    });

  await app.listen(process.env.PORT!);
}

bootstrap();
