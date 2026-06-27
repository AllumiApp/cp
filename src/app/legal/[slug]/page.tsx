import { redirect } from 'next/navigation'
import { LegalPage } from '@/features/legal/legal-page'
import { LEGAL_SLUGS, isLegalSlug } from '@/features/legal/legal-content'

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!isLegalSlug(slug)) redirect(`/legal/${LEGAL_SLUGS[0]}`)
  return <LegalPage slug={slug} />
}
