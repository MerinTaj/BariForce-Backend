import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  // ✅ Enable CORS for your frontend
  app.enableCors({
    origin: 'http://localhost:5000',   // your frontend URL
    credentials: true,                 // allow cookies/authorization headers
  });
  
  await app.listen(3000);
}
bootstrap();