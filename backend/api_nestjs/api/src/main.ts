import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './shared/app/app.module';
import { PrismaModel } from './entities';

async function main() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('api nestjs')
    .setDescription('the api create products &  users')
    .setVersion('1.0')
    .addTag('compare')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [...PrismaModel.extraModels],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
main();
