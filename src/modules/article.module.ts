import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { ArticleResolver } from 'src/resolvers/article.resolver';
import { AccountService } from 'src/services/account.service';
import { ArticleService } from 'src/services/article.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity])
  ],
  providers: [ArticleService, AccountService, ArticleResolver,],
  exports: [ArticleService]
})
export class ArticleModule {}
