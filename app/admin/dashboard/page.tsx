import type { Metadata } from 'next'
import { getDashboardStats } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Dashboard Admin | Lacet' }

function StatCard({
  label,
  value,
  sub,
  color = 'gray',
}: {
  label: string
  value: string | number
  sub?: string
  color?: 'green' | 'gray' | 'red' | 'orange'
}) {
  const colors = {
    green: 'bg-[#e8f7f1] text-[#1D9E75]',
    gray: 'bg-gray-100 text-gray-500',
    red: 'bg-red-50 text-red-600',
    orange: 'bg-orange-50 text-orange-600',
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <p className="text-sm text-gray-500 font-medium mb-3">{label}</p>
      <p className="text-3xl font-extrabold text-gray-900">
        {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
      </p>
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
          <StatCard label="Total inscrits" value={stats.totalUsers} />
          <StatCard
            label="Actifs"
            value={stats.activeUsers}
            sub={stats.totalUsers > 0 ? `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}%` : '—'}
            color="green"
          />
          <StatCard
            label="Nouveaux cette semaine"
            value={stats.newUsersThisWeek}
            sub="7 derniers jours"
            color="green"
          />
          <StatCard
            label="Comptes supprimés"
            value={stats.deletedUsers}
            sub={stats.bannedUsers > 0 ? `${stats.bannedUsers} bannis` : undefined}
            color={stats.bannedUsers > 0 ? 'red' : 'gray'}
          />
        </div>
      </section>

      {/* Randonnées */}
      <section>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Randonnées
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total créées" value={stats.totalHikes} />
          <StatCard
            label="Nouvelles cette semaine"
            value={stats.hikesThisWeek}
            sub="7 derniers jours"
            color="green"
          />
          <StatCard
            label="Ouvertes"
            value={stats.openHikes}
            sub="En cours de recrutement"
            color="green"
          />
          <StatCard
            label="Complétées"
            value={stats.completedHikes}
            sub={
              stats.totalHikes > 0
                ? `${Math.round((stats.completedHikes / stats.totalHikes) * 100)}%`
                : '—'
            }
            color="gray"
          />
        </div>
      </section>

      {/* Activité */}
      <section>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Activité
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Participations"
            value={stats.totalParticipations}
            sub={
              stats.totalHikes > 0
                ? `~${(stats.totalParticipations / stats.totalHikes).toFixed(1)} / rando`
                : undefined
            }
            color="gray"
          />
          <StatCard label="Messages envoyés" value={stats.totalMessages} color="gray" />
          <StatCard
            label="Notes déposées"
            value={stats.totalRatings}
            sub={stats.avgRatingScore > 0 ? `Moy. ${stats.avgRatingScore}/5` : undefined}
            color="green"
          />
          <StatCard
            label="Signalements"
            value={stats.totalReports}
            color={stats.totalReports > 0 ? 'red' : 'gray'}
            sub={stats.totalReports > 0 ? 'À modérer' : undefined}
          />
        </div>
      </section>
    </div>
  )
}
