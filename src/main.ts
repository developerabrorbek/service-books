import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { MicroserviceOptions } from '@nestjs/microservices';
import { appConfig } from '@config';
import { ValidationPipe } from '@nestjs/common';
import { RcpExceptionFilter } from '@filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    appConfig,
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true, 
    }),
  );

  app.useGlobalFilters(new RcpExceptionFilter());
  await app.listen();
}
bootstrap();
