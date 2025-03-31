import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { IncomesModule } from './incomes/incomes.module';
import { NatsModule } from './transports/nats.module';
import { APP_FILTER } from '@nestjs/core';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';
import { DebtsModule } from './debts/debts.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    IncomesModule,
    NatsModule,
    DebtsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: RpcCustomExceptionFilter,
    },
  ],
})
export class AppModule {}
