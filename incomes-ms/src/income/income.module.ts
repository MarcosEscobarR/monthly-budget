import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { PrismaService } from 'src/utils/prisma.service';

@Module({
  controllers: [IncomeController],
  providers: [IncomeService, PrismaService],
})
export class IncomeModule {}
