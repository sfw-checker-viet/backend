import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountService } from '../../services/account.service';

const cookieExtractor = (req: Request): string | null => req?.cookies?.token;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly accountService: AccountService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
    Logger.log(`jwt constructor`)
  }

  async validate(username: string, password: string): Promise<any> {
    Logger.log(`jwt validate`)
    return this.accountService.login({username, password, email: ''});
  }
}