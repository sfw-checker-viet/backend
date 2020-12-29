import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from './account.entity';
import { BaseResponse } from './common';

@Entity({ name: 'article' })
@ObjectType()
export class ArticleEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id!: number;

  @Field(() => AccountEntity, { nullable: false })
  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
  account: AccountEntity;

  @Field(() => String, { nullable: false })
  @Column({
    name: 'title',
    type: 'nvarchar',
    length: 200
  })
  @MaxLength(200)
  title!: string;

  @Field(() => String, { nullable: false })
  @Column({
    name: 'content',
    type: 'text',
  })
  content!: string;

  @Field(() => Date)
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()'
  })
  createdDate: Date;

  @Field(() => Date)
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedDate: Date;
}


@ObjectType()
export class ArticleResponse extends BaseResponse {
  @Field(() => ArticleEntity, { nullable: true })
  article?: ArticleEntity;
}