import { Field, Float, ID, Int, ObjectType, InputType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CityEntity } from 'src/entities/city.entity';
import { GenderEntity } from 'src/entities/gender.entity';
import { ZodiacEntity } from 'src/entities/zodiac.entity';
import { BaseResponse } from 'src/entities/common';
import { IsEmail } from 'class-validator';

@ObjectType()
@Entity({ name: 'account' })
export class AccountEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id!: number;

  @Field(() => String)
  @Column({
    name: 'username',
    type: 'varchar',
    length: 25,
  })
  username!: string;

  @Column({
    name: 'password',
    type: 'text',
  })
  password!: string;

  @Field(() => String)
  @Column({
    name: 'first_name',
    type: 'nvarchar',
    length: 40,
  })
  firstName!: string;

  @Field(() => String)
  @Column({
    name: 'last_name',
    type: 'nvarchar',
    length: 40,
  })
  lastName!: string;

  @Field(() => String)
  @Column({
    name: 'email',
    type: 'varchar',
    length: 80,
    nullable: true,
  })
  @IsEmail()
  email?: string;

  @Field(() => Int)
  @Column({
    name: 'city_id',
    type: 'int',
    nullable: true,
  })
  cityId?: number;

  // @Field(() => Int)
  @Column({
    name: 'gender_id',
    type: 'int',
    nullable: true,
  })
  genderId?: number;

  @Field(() => Int)
  @Column({
    name: 'age',
    type: 'int',
    nullable: true,
  })
  age?: number;

  @Field(() => String)
  @Column({
    name: 'phone_no',
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  phoneNo?: string;

  @Field(() => String)
  @Column({
    name: 'education',
    type: 'nvarchar',
    length: 100,
    nullable: true,
  })
  education?: string;

  @Field(() => String)
  @Column({
    name: 'occupation',
    type: 'nvarchar',
    length: 50,
    nullable: true,
  })
  occupation?: string;

  @Field(() => Float)
  @Column({
    name: 'income',
    type: 'float',
    nullable: true,
  })
  income?: number;

  @Field(() => Boolean)
  @Column({
    name: 'marriage',
    type: 'bit',
    nullable: true,
  })
  marriage?: boolean;

  @Field(() => Int)
  @Column({
    name: 'children',
    type: 'int',
    nullable: true,
  })
  children?: number;

  @Field(() => Int)
  @Column({
    name: 'zodiac_id',
    type: 'int',
    nullable: true,
  })
  zodiacId?: number;

  @Field(() => String)
  @Column({
    name: 'introduction',
    type: 'text',
    nullable: true,
  })
  introduction?: string;

  @Field(() => Float)
  @Column({
    name: 'fee',
    type: 'float',
    nullable: true,
  })
  fee?: number;

  @Field(() => CityEntity)
  @JoinColumn({
    name: 'city_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => CityEntity, city => city.accounts)
  city?: CityEntity;

  @Field(() => GenderEntity, { nullable: true })
  @ManyToOne(() => GenderEntity)
  @JoinColumn({
    name: 'gender_id',
    referencedColumnName: 'id',
  })
  gender?: GenderEntity;

  @Field(() => ZodiacEntity)
  @JoinColumn({
    name: 'zodiac_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => ZodiacEntity, zodiac => zodiac.accounts)
  zodiac?: ZodiacEntity;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdDate: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedDate: Date;
}


@InputType()
export class AccountInput {
  @Field(() => String)
  username!: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 25,
  })
  password!: string;

  @Field(() => String)
  @Column({
    name: 'first_name',
    type: 'nvarchar',
    length: 40,
  })
  firstName?: string;

  @Field(() => String)
  @Column({
    name: 'last_name',
    type: 'nvarchar',
    length: 40,
  })
  lastName?: string;

  @Field(() => String)
  @Column({
    name: 'email',
    type: 'varchar',
    length: 80,
  })
  email: string;
}

@ObjectType()
export class AccountResponse extends BaseResponse {
  @Field(() => AccountEntity, { nullable: true })
  account?: AccountEntity;
  @Field(() => String)
  token?: string;
}
