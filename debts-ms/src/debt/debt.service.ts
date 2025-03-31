import { Injectable, Logger } from '@nestjs/common';
import { CreateDebtDto } from './dto/input/create-debt.dto';
import { UpdateDebtDto } from './dto/input/update-debt.dto';
import { PrismaService } from 'src/utils/prisma.service';
import { Result } from 'src/utils/result-pattern';
import { DebtOutput } from './dto/output';

@Injectable()
export class DebtService {
  constructor(private readonly PrismaService: PrismaService) {}

  private readonly logger = new Logger(DebtService.name);

  async create(data: CreateDebtDto): Promise<Result<DebtOutput>> {
    try {
      const newDebt = await this.PrismaService.debts.create({
        data,
        select: {
          id: true,
          totalAmount: true,
          description: true,
          title: true,
        },
      });
      return Result.ok(newDebt);
    } catch (error) {
      this.logger.error('Error creating debt', error);
      return Result.onError('Error creating debt');
    }
  }

  async findAll(): Promise<Result<DebtOutput[]>> {
    try {
      const debts = await this.PrismaService.debts.findMany({
        select: {
          id: true,
          totalAmount: true,
          description: true,
          title: true,
        },
      });
      return Result.ok(debts);
    } catch (error) {
      this.logger.error('Error fetching debts', error);
      return Result.onError('Error fetching debts');
    }
  }

  async findOne(id: string): Promise<Result<DebtOutput>> {
    try {
      const debt = await this.PrismaService.debts.findUnique({
        where: { id },
        select: {
          id: true,
          totalAmount: true,
          description: true,
          title: true,
        },
      });
      if (!debt) {
        return Result.onError('Debt not found');
      }
      return Result.ok(debt);
    } catch (error) {
      this.logger.error(`Error fetching debt with id ${id}`, error);
      return Result.onError('Error fetching debt');
    }
  }

  async update(id: string, data: UpdateDebtDto): Promise<Result<DebtOutput>> {
    try {
      if (!(await this.existDebt(id)) || !data) {
        return Result.onError('Debt not found');
      }

      const updatedDebt = await this.PrismaService.debts.update({
        where: { id: id },
        data: data,
        select: {
          id: true,
          totalAmount: true,
          description: true,
          title: true,
        },
      });

      return Result.ok(updatedDebt);
    } catch (error) {
      this.logger.error(`Error updating debt with id ${id}`, error);
      return Result.onError('Error updating debt');
    }
  }

  async remove(id: string) {
    try {
      if (!(await this.existDebt(id))) {
        return Result.onError('Debt not found');
      }
      await this.PrismaService.debts.update({
        where: { id },
        data: { deletedAt: Date.now().toString() },
      });
      return Result.ok('Debt deleted successfully');
    } catch (error) {
      this.logger.error(`Error deleting debt with id ${id}`, error);
      return Result.onError('Error deleting debt');
    }
  }

  private async existDebt(id: string): Promise<boolean> {
    const debt = await this.PrismaService.debts.findUnique({
      where: { id },
    });
    return !!debt;
  }
}
