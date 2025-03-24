import { IsString } from 'class-validator';

export class CreateIncomeInput {
  @IsString()
  title: string;
}
