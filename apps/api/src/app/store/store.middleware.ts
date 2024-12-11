import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { NextFunction, Response } from 'express'

import { AppRequest } from '~/app/app.types'
import { StoreService } from '~/app/store/store.service'
import { StorePrismaService } from '~/database/prisma/store-prisma.service'

@Injectable()
export class StoreMiddleware implements NestMiddleware {
  constructor(
    private readonly storePrismaService: StorePrismaService,
    private storeService: StoreService
  ) {}

  async use(req: AppRequest, res: Response, next: NextFunction) {
    const storeId = `${req.headers.store}`

    const store = await this.storeService.isValid(storeId)

    if (store) {
      await this.storePrismaService.connect(store.id)

      return next()
    }

    throw new UnauthorizedException()
  }
}
