import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDebtInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  title: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  description?: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  totalAmount: number;
}
