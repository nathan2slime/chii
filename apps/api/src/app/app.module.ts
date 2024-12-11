import { env } from '@chi/env'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AuthModule } from '~/app/auth/auth.module'
import { StoreMiddleware } from '~/app/store/store.middleware'
import { StoreModule } from '~/app/store/store.module'
import { PrismaModule } from '~/database/prisma/prisma.module'
import { RedisModule } from '~/database/redis/redis.module'
import { LoggerModule } from '~/logger/logger.module'

import configuration from '~/config'

@Module({
  imports: [
    LoggerModule,
    AuthModule,
    StoreModule,
    RedisModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: env.SESSION_KEY
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(StoreMiddleware).forRoutes('*')
  }
}
