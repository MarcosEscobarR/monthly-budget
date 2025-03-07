import { Injectable } from '@nestjs/common';
import { CreateIncomeInput } from './inputs/create-income.input';
import { UpdateIncomeInput } from './inputs/update-income.input';
import { CreateIncomeRecordInput, UpdateIncomeRecordInput } from './inputs';

@Injectable()
export class IncomesService {
  listIncomes() {
    return [
      { id: '1', title: 'Salary' },
      { id: '2', title: 'Freelance' },
    ];
  }

  getIncomeRecords(id: string) {
    return [
      { id: '1', incomeId: id, amount: 100 },
      { id: '2', incomeId: id, amount: 200 },
    ];
  }

  createIncome(data: CreateIncomeInput) {
    return { id: '3', title: data.title };
  }

  updateIncome(id: string, data: UpdateIncomeInput) {
    return { id, title: data.title };
  }

  createIncomeRecord(data: CreateIncomeRecordInput) {
    return { id: '3', incomeId: data.incomeId, amount: data.amount };
  }

  updateIncomeRecord(id: string, data: UpdateIncomeRecordInput) {
    return { id, incomeId: data.incomeId, amount: data.amount };
  }
}
