import { Injectable } from '@nestjs/common'

import { BasePrismaService } from '~/database/prisma/base-prisma.service'

@Injectable()
export class StoreService {
  constructor(private readonly prisma: BasePrismaService) {}

  async isValid(id: string) {
    return this.prisma.store.findUnique({ where: { id } })
  }
}
