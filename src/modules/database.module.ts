import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from 'src/entities/all.entity';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [...Entities],
      synchronize: true,
      autoLoadEntities: true,
      retryDelay: 100000,
      debug: false,
      timezone: 'GMT+0900',
    }),
  ],
})
export class DatabaseModule {}
