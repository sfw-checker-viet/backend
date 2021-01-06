import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
// import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from 'src/app.module';

async function bootstrap() {
  const DEV = Boolean(process.env.NODE_ENV === 'development');
  const PORT = Number(process.env.SERVER_PORT);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: DEV });
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  await app.listen(PORT, () => {
    Logger.log(`listening on port ${PORT}`);
  });
}
bootstrap();
