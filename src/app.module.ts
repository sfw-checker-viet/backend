import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/modules/database.module';
import { GraphqlModule } from 'src/modules/graphql.module';

@Module({
  imports: [
    DatabaseModule,
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
