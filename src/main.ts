import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from "./core/interceptor/transform.interceptor";
  // 1.引入NestExpressApplication
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('管理后台')   
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors()
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor);
  app.enableCors();
  // 3.配置静态资源目录
  app.useStaticAssets('../public');
  app.useStaticAssets('../dist');
  //await app.listen(3000);
   await app.listen(8080);
}
bootstrap();
