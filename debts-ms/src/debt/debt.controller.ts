import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DebtService } from './debt.service';
import { CreateDebtDto } from './dto/input/create-debt.dto';
import { UpdateDebtDto } from './dto/input/update-debt.dto';

@Controller()
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @MessagePattern('create-debt')
  create(@Payload() createDebtDto: CreateDebtDto) {
    return this.debtService.create(createDebtDto);
  }

  @MessagePattern('list-debts')
  findAll() {
    return this.debtService.findAll();
  }

  @MessagePattern('get-debt')
  findOne(@Payload() id: string) {
    return this.debtService.findOne(id);
  }

  @MessagePattern('update-debt')
  update(@Payload() updateDebtDto: UpdateDebtDto) {
    console.log({ updateDebtDto });
    return this.debtService.update(updateDebtDto.id, updateDebtDto);
  }

  @MessagePattern('delete-debt')
  remove(@Payload() id: string) {
    return this.debtService.remove(id);
  }
}
