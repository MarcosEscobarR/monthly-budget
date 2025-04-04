import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsService } from 'src/config';
const env = process.env;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NatsService,
        transport: Transport.NATS,
        options: {
          servers: env.NATS_SERVERS,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: NatsService,
        transport: Transport.NATS,
        options: {
          servers: env.NATS_SERVERS,
        },
      },
    ]),
  ],
})
export class NatsModule {}
