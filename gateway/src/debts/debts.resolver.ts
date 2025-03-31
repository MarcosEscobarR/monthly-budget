import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DebtsService } from './debts.service';
import { Debt } from './payloads/debt.payload';
import { CreateDebtInput } from './inputs/create-debt.input';
import { UpdateDebtInput } from './inputs/update-debt.input';

@Resolver(() => Debt)
export class DebtsResolver {
  constructor(private readonly debtsService: DebtsService) {}

  @Mutation(() => Debt)
  createDebt(@Args('createDebtInput') createDebtInput: CreateDebtInput) {
    return this.debtsService.create(createDebtInput);
  }

  @Query(() => [Debt], { name: 'debts' })
  findAll() {
    return this.debtsService.findAll();
  }

  @Query(() => Debt, { name: 'debt' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.debtsService.findOne(id);
  }

  @Mutation(() => Debt)
  updateDebt(@Args('updateDebtInput') updateDebtInput: UpdateDebtInput) {
    console.log({ updateDebtInput });
    return this.debtsService.update(updateDebtInput);
  }

  @Mutation(() => Debt)
  removeDebt(@Args('id', { type: () => Int }) id: number) {
    return this.debtsService.remove(id);
  }
}
