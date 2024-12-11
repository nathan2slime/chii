import { exec } from 'node:child_process'
import path from 'node:path'
import { cwd } from 'node:process'
import { promisify } from 'node:util'
import { env } from '@chi/env'

import { logger } from './logger.mjs'

const execAsync = promisify(exec)

const main = async () => {
  const rootDir = path.resolve(cwd(), '../../')
  const args = process.argv.slice(2)
  const storeId = args[0]

  if (storeId) {
    const DATABASE_URL = env.DATABASE_URL.replace('public', args[0])

    const { stdout } = await execAsync('pnpm studio --filter=@db/store', { cwd: rootDir, env: { ...process.env, DATABASE_URL, TURBO_UI: true } })

    console.log(stdout)
  } else {
    logger.error('store not provided')
  }
}

main()
