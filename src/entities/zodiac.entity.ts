import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from 'src/entities/account.entity';

@ObjectType()
@Entity({ name: 'zodiac' })
export class ZodiacEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id!: number;

  @Field(() => String)
  @Column({
    name: 'zodiac_name',
    type: 'nvarchar',
    length: 50,
  })
  zodiacName?: string;

  @Field(() => [AccountEntity])
  @OneToMany(() => AccountEntity, account => account.zodiacId, {})
  accounts?: AccountEntity[];
}