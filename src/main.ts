import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { createServer } from 'http';
import { initSocketIo } from './socket-io.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS globally
  app.useGlobalPipes(new ValidationPipe()); // Enable validation globally

  const server = createServer(app.getHttpAdapter().getInstance()); // Create HTTP server with NestJS app instance
  initSocketIo(server); // Initialize the Socket.io instance

  await app.init(); // Initialize the NestJS application without calling listen
  const port = 3001;
  server.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap();
