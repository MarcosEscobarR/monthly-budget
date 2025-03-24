import { Field, ObjectType } from '@nestjs/graphql';
import { IncomeRecordPayload } from './income-record.payload';

@ObjectType()
export class IncomePayload {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field(() => [IncomeRecordPayload], { nullable: true })
  records?: IncomeRecordPayload[];
}
