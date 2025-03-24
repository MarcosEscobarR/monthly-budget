import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIncomeRecordInput {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  incomeId: string;

  @IsString()
  description: string;
}
