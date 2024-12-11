import { Session } from '@chi/database/store'
import { Request } from 'express'

export type AppRequest = Request & {
  user: Session
  store: string | undefined
  cookies: Record<string, { refreshToken: string; sessionToken: string }>
}
