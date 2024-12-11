import { Global, Module } from '@nestjs/common'

import { BasePrismaService } from '~/database/prisma/base-prisma.service'
import { StorePrismaService } from '~/database/prisma/store-prisma.service'

@Global()
@Module({
  providers: [BasePrismaService, StorePrismaService],
  exports: [BasePrismaService, StorePrismaService]
})
export class PrismaModule {}
