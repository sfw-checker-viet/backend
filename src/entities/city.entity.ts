import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccountEntity } from "src/entities/account.entity";

@ObjectType()
@Entity({ name: 'city' })
export class CityEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id!: number;

  @Field(() => String)
  @Column({
    name: 'city_name',
    type: 'nvarchar',
    length: 50,
    nullable: true,
  })
  cityName?: string;

  @Field(() => [AccountEntity])
  @OneToMany(() => AccountEntity, account => account.city)
  accounts?: AccountEntity[];
}
