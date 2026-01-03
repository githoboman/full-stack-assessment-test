import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for frontend access
    app.enableCors({
        origin: ['http://localhost:5173', process.env.FRONTEND_URL],
        credentials: true,
    });

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Server is running on http://localhost:${port}/graphql`);
}
bootstrap();
