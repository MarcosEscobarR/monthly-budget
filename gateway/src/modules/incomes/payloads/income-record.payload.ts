import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IncomeRecordPayload {
  @Field(() => ID)
  id: string;

  @Field()
  amount: number;

  @Field()
  description: string;

  @Field()
  date: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
