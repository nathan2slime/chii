import { exec } from 'node:child_process'
import path from 'node:path'
import { cwd } from 'node:process'
import { promisify } from 'node:util'
import { PrismaClient } from '@chi/database'
import { env } from '@chi/env'

import { logger } from './logger.mjs'

const db = new PrismaClient()

const execAsync = promisify(exec)

const main = async () => {
  await db.$connect()

  const stores = await db.store.findMany({ select: { id: true } })
  const rootDir = path.resolve(cwd(), '../../')

  for (let index = 0; index < stores.length; index++) {
    const store = stores[index]
    logger.info('start migration database for store', store)

    if (store) {
      const DATABASE_URL = env.DATABASE_URL.replace('public', store.id)

      const { stdout } = await execAsync('pnpm db:migrate:deploy --filter=@db/store', { cwd: rootDir, env: { ...process.env, DATABASE_URL, TURBO_UI: true } })
      console.log(stdout)
    }
  }
}

main()
