import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { hash, verify } from "argon2";
import { AccountInput } from "src/entities/account.entity";
import { FieldError } from "src/entities/common";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import { AccountService } from "src/services/account.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly accountService: AccountService,
  ) {}

  @Post('register')
  async register(
    @Body() { username, password, firstName, lastName, email, }: AccountInput,
  ) {
    const errors: FieldError[] = [];
    if (username?.length < 6 && email?.length) {
      errors.push({ field: 'username/email', message: 'username or email must be more than 6 characters', })
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
    if (errors.length) {
      return { errors, account: null }
    }
    const hashedPass = await hash(password);
    const account = await this.accountService.register({ username, password: hashedPass, firstName, lastName, email });
    return { account, errors: null };
  }

  @Post('login')
  async login(
    @Body() userInput: AccountInput,
  ): Promise<any> {
    const account = await this.accountService.login(userInput);
    if (account?.password) {
      const valid = await verify(account.password, userInput.password);
      if (valid) {
        const token = this.accountService.createToken(account);
        return { accessToken: token };
      }
    }
    return {
      error: 'incorrect username of password',
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(
    @Req() req: any,
  ): Promise<any> {
    return req.user;
  }
}
