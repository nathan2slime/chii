import { PrismaClient } from '@chi/database'
import { Injectable, OnModuleInit } from '@nestjs/common'

import { AppLoggerService } from '~/logger/logger.service'

@Injectable()
export class BasePrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly logger: AppLoggerService) {
    super({ log: ['error', 'info', 'query', 'warn'] })
  }

  async onModuleInit() {
    try {
      await this.$connect()
    } catch (e: unknown) {
      this.logger.error(e)
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
