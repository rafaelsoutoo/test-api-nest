import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureSwagger(app);
  configureValidationPipe(app);
  await app.listen(process.env.PORT ?? 3333);
}

function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Quickness API')
    .setDescription('Swagger Quickness API with NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}


function configureValidationPipe(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not defined in DTOs
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are provided
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );
}
bootstrap();
