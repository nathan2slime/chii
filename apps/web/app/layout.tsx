import type { Metadata } from 'next'
import { Baloo_2 } from 'next/font/google'
import { cn } from '~/lib/utils'
import type { AppChildren } from '~/types'

import '~/app/globals.css'

export const metadata: Metadata = {}

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

const RootLayout = ({ children }: Readonly<AppChildren>) => (
  <html lang="pt">
    <body className={cn(baloo.className)}>{children}</body>
  </html>
)

export default RootLayout
