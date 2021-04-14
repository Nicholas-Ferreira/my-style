import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
const sgMail = require('@sendgrid/mail')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
    .setTitle('My Style')
    .setDescription('')
    .setVersion('1.0')
    .addTag('my-style')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
