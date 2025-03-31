import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Debt {
  @Field(() => String, { description: 'Example field (placeholder)' })
  id: number;
  @Field(() => String, { description: 'Example field (placeholder)' })
  title: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  description?: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  totalAmount: number;
}
