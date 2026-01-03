import { Module, Controller, Get } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';

@Controller()
export class AppController {
    @Get()
    getHello(): string {
        return 'Backend is running! GraphQL at /graphql';
    }
}

@Module({
    imports: [
        // GraphQL configuration
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: true,
            context: ({ req }) => {
                console.log('GraphQL context created for request:', req.url);
                return { req };
            },
        }),

        // Database configuration
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database.sqlite',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, // Auto-create schema (disable in production)
        }),

        AuthModule,
        BooksModule,
    ],
})
export class AppModule { }
