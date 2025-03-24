import { Field, ID, PartialType } from '@nestjs/graphql';
import { CreateIncomeRecordInput } from './create-income-record.input';

export class UpdateIncomeRecordInput extends PartialType(
  CreateIncomeRecordInput,
) {
  @Field(() => ID)
  id: string;
}
