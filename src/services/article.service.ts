import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async paginate(query: {skip: number, take: number}): Promise<ArticleEntity[]> {
    const articles = this.articleRepository.find({ take: query.take, skip: query.skip });
    return articles;
  }
}
