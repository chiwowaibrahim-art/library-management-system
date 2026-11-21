import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GenresModule } from './genres/genres.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    }),
    PrismaModule,
    GenresModule,
    BooksModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
