import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle('Real World Application')
        .setDescription('API description')
        .setVersion('1.0.0')
        .addBearerAuth()
        .addTag('audit-logs')
        .addTag('auth')
        .addTag('organizations')
        .addTag('teams')
        .addTag('users')
        .build();
    const document = SwaggerModule.createDocument(app, options, {
        include: []
    });
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
