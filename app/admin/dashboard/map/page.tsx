import type { Metadata } from 'next'
import { getHikesForMap } from '@/lib/supabase-admin'
import { HikesMap } from '@/components/admin/HikesMap'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Carte | Lacet Admin' }

export default async function MapPage() {
  const hikes = await getHikesForMap()

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">Carte</h2>
        <p className="text-gray-400 text-sm mt-1">
          Randonnées publiées géolocalisées
        </p>
      </div>

      <HikesMap hikes={hikes} />
    </div>
  )
}
