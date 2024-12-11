'use client'

import { env } from '@chi/env'

const Index = () => {
  console.log(env)

  return (
    <div>
      teste: {process.env.TESTE} {process.env.NEXT_PUBLIC_API_URL}|{env.NEXT_PUBLIC_API_URL}
    </div>
  )
}

export default Index
