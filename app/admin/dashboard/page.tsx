import type { Metadata } from 'next'
import { getDashboardStats } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Dashboard Admin | Lacet' }

function StatCard({
  label,
  value,
  sub,
  color = 'green',
}: {
  label: string
  value: string | number
  sub?: string
  color?: 'green' | 'gray' | 'blue'
}) {
  const colors = {
    green: 'bg-[#e8f7f1] text-[#1D9E75]',
    gray: 'bg-gray-100 text-gray-500',
    blue: 'bg-blue-50 text-blue-600',
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <p className="text-sm text-gray-500 font-medium mb-3">{label}</p>
      <p className="text-3xl font-extrabold text-gray-900">{value.toLocaleString('fr-FR')}</p>
      {sub && (
        <p className={`mt-2 text-xs font-medium px-2 py-1 rounded-full inline-block ${colors[color]}`}>
          {sub}
        </p>
      )}
    </div>
  )
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">Vue d&apos;ensemble</h2>
        <p className="text-gray-400 text-sm mt-1">Données en temps réel depuis Supabase</p>
      </div>

      {/* Utilisateurs */}
      <section>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Utilisateurs
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total utilisateurs" value={stats.totalUsers} />
          <StatCard
            label="Nouveaux cette semaine"
            value={stats.newUsersThisWeek}
            sub="7 derniers jours"
            color="green"
          />
          <StatCard
            label="iOS"
            value={stats.iosCount}
            sub={
              stats.totalUsers > 0
                ? `${Math.round((stats.iosCount / stats.totalUsers) * 100)}%`
                : '—'
            }
            color="gray"
          />
          <StatCard
            label="Android"
            value={stats.androidCount}
            sub={
              stats.totalUsers > 0
                ? `${Math.round((stats.androidCount / stats.totalUsers) * 100)}%`
                : '—'
            }
            color="blue"
          />
        </div>
      </section>

      {/* Randonnées */}
      <section>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Randonnées
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total randonnées" value={stats.totalHikes} />
          <StatCard
            label="Nouvelles cette semaine"
            value={stats.hikesThisWeek}
            sub="7 derniers jours"
            color="green"
          />
        </div>
      </section>
    </div>
  )
}
