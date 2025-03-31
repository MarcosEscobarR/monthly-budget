import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from 'process';

async function bootstrap() {
  const logger = new Logger('Debts-Microservice');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: env.NATS_SERVERS,
      },
    },
  );

  await app.listen();

  logger.log(`Debts Microservice is running`);
}
bootstrap();
