import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(process.env.PORT);
}
bootstrap();

/**
 *
 * nest g module modules/user
 * nest g controller modules/user --no-spec
 * nest g service modules/user --no-spec
 */
