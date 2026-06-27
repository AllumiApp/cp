import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLang } from '@/i18n/language-context'
import { cn } from '@/lib/utils'
import type { CustomerDetails } from '../booking-context'

const inputClass =
  'w-full rounded-xl border border-[#2C18101F] bg-cream px-4 py-3 text-base text-dark placeholder:text-dark/35 transition-colors focus:border-gold focus:outline-none'

export const DETAILS_FORM_ID = 'booking-details-form'

export function DetailsForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: CustomerDetails
  onSubmit: (values: CustomerDetails) => void
}) {
  const { d } = useLang()
  const f = d.booking.form
  const e = d.booking.errors

  const schema = useMemo(
    () =>
      z.object({
        firstName: z.string().trim().min(1, e.firstNameRequired),
        lastName: z.string().trim().min(1, e.lastNameRequired),
        email: z.string().trim().min(1, e.emailRequired).email(e.emailInvalid),
        phone: z.string().trim(),
        focus: z.string().trim().min(1, e.focusRequired),
      }),
    [e],
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerDetails>({ resolver: zodResolver(schema), defaultValues })

  return (
    <form
      id={DETAILS_FORM_ID}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl bg-white p-5 shadow-[0_1px_4px_#2C18100F,0_4px_16px_#2C18100D] sm:p-7 lg:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.firstName} error={errors.firstName?.message}>
          <input className={inputClass} placeholder={f.firstNamePlaceholder} {...register('firstName')} />
        </Field>
        <Field label={f.lastName} error={errors.lastName?.message}>
          <input className={inputClass} placeholder={f.lastNamePlaceholder} {...register('lastName')} />
        </Field>
      </div>

      <div className="pt-5">
        <Field label={f.email} error={errors.email?.message}>
          <input type="email" className={inputClass} placeholder={f.emailPlaceholder} {...register('email')} />
        </Field>
      </div>

      <div className="pt-5">
        <Field label={f.phone} optional={f.optional}>
          <input className={inputClass} placeholder={f.phonePlaceholder} {...register('phone')} />
        </Field>
      </div>

      <div className="pt-5">
        <Field label={f.focus} error={errors.focus?.message}>
          <textarea
            className={cn(inputClass, 'min-h-28 resize-y')}
            placeholder={f.focusPlaceholder}
            {...register('focus')}
          />
        </Field>
      </div>
    </form>
  )
}

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string
  optional?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-dark">
        {label}
        {optional && <span className="text-xs font-normal text-dark/40">{optional}</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-card-rose">{error}</p>}
    </div>
  )
}
