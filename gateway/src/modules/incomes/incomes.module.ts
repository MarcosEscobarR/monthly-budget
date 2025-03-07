import { Module } from '@nestjs/common';
import { IncomesResolver } from './incomes.resolver';
import { IncomesService } from './incomes.service';

@Module({
  providers: [IncomesResolver, IncomesService],
})
export class IncomesModule {}
