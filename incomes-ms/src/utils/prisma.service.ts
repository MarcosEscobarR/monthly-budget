import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }
  onModuleInit() {
    this.$connect();
  }

  async softDelete<T extends Prisma.ModelName>(
    model: Prisma.ModelName,
    where: any,
  ) {
    if (!this[model].delete) {
      throw new Error(`Model ${model} does not have a delete method`);
    }
    return this[model].update({
      where,
      data: {
        delete: true,
      },
    });
  }
}
