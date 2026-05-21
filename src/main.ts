import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bcrypt from "bcrypt";

async function bootstrap() {
  console.log(
    await bcrypt.hash("admin123", 10)
  );
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // or whatever port your React app uses
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
