import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import { BookingProvider } from './booking-context'

export function BookingLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <BookingProvider>
      <div className="bg-cream">
        <Outlet />
      </div>
    </BookingProvider>
  )
}
