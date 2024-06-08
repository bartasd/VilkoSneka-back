import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS globally
  app.useGlobalPipes(new ValidationPipe()); // ENABLING VALIDATION GLOBALLY
  await app.listen(3001);
}
bootstrap();
