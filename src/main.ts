import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.use(cookieParser());
  app.setGlobalPrefix('app/v1')
  const port = process.env.PROJECT_PORT
  await app.listen(port, ()=> {console.log(`listening on port:${port}`);
});

}
bootstrap();
