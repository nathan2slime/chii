import { env } from '@chi/env'

export type AppConfig = typeof env

export default () => env
