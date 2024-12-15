import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // Enable all log levels
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  // Enable CORS for all origins
  app.enableCors({
    origin: [""], // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
  });

  const config = new DocumentBuilder()
    .setTitle('common-service')
    .setDescription('API documentation for common-service')
    .setVersion('1.0')
    .addTag('common-service')
    .build();

  await app.listen(process.env.COMMON_PORT || 80);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
