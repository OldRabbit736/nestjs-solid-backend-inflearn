import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APPLICATION_PORT;
  await app.listen(port);
}
bootstrap();
