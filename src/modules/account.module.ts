import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountResolver } from 'src/resolvers/account.resolver';
import { AccountService } from 'src/services/account.service';
import { JwtStrategy } from 'src/modules/auth/jwt.strategy';
import { AuthController } from 'src/controllers/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
    }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: 60 },
    }),
  ],
  providers: [AccountService, AccountResolver, JwtStrategy],
  exports: [AccountService, PassportModule],
  controllers: [AuthController,]
})
export class AccountModule {}
