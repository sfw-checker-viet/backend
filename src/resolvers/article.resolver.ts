import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ArticleEntity, ArticleResponse } from "src/entities/article.entity";
import { ArticleService } from "src/services/article.service";

@Resolver(() => ArticleEntity)
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
  ) {}

  /**
   * create a new article
   */
  @Mutation(() => ArticleResponse)
  createArticle(
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<ArticleResponse> {
    return null;
  }

  @Query()
  async fetchArticle(
    @Args('skip') skip: number,
    @Args('take') take: number,
  ): Promise<ArticleEntity[]> {
    const articles = await this.articleService.paginate({ skip, take });
    return articles;
  }
}