import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Response } from 'express';
import { AccountEntity } from "src/entities/account.entity";

export const ResGql = createParamDecorator(
  (data: unknown, context: ExecutionContext): Response => GqlExecutionContext.create(context).getContext().res);
export const GqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AccountEntity => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.user;
  }
);