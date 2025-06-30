import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieSession from 'cookie-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cookieSession({
      name: 'session',
      keys: ['asd'],
      maxAge: 24 * 60 * 60 * 1000,
    }),
  );
  app.enableCors({
    origin: true, // Twój front
    credentials: true, // pozwala na ciasteczka
  });
  await app.listen(5000,'0.0.0.0');
}
bootstrap();
