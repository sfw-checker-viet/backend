import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AccountModule } from './account.module';

@Module({
  imports: [
    AccountModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join('src', 'schema.gql'),
      installSubscriptionHandlers: true,
      playground: true,
      context: ({ req, res }) => ({ req, res, headers: req.headers })
    }),
  ],
})
export class GraphqlModule {
}
