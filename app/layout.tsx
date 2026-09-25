import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lora, Inter } from 'next/font/google'
import './globals.css'

// Lora — Қазақ әліпбиін (ә, ғ, қ, ң, ө, ұ, ү, һ, і) толық қолдайды (cyrillic-ext).
const playfair = Lora({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '1465 — Қазақ хандығының құрылуы',
  description:
    'Қазақ хандығының құрылу кезеңіне интерактивті саяхат. Тарихты үйрен, шешім қабылда, нәтижесін көр.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d1020',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kk" className={`dark ${playfair.variable} ${inter.variable}`}>
      <body className="antialiased grain-overlay">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
