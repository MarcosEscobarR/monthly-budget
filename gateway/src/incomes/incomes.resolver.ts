import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { IncomesService } from './incomes.service';
import { IncomePayload, IncomeRecordPayload } from './payloads/index';
import {
  CreateIncomeInput,
  CreateIncomeRecordInput,
  UpdateIncomeInput,
} from './inputs/index';

@Resolver(() => IncomePayload)
export class IncomesResolver {
  constructor(private readonly incomesService: IncomesService) {}

  @Query(() => IncomePayload, { name: 'listIncomes' })
  listIncomes() {
    return this.incomesService.listIncomes();
  }

  @Mutation(() => IncomePayload)
  createIncome(@Args('data') data: CreateIncomeInput) {
    return this.incomesService.createIncome(data);
  }

  @Mutation(() => IncomePayload)
  updateIncome(@Args('data') data: UpdateIncomeInput) {
    return this.incomesService.updateIncome(data);
  }

  @ResolveField(() => [IncomeRecordPayload], { name: 'records' })
  getIncomeRecords(@Parent() income: IncomePayload) {
    return this.incomesService.getIncomeRecords(income.id);
  }

  @Mutation(() => IncomeRecordPayload)
  createIncomeRecord(@Args('data') data: CreateIncomeRecordInput) {
    return this.incomesService.createIncomeRecord(data);
  }

  @Mutation(() => IncomeRecordPayload)
  updateIncomeRecord(@Args('data') data: UpdateIncomeInput) {
    return this.incomesService.updateIncomeRecord(data);
  }
}
