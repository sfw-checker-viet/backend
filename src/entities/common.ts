import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FieldError {
  @Field(() => String)
  field?: string;
  @Field(() => String)
  message?: string;
}

@ObjectType()
export class BaseResponse {
  @Field(() => [FieldError], { nullable: true, })
  errors?: FieldError[];
}
