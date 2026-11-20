import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3001);
    console.log('Server berjalan di http://localhost:3001');
    console.log('Akses weather forecast: http://localhost:3001/weather');
}
bootstrap();
