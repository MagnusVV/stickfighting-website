import './globals.css'
// TODO: CSS for React big Calendar, maybe the path could be shortened? -MV:
import 'node_modules/react-big-calendar/lib/css/react-big-calendar.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Work_Sans } from 'next/font/google'

import Footer from '@/components/Footer/Footer'

const inter = Inter({ subsets: ['latin'] })
const work_sans = Work_Sans({ subsets: ['latin'] })

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
      <body className={work_sans.className}>
        {children} <Footer />
      </body>
    </html>
  )
}
