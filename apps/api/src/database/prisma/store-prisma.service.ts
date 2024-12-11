import { PrismaClient } from '@chi/database/store'
import { env } from '@chi/env'
import { Injectable, OnModuleDestroy, Scope } from '@nestjs/common'

import { AppLoggerService } from '~/logger/logger.service'

@Injectable({ scope: Scope.REQUEST })
export class StorePrismaService implements OnModuleDestroy {
  prisma: PrismaClient

  constructor(private readonly logger: AppLoggerService) {}

  async connect(store: string) {
    try {
      this.prisma = new PrismaClient({
        log: ['query', 'error', 'info', 'warn'],
        datasourceUrl: env.DATABASE_URL.replace('public', store)
      })

      await this.prisma.$connect()
      this.logger.info('connected in store database', { store })
    } catch (e: unknown) {
      this.logger.error(e)
    }
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect()
  }
}
