require('dotenv').config()
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setup } from './setup';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setup(app);

  const config = new DocumentBuilder()
   .setTitle('Auth Micro Services Documentation ')
   .setDescription('The API is use for micro services architecture deployment for authentication')
   .setVersion('1.0')
   .addTag('auth')
   .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
