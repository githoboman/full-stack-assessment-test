import { Module, Controller, Get } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksModule } from "./books/books.module";
import { AuthModule } from "./auth/auth.module";

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return "Backend is running! GraphQL at /graphql";
  }
}

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // GraphQL configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      context: ({ req, res }: { req: any; res: any }) => ({ req, res }),
    }),

    // Database configuration
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_URL ? "postgres" : "sqlite",
      database: process.env.DATABASE_URL ? undefined : "database.sqlite",
      url: process.env.DATABASE_URL,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: process.env.NODE_ENV !== "production",
      logging: process.env.NODE_ENV === "development",
    }),

    AuthModule,
    BooksModule,
  ],
})
export class AppModule { }
