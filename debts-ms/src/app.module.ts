import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DebtModule } from './debt/debt.module';

@Module({
  imports: [DebtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
