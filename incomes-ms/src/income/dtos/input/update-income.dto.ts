import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateIncomeInput } from './index';

export class UpdateIncomeInput extends PartialType(CreateIncomeInput) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
