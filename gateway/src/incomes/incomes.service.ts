import { Inject, Injectable } from '@nestjs/common';
import { CreateIncomeInput } from './inputs/create-income.input';
import { UpdateIncomeInput } from './inputs/update-income.input';
import { CreateIncomeRecordInput, UpdateIncomeRecordInput } from './inputs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NatsService } from 'src/config';
import { catchError, firstValueFrom, tap } from 'rxjs';

@Injectable()
export class IncomesService {
  constructor(@Inject(NatsService) private readonly client: ClientProxy) {}

  async listIncomes() {
    const result = this.client.send('list-incomes', {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    return (await firstValueFrom(result)).value;
  }

  async getIncomeRecords(id: string) {
    const result = this.client.send('get-income-record', id).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    return (await firstValueFrom(result)).value;
  }

  async createIncome(input: CreateIncomeInput) {
    const result = this.client.send('create-income', input).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    return (await firstValueFrom(result)).value;
  }

  async updateIncome(data: UpdateIncomeInput) {
    const result = this.client.send('update-income', data).pipe(
      catchError((error) => {
        console.log({ error });
        throw new RpcException(error);
      }),
    );

    return (await firstValueFrom(result)).value;
  }

  async createIncomeRecord(data: CreateIncomeRecordInput) {
    const result = this.client.send('create-income-record', data).pipe(
      tap((response) => console.log('NATS Response:', response)),
      catchError((error) => {
        console.error('Caught Error:', error);

        const message =
          error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error);

        throw new RpcException({ status: 'error', message });
      }),
    );

    return (await firstValueFrom(result)).value;
  }

  async updateIncomeRecord(id: string, data: UpdateIncomeRecordInput) {
    const result = this.client.send('update-income-record', { id, data }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    return (await firstValueFrom(result)).value;
  }
}
