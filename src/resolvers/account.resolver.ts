import { Field, InputType, Int, Mutation, ObjectType, Query, Resolver, Args, Context } from '@nestjs/graphql';
import { getRepository } from 'typeorm';
import { hash, verify } from 'argon2';

import { AccountEntity, AccountResponse } from 'src/entities/account.entity';
import { GenderEntity } from 'src/entities/gender.entity';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { AccountService } from 'src/services/account.service';
import { FieldError } from 'src/entities/common';
import { GraphqlAuthGuard } from 'src/modules/auth/graphql-auth.guard';
import { GqlUser, ResGql } from 'src/commons/decorator';
import { Response } from 'express';

@InputType()
class AccountInput {
  @Field(() => String)
  username!: string
  @Field(() => String)
  password!: string;
  @Field(() => String)
  firstName!: string;
  @Field(() => String)
  lastName!: string;
  @Field(() => String)
  email!: string;
  @Field(() => Int, { nullable: true })
  genderId?: number;
}

@Resolver(() => AccountEntity)
export class AccountResolver {

  constructor(
    @Inject(AccountService) private accountService: AccountService,
  ) {}

  // @UseGuards(new AuthService())
  @UseGuards(GraphqlAuthGuard)
  @Query(() => String)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async currentUser(
    @GqlUser() user: AccountEntity
  ): Promise<any> {
    return JSON.stringify(user);
  }

  /**
   * register for a new account
   * @param AccountInput required informaton
   */
  @Mutation(() => AccountResponse)
  async register(
    // @Args('username') username: string,
    // @Args('password') password: string,
    // @Args('firstName') firstName: string,
    // @Args('lastName') lastName: string,
    // @Args('email') email: string,
    @Args('options') { username, password, firstName, lastName, email }: AccountInput,
  ): Promise<AccountResponse> {
    const errors: FieldError[] = [];
    if (username?.length < 6) {
      errors.push({ field: 'username', message: 'username must be more than 6 characters', })
    }
    if (password?.length < 6) {
      errors.push({ field: 'password', message: 'password must be more than 6 characters', });
    }
    if (!firstName) {
      errors.push({ field: 'firstName', message: 'first name cannot be empty', });
    }
    if (!lastName) {
      errors.push({ field: 'lastName', message: 'last name cannot be empty', });
    }
    if (!email) {
      errors.push({ field: 'email', message: 'email cannot be empty', });
    }
    if (errors.length) {
      return { errors, account: null }
    }
    const hashedPass = await hash(password);
    const account = await this.accountService.register({ username, password: hashedPass, firstName, lastName, email });
    return { account, errors: null };
  }

  @Mutation(() => AccountResponse)
  async login(
    @Args('username', { nullable: true }) username: string,
    @Args('email', { nullable: true }) email: string,
    @Args('password') password: string,
    @ResGql() res: Response,
  ): Promise<AccountResponse> {
    const response: AccountResponse = {};
    const account = await this.accountService.login({ username, email, password });
    const valid = verify(account.password, password);
    if (valid) {
      const token = this.accountService.createToken(account);
      response.token = token;
      response.account = account;
      res.cookie('token', token, { httpOnly: true });
    }
    return response;
  }

  // update account information
  // @UseMiddleware(isAuth)
  @Mutation(() => AccountResponse)
  async updateAccount(
    @Args('options') {}: AccountInput
  ): Promise<AccountResponse> {
    return {};
  }
}