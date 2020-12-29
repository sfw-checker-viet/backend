import { ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { FieldError } from 'src/entities/common';

@Injectable()
export class GraphqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx?.headers?.authorization) {
      return false;
    }
    ctx.user = this.validateToken(ctx.headers.authorization)
    Logger.log(ctx.user);
    return true;
  }

  validateToken(auth: string): string | unknown | FieldError{
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];
    try {
      return jwt.verify(token, 'secret');
    } catch (error) {
      return {
        field: 'jwt',
        message: error.message,
      }
    }
  }

  // getRequest(context: ExecutionContext): Request {
  //   const ctx = GqlExecutionContext.create(context);
  //   return ctx.getContext().req;
  // }
}
