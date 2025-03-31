import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import {
  CreateIncomeInput,
  CreateIncomeRecordInput,
  UpdateIncomeInput,
} from './dtos/input';
import { Result } from 'src/utils/result-pattern';
import { IncomeOutput, IncomeRecordOutput } from './dtos/output';

@Injectable()
export class IncomeService {
  private readonly logger = new Logger(IncomeService.name);
  constructor(private readonly PrismaService: PrismaService) {}

  async listIncomes(): Promise<Result<IncomeOutput[]>> {
    try {
      this.logger.debug('Listing incomes');
      const data = await this.PrismaService.income.findMany({
        select: {
          id: true,
          title: true,
        },
      });

      this.logger.debug({ data });

      return Result.ok(data);
    } catch (error) {
      Logger.log(error);
      return Result.onError(error.message);
    }
  }

  async getIncome(id: string): Promise<Result<IncomeOutput>> {
    try {
      const income = await this.PrismaService.income.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
        },
      });
      if (!income) {
        return Result.onError('Income not found');
      }
      return Result.ok(income);
    } catch (error) {
      this.logger.error(error);
      return Result.onError(error.message);
    }
  }

  async createIncome(data: CreateIncomeInput): Promise<Result<IncomeOutput>> {
    try {
      const { id, title } = await this.PrismaService.income.create({
        data,
      });
      return Result.ok({ id, title });
    } catch (error) {
      Logger.log(error);
      return Result.onError(error.message);
    }
  }

  async updateIncome(data: UpdateIncomeInput): Promise<Result<IncomeOutput>> {
    try {
      if (!(await this.existsIncome(data.id))) {
        return Result.onError('Income not found');
      }

      const { id, title } = await this.PrismaService.income.update({
        where: {
          id: data.id,
        },
        data,
      });
      return Result.ok({ id, title });
    } catch (error) {
      Logger.log(error);
      return Result.onError(error.message);
    }
  }

  async getIncomeRecord(
    incomeId: string,
  ): Promise<Result<IncomeRecordOutput[]>> {
    try {
      console.log({ incomeId });
      if (!(await this.existsIncome(incomeId))) {
        return Result.ok([]);
      }

      const incomeRecord = await this.PrismaService.incomeRecord.findMany({
        where: {
          incomeId,
        },
        select: {
          id: true,
          amount: true,
          date: true,
          description: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return Result.ok(incomeRecord);
    } catch (error) {
      Logger.log(error);
      return Result.onError(error.message);
    }
  }

  async createIncomeRecord(
    data: CreateIncomeRecordInput,
  ): Promise<Result<IncomeRecordOutput>> {
    try {
      const incomeRecord = await this.PrismaService.incomeRecord.create({
        data,
      });

      return Result.ok(incomeRecord);
    } catch (error) {
      Logger.log(error);
      return Result.onError(error.message);
    }
  }

  async updateIncomeRecord(
    data: UpdateIncomeInput,
  ): Promise<Result<IncomeRecordOutput>> {
    try {
      if (!(await this.existsIncome(data.id))) {
        return Result.onError('Income not found');
      }

      const incomeRecord = await this.PrismaService.incomeRecord.update({
        where: {
          id: data.id,
        },
        data,
      });

      return Result.ok(incomeRecord);
    } catch (error) {
      Logger.log(error);
      return Result.onError(error.message);
    }
  }

  private async existsIncome(id: string) {
    const income = await this.PrismaService.income.count({
      where: {
        id,
      },
    });

    return income > 0;
  }
}
