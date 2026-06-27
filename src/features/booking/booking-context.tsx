'use client'

import { createContext, useContext, useMemo, useState, useCallback, type ReactNode } from 'react'
import { useLang } from '@/i18n/language-context'
import { PACKAGES, type PackageId, type SessionPackage } from './booking-config'

export interface CustomerDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  focus: string
}

export interface BookingRequestPayload {
  packageId: PackageId
  customer: CustomerDetails
}

interface BookingContextValue {
  packageId: PackageId
  customer: CustomerDetails
  selectedPackage: SessionPackage
  setPackage: (id: PackageId) => void
  setCustomer: (details: CustomerDetails) => void
  submitted: boolean
  markSubmitted: () => void
  buildPayload: () => BookingRequestPayload
  reset: () => void
}

const emptyCustomer: CustomerDetails = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  focus: '',
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  // A package is always selected (the funnel opens on "Single Session", matching the design).
  const [packageId, setPackageId] = useState<PackageId>('single')
  const [customer, setCustomerState] = useState<CustomerDetails>(emptyCustomer)
  const [submitted, setSubmitted] = useState(false)

  // Packages come from the CMS when available, else the bundled config.
  const { packages } = useLang()
  const list = packages && packages.length ? packages : PACKAGES
  const selectedPackage = useMemo(
    () => list.find((p) => p.id === packageId) ?? list[0],
    [list, packageId],
  )

  const setPackage = useCallback((id: PackageId) => setPackageId(id), [])
  const setCustomer = useCallback((details: CustomerDetails) => setCustomerState(details), [])
  const markSubmitted = useCallback(() => setSubmitted(true), [])

  const reset = useCallback(() => {
    setPackageId('single')
    setCustomerState(emptyCustomer)
    setSubmitted(false)
  }, [])

  const buildPayload = useCallback(
    (): BookingRequestPayload => ({ packageId, customer }),
    [packageId, customer],
  )

  const value: BookingContextValue = {
    packageId,
    customer,
    selectedPackage,
    setPackage,
    setCustomer,
    submitted,
    markSubmitted,
    buildPayload,
    reset,
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}
