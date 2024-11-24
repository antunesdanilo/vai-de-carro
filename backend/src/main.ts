import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { ValidationError } from 'class-validator';
import { setupSwagger } from './configs/swagger.config';

// Carrega as variáveis do .env
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  app.use(bodyParser.json());

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors
          .map((error) => Object.values(error.constraints || {}))
          .join(', ');

        return new BadRequestException({
          error_code: 'INVALID_DATA',
          error_description: formattedErrors,
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
