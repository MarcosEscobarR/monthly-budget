import { Module } from '@nestjs/common';
import { IncomesResolver } from './incomes.resolver';
import { IncomesService } from './incomes.service';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  providers: [IncomesResolver, IncomesService],
  imports: [NatsModule],
})
export class IncomesModule {}
