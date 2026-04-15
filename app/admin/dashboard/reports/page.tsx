import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getReportById, getReports } from '@/lib/supabase-admin'
import { ReportsTable } from '@/components/admin/ReportsTable'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Signalements | Lacet Admin' }

interface PageProps {
  searchParams: {
    page?: string
    search?: string
    reportId?: string
  }
}

export default async function ReportsPage({ searchParams }: PageProps) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const search = searchParams.search ?? ''
  const reportId = searchParams.reportId ?? ''

  const [{ reports, total }, selectedReport] = await Promise.all([
    getReports(page, search),
    reportId ? getReportById(reportId) : Promise.resolve(null),
  ])

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">Signalements</h2>
        <p className="text-gray-400 text-sm mt-1">
          Consultez les signalements remontés depuis l&apos;application et ouvrez rapidement les fiches concernées
        </p>
      </div>

      <Suspense fallback={<div className="text-sm text-gray-400">Chargement…</div>}>
        <ReportsTable
          reports={reports}
          total={total}
          page={page}
          search={search}
          selectedReport={selectedReport}
        />
      </Suspense>
    </div>
  )
}
