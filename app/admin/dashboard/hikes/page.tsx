import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getHikes, getHikeById } from '@/lib/supabase-admin'
import { HikesTable } from '@/components/admin/HikesTable'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Randonnées | Lacet Admin' }

interface PageProps {
  searchParams: {
    page?: string
    search?: string
    status?: string
    hikeId?: string
  }
}

export default async function HikesPage({ searchParams }: PageProps) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const search = searchParams.search ?? ''
  const status = searchParams.status ?? ''
  const hikeId = searchParams.hikeId ?? ''

  const [{ hikes, total }, selectedHike] = await Promise.all([
    getHikes(page, search, status),
    hikeId ? getHikeById(hikeId) : Promise.resolve(null),
  ])

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">Randonnées</h2>
        <p className="text-gray-400 text-sm mt-1">Toutes les randonnées créées sur Lacet</p>
      </div>

      <Suspense fallback={<div className="text-sm text-gray-400">Chargement…</div>}>
        <HikesTable
          hikes={hikes}
          total={total}
          page={page}
          search={search}
          statusFilter={status}
          selectedHike={selectedHike}
        />
      </Suspense>
    </div>
  )
}
