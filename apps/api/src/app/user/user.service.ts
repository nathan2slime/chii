import { User } from '@chi/database/store'
import { Injectable } from '@nestjs/common'

import { SignUpDto } from '~/app/auth/auth.dto'
import { StorePrismaService } from '~/database/prisma/store-prisma.service'
import { exclude } from '~/database/prisma/utils'

@Injectable()
export class UserService {
  constructor(private readonly dbStore: StorePrismaService) {}

  async getById(id: string) {
    const user = await this.dbStore.prisma.user.findUnique({ where: { id } })

    return exclude<User, 'password'>(user, ['password'])
  }

  async create(data: SignUpDto) {
    const user = await this.dbStore.prisma.user.create({ data })

    return exclude<User, 'password'>(user, ['password'])
  }

  async getByEmail(email: string) {
    return this.dbStore.prisma.user.findFirst({ where: { email } })
  }

  async getOnlyPasswordByEmail(email: string) {
    return this.dbStore.prisma.user.findUnique({
      where: { email },
      select: {
        password: true
      }
    })
  }
}
