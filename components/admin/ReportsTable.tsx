'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import type { ReportRecord } from '@/lib/supabase-admin'

interface ReportsTableProps {
  reports: ReportRecord[]
  total: number
  page: number
  search: string
  selectedReport: ReportRecord | null
}

function formatDateTime(iso: string | null) {
  if (!iso) return '—'

  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function prettifyKey(key: string) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function getStatusStyle(status: string) {
  const normalized = status.toLowerCase()

  if (['resolved', 'closed', 'done', 'handled'].includes(normalized)) {
    return 'bg-green-50 text-green-700'
  }

  if (['dismissed', 'rejected', 'ignored'].includes(normalized)) {
    return 'bg-gray-100 text-gray-600'
  }

  if (['in_review', 'reviewing', 'processing', 'investigating'].includes(normalized)) {
    return 'bg-orange-50 text-orange-700'
  }

  return 'bg-red-50 text-red-600'
}

function targetLabel(report: ReportRecord) {
  if (report.reported_user) return report.reported_user.display_name
  if (report.hike) return report.hike.title
  if (report.message_id) return `Message ${report.message_id.slice(0, 8)}…`
  return report.target_type
}

function targetMeta(report: ReportRecord) {
  if (report.reported_user_id) return 'Utilisateur'
  if (report.hike_id) return 'Randonnée'
  if (report.message_id) return 'Message'
  return report.target_type
}

function Avatar({ url, name }: { url: string | null; name: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  if (url) {
    return (
      <Image
        src={url}
        alt={name}
        width={32}
        height={32}
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
    )
  }

  return (
    <div className="w-8 h-8 rounded-full bg-[#e8f7f1] text-[#1D9E75] flex items-center justify-center text-xs font-bold shrink-0">
      {initials}
    </div>
  )
}

function DetailLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center text-sm font-medium text-[#1D9E75] hover:text-[#157a5a]"
    >
      {label}
    </Link>
  )
}

export function ReportsTable({
  reports,
  total,
  page,
  search,
  selectedReport,
}: ReportsTableProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState(search)

  const pageSize = 20
  const totalPages = Math.ceil(total / pageSize)

  function updateParams(params: Record<string, string>) {
    const next = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (value) next.set(key, value)
      else next.delete(key)
    })

    router.push(`${pathname}?${next.toString()}`)
  }

  function handleSearch(event: React.FormEvent) {
    event.preventDefault()
    updateParams({ search: searchInput, page: '1', reportId: '' })
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Rechercher par motif, utilisateur ou rando…"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{ backgroundColor: '#1D9E75' }}
          >
            Rechercher
          </button>
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearchInput('')
                updateParams({ search: '', page: '1', reportId: '' })
              }}
              className="px-3 py-2.5 rounded-xl text-sm text-gray-500 border border-gray-200 hover:bg-gray-50"
            >
              Réinitialiser
            </button>
          )}
        </form>

        <p className="text-xs text-gray-400">
          {total} signalement{total !== 1 ? 's' : ''}
          {search && ` pour « ${search} »`}
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Signalement
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Cible
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Reporter
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Date
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400">
                    Aucun signalement trouvé
                  </td>
                </tr>
              ) : (
                reports.map((report) => {
                  const isSelected = selectedReport?.id === report.id

                  return (
                    <tr
                      key={report.id}
                      onClick={() => updateParams({ reportId: report.id })}
                      className={`cursor-pointer transition-colors ${isSelected ? 'bg-[#e8f7f1]' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-4 py-3">
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {report.category ?? 'Sans motif'}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {report.description || `ID ${report.id}`}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="min-w-0">
                          <p className="text-gray-900 truncate">{targetLabel(report)}</p>
                          <p className="text-xs text-gray-400">{targetMeta(report)}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                        {report.reporter?.display_name ?? report.reporter_user_id ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                        {formatDateTime(report.created_at)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <button
              disabled={page <= 1}
              onClick={() => updateParams({ page: String(page - 1), reportId: '' })}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              ← Précédent
            </button>
            <span className="text-sm text-gray-500">
              Page {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => updateParams({ page: String(page + 1), reportId: '' })}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Suivant →
            </button>
          </div>
        )}
      </div>

      {selectedReport && (
        <aside className="w-80 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-0 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="h-20 bg-gradient-to-br from-[#dcefe8] to-[#f7d9d9]" />

            <div className="px-5 pb-5">
              <div className="-mt-4 mb-4 flex items-start justify-between">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(selectedReport.status)}`}>
                  {selectedReport.status}
                </span>
                <button
                  onClick={() => updateParams({ reportId: '' })}
                  className="text-gray-400 hover:text-gray-600 transition-colors mt-1"
                  aria-label="Fermer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h3 className="font-bold text-gray-900 text-base">
                {selectedReport.category ?? 'Signalement'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {selectedReport.description ?? 'Aucun détail fourni'}
              </p>

              <dl className="mt-5 space-y-3">
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Créé le
                  </dt>
                  <dd className="text-sm text-gray-700">{formatDateTime(selectedReport.created_at)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Type de cible
                  </dt>
                  <dd className="text-sm text-gray-700">{selectedReport.target_type}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Traité le
                  </dt>
                  <dd className="text-sm text-gray-700">{formatDateTime(selectedReport.resolved_at)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Mis à jour
                  </dt>
                  <dd className="text-sm text-gray-700">{formatDateTime(selectedReport.updated_at)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    ID
                  </dt>
                  <dd className="text-xs text-gray-400 font-mono break-all">{selectedReport.id}</dd>
                </div>
              </dl>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">
                    Reporter
                  </p>
                  {selectedReport.reporter ? (
                    <div className="flex items-center gap-3">
                      <Avatar
                        url={selectedReport.reporter.photo_url}
                        name={selectedReport.reporter.display_name}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {selectedReport.reporter.display_name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {selectedReport.reporter.phone || selectedReport.reporter.id}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 break-all">
                      {selectedReport.reporter_user_id ?? 'Inconnu'}
                    </p>
                  )}

                  {selectedReport.reporter_user_id && (
                    <div className="mt-3">
                      <DetailLink
                        href={`/admin/dashboard/users?userId=${selectedReport.reporter_user_id}`}
                        label="Ouvrir la fiche utilisateur"
                      />
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">
                    Cible signalée
                  </p>

                  {selectedReport.reported_user && (
                    <>
                      <div className="flex items-center gap-3">
                        <Avatar
                          url={selectedReport.reported_user.photo_url}
                          name={selectedReport.reported_user.display_name}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {selectedReport.reported_user.display_name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {selectedReport.reported_user.phone || selectedReport.reported_user.id}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <DetailLink
                          href={`/admin/dashboard/users?userId=${selectedReport.reported_user_id}`}
                          label="Ouvrir le profil signalé"
                        />
                      </div>
                    </>
                  )}

                  {!selectedReport.reported_user && selectedReport.hike && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedReport.hike.title}</p>
                        <p className="text-xs text-gray-400">
                          {selectedReport.hike.status ?? '—'} · {formatDateTime(selectedReport.hike.date_start)}
                        </p>
                      </div>

                      <div className="mt-3">
                        <DetailLink
                          href={`/admin/dashboard/hikes?hikeId=${selectedReport.hike_id}`}
                          label="Ouvrir la randonnée"
                        />
                      </div>
                    </>
                  )}

                  {!selectedReport.reported_user && !selectedReport.hike && (
                    <p className="text-sm text-gray-500 break-all">
                      {selectedReport.reported_user_id ?? selectedReport.message_id ?? 'Aucune cible résolue'}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
                  Données brutes
                </p>
                <div className="rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                  {Object.entries(selectedReport.raw).map(([key, value]) => (
                    <div key={key} className="px-4 py-2.5">
                      <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                        {prettifyKey(key)}
                      </p>
                      <p className="text-sm text-gray-700 break-all">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}
