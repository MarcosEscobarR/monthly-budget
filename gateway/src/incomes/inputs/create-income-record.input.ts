import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateIncomeRecordInput {
  @Field()
  amount: number;

  @Field()
  incomeId: string;

  @Field()
  description: string;
}
