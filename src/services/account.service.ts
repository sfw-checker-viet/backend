import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity, AccountInput } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepo: Repository<AccountEntity>,
    private jwtService: JwtService,
  ) {}

  createToken({ id, username }: AccountEntity): string {
    return this.jwtService.sign({ id, username });
  }

  async register(accountInput: AccountInput): Promise<AccountEntity> {
    const account = this.accountRepo.create(accountInput);
    this.accountRepo.insert(account);
    return account;
  }

  async login({ username, email }: AccountInput): Promise<AccountEntity> {
    if (username) {
      return this.accountRepo.findOne({ where: { username } });
    }
    if (email) {
      return this.accountRepo.findOne({ where: { email } });
    }
  }
}
