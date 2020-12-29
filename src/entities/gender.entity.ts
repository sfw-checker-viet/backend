import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from 'src/entities/account.entity';

@ObjectType()
@Entity({ name: 'gender' })
export class GenderEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id!: number;

  @Field(() => String)
  @Column({
    name: 'gender_type',
    type: 'nvarchar',
    length: 20,
  })
  genderType?: string;

  @Field(() => [AccountEntity])
  @OneToMany(() => AccountEntity, account => account.gender)
  accounts?: AccountEntity[];
}