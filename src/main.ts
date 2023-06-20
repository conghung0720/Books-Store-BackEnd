import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser = require('cookie-parser');
import { RolesGuard } from './roles/roles.guard';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  // app.use(
  //   cors({
  //     origin: 'http://localhost:3000',
  //     credentials: true,
  //     allowedHeaders: 'Content-Type, Accept',
  //   }),
  // );
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
