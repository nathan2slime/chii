import { Module } from '@nestjs/common'
import { StoreMiddleware } from '~/app/store/store.middleware'
import { StoreService } from '~/app/store/store.service'

@Module({
  providers: [StoreService, StoreMiddleware],
  exports: [StoreService, StoreMiddleware]
})
export class StoreModule {}
