import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateIncomeInput as CreateIncomeRecordInput } from './index';

export class UpdateIncomeRecordInput extends PartialType(
  CreateIncomeRecordInput,
) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
