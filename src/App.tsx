import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { Toaster } from 'sonner'
import { LanguageProvider } from '@/i18n/language-context'
import { SiteLayout } from '@/components/layout/site-layout'
import { HomePage } from '@/features/marketing/home-page'
import { FaqPage } from '@/features/marketing/faq-page'
import { LegalPage } from '@/features/legal/legal-page'
import { BookingLayout } from '@/features/booking/booking-layout'
import { BookingPage } from '@/features/booking/booking-page'
import { ConfirmationPage } from '@/features/booking/confirmation-page'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/legal/:slug" element={<LegalPage />} />

            <Route element={<BookingLayout />}>
              <Route path="/coaching" element={<BookingPage />} />
              <Route path="/coaching/confirmation" element={<ConfirmationPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors />
    </LanguageProvider>
  )
}
