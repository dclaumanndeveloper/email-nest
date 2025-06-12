import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './env';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // OpenAPI (Swagger) setup
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token', // <-- Security name
    )

    .setOpenAPIVersion('3.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useLogger(['error', 'warn', 'log']);
  app.enableCors();

  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? env.PORT);
}
bootstrap();
