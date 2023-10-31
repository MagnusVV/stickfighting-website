import './globals.css'
// TODO: CSS for React big Calendar, maybe the path could be shortened? -MV:
import 'node_modules/react-big-calendar/lib/css/react-big-calendar.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'stickfighting.se',
  description: 'A website for a small but dedicated association',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
