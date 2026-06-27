import type { Metadata } from 'next'
import { Inter, Libre_Baskerville } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { fetchCpContent } from '@/content/cp-content'
import { LanguageProvider } from '@/i18n/language-context'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ScrollManager } from '@/components/layout/scroll-manager'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Christina Pfeiffer — Transformation Coaching',
    template: '%s | Christina Pfeiffer',
  },
  description:
    'Transformation coaching with Christina Pfeiffer — 1:1 sessions, the ALLUMI app, and The Show.',
}

// Mirror allumi-website: fetch CMS content server-side, with ISR so it stays
// fast and fresh. The bundled i18n dictionary is the guaranteed fallback.
export const revalidate = 300

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialRows = await fetchCpContent()

  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <body>
        <LanguageProvider initialRows={initialRows}>
          <ScrollManager />
          <div className="flex min-h-screen flex-col bg-cream">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="bottom-right" richColors />
        </LanguageProvider>
      </body>
    </html>
  )
}
