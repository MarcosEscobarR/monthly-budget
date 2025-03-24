import { Controller } from '@nestjs/common';
import { IncomeService } from './income.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateIncomeInput,
  CreateIncomeRecordInput,
  UpdateIncomeInput,
} from './dtos/input';

@Controller()
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @MessagePattern('list-incomes')
  async listIncomes() {
    return await this.incomeService.listIncomes();
  }

  @MessagePattern('get-income')
  async getIncome(@Payload() id: string) {
    return await this.incomeService.getIncome(id);
  }

  @MessagePattern('create-income')
  async createIncome(@Payload() data: CreateIncomeInput) {
    console.log(data);
    return await this.incomeService.createIncome(data);
  }

  @MessagePattern('update-income')
  async updateIncome(@Payload() data: UpdateIncomeInput) {
    console.log(data);
    return await this.incomeService.updateIncome(data);
  }

  @MessagePattern('get-income-record')
  async getIncomeRecord(@Payload() id: string) {
    return await this.incomeService.getIncomeRecord(id);
  }

  @MessagePattern('create-income-record')
  async createIncomeRecord(@Payload() data: CreateIncomeRecordInput) {
    console.log(data);

    return await this.incomeService.createIncomeRecord(data);
  }

  // @MessagePattern('update-income-record')
  // async updateIncomeRecord(@Payload() data: UpdateIncomeRecordInput) {
  //   return await this.incomeService.updateIncomeRecord(data.id, data);
  // }

  // @MessagePattern('delete-income')
  // async deleteIncome(@Payload() id: string) {
  //   return await this.incomeService.deleteIncome(id);
  // }

  // @MessagePattern('delete-income-record')
  // async deleteIncomeRecord(@Payload() id: string) {
  //   return await this.incomeService.deleteIncomeRecord(id);
  // }
}
