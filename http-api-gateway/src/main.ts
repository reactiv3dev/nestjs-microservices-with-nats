import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT,() => console.log(`API Gateway Listening to port: ${PORT}`));
}
bootstrap();
