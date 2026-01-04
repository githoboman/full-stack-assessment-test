import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  // TODO: Add environment variable validation in production
  // const requiredEnvVars = ['AUTH0_DOMAIN', 'AUTH0_AUDIENCE'];
  // for (const envVar of requiredEnvVars) {
  //     if (!process.env[envVar]) {
  //         throw new Error(`Missing required environment variable: ${envVar}`);
  //     }
  // }

  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend access
  const allowedOrigins = [
    "http://localhost:5173",
    "https://full-stack-assessment-test.vercel.app",
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
  ].filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server is running on http://localhost:${port}/graphql`);
}
bootstrap();
