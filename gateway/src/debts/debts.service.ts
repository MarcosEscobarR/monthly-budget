import { Inject, Injectable } from '@nestjs/common';
import { CreateDebtInput } from './inputs/create-debt.input';
import { UpdateDebtInput } from './inputs/update-debt.input';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NatsService } from 'src/config';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class DebtsService {
  constructor(@Inject(NatsService) private readonly client: ClientProxy) {}

  create(createDebtInput: CreateDebtInput) {
    return this.getResponse('create-debt', createDebtInput);
  }

  findAll() {
    return this.getResponse('list-debts', {});
  }

  findOne(id: string) {
    return this.getResponse('get-debt', id);
  }

  update(updateDebtInput: UpdateDebtInput) {
    return this.getResponse('update-debt', { ...updateDebtInput });
  }

  remove(id: number) {
    return this.getResponse('delete-debt', { id });
  }

  private async getResponse<T>(pattern: string, data: T): Promise<any> {
    const result = this.client.send(pattern, data).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    return (await firstValueFrom(result)).value;
  }
}
