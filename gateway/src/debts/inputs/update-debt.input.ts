import { CreateDebtInput } from './create-debt.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDebtInput extends PartialType(CreateDebtInput) {
  @Field(() => String)
  id: string;
}
