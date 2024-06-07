import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import bodyParser = require("body-parser");
import * as compression from 'compression';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  app.use(compression());
  app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  const config = new DocumentBuilder()
    .setTitle('Chikiet')
    .setDescription('The Chikiet API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('ui', app, document);
  await app.listen(port);
}
bootstrap();