import { Module } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { DebtsResolver } from './debts.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  providers: [DebtsResolver, DebtsService],
  imports: [NatsModule],
})
export class DebtsModule {}
