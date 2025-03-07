import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateIncomeInput {
  @Field()
  title: string;
}
