'use client'

import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import type { Hike, HikeParticipant } from '@/lib/supabase-admin'

type HikeWithCreator = Hike & { creator_name: string }
type HikeDetail = Hike & { creator_name: string; participants: HikeParticipant[] }

interface HikesTableProps {
  hikes: HikeWithCreator[]
  total: number
  page: number
  search: string
  statusFilter: string
  selectedHike: HikeDetail | null
}

const STATUS_OPTIONS = [
  { value: '', label: 'Tous' },
  { value: 'open', label: 'Ouvertes' },
  { value: 'full', label: 'Complètes' },
  { value: 'completed', label: 'Terminées' },
  { value: 'cancelled', label: 'Annulées' },
]

const STATUS_STYLES: Record<string, string> = {
  open: 'bg-green-50 text-green-700',
  full: 'bg-orange-50 text-orange-700',
  completed: 'bg-blue-50 text-blue-700',
  cancelled: 'bg-red-50 text-red-600',
}

const STATUS_LABELS: Record<string, string> = {
  open: 'Ouverte',
  full: 'Complète',
  completed: 'Terminée',
  cancelled: 'Annulée',
}

const LEVEL_STYLES: Record<string, string> = {
  easy: 'bg-green-50 text-green-700',
  medium: 'bg-orange-50 text-orange-700',
  hard: 'bg-red-50 text-red-700',
  beginner: 'bg-green-50 text-green-700',
  intermediate: 'bg-orange-50 text-orange-700',
  expert: 'bg-red-50 text-red-700',
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

function LevelBadge({ level }: { level: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${LEVEL_STYLES[level] ?? 'bg-gray-100 text-gray-600'}`}>
      {level}
    </span>
  )
}

function Avatar({ url, name }: { url: string | null; name: string }) {
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
  if (url) {
    return <Image src={url} alt={name} width={24} height={24} className="w-6 h-6 rounded-full object-cover shrink-0" />
  }
  return (
    <div className="w-6 h-6 rounded-full bg-[#e8f7f1] text-[#1D9E75] flex items-center justify-center text-[10px] font-bold shrink-0">
      {initials}
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatDuration(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h === 0) return `${m}min`
  if (m === 0) return `${h}h`
  return `${h}h${m.toString().padStart(2, '0')}`
}

const ROLE_LABELS: Record<string, string> = {
  creator: 'Créateur',
  participant: 'Participant',
}

const PARTICIPATION_STATUS_STYLES: Record<string, string> = {
  accepted: 'text-green-600',
  pending: 'text-orange-500',
  rejected: 'text-red-500',
  left: 'text-gray-400',
}

export function HikesTable({ hikes, total, page, search, statusFilter, selectedHike }: HikesTableProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState(search)

  const pageSize = 20
  const totalPages = Math.ceil(total / pageSize)

  function updateParams(params: Record<string, string>) {
    const next = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([k, v]) => {
      if (v) next.set(k, v)
      else next.delete(k)
    })
    router.push(`${pathname}?${next.toString()}`)
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    updateParams({ search: searchInput, page: '1', hikeId: '' })
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0 space-y-4">
        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-2">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1">
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Rechercher par titre…"
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
                onClick={() => { setSearchInput(''); updateParams({ search: '', page: '1' }) }}
                className="px-3 py-2.5 rounded-xl text-sm text-gray-500 border border-gray-200 hover:bg-gray-50"
              >
                ×
              </button>
            )}
          </form>

          {/* Filtre statut */}
          <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 shrink-0">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateParams({ status: opt.value, page: '1', hikeId: '' })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === opt.value
                    ? 'bg-[#1D9E75] text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400">
          {total} randonnée{total !== 1 ? 's' : ''}
          {search && ` pour « ${search} »`}
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Titre</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Créateur</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Niveau</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Statut</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Partici.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {hikes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Aucune randonnée trouvée
                  </td>
                </tr>
              ) : (
                hikes.map((hike) => {
                  const isSelected = selectedHike?.id === hike.id
                  return (
                    <tr
                      key={hike.id}
                      onClick={() => updateParams({ hikeId: hike.id })}
                      className={`cursor-pointer transition-colors ${isSelected ? 'bg-[#e8f7f1]' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-900 truncate block max-w-[160px]">
                          {hike.title}
                        </span>
                        <span className="text-xs text-gray-400">
                          {hike.distance_km} km · {formatDuration(hike.duration_min)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                        {hike.creator_name}
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                        {formatDate(hike.date_start)}
                        {hike.date_flexible && (
                          <span className="ml-1 text-xs text-gray-400">±</span>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <LevelBadge level={hike.level} />
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <StatusBadge status={hike.status} />
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {hike.current_count}/{hike.max_participants}
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
              onClick={() => updateParams({ page: String(page - 1) })}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              ← Précédent
            </button>
            <span className="text-sm text-gray-500">Page {page} / {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => updateParams({ page: String(page + 1) })}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Suivant →
            </button>
          </div>
        )}
      </div>

      {/* Panneau détail */}
      {selectedHike && (
        <aside className="w-80 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-0 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="h-20 bg-gradient-to-br from-[#1D9E75] to-[#157a5a]" />
            <div className="px-5 pb-5">
              <div className="-mt-4 mb-4 flex items-start justify-between">
                <StatusBadge status={selectedHike.status} />
                <button
                  onClick={() => updateParams({ hikeId: '' })}
                  className="text-gray-400 hover:text-gray-600 transition-colors mt-1"
                  aria-label="Fermer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h3 className="font-bold text-gray-900 text-base leading-tight">{selectedHike.title}</h3>
              {selectedHike.description && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-3">{selectedHike.description}</p>
              )}

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: 'Distance', value: `${selectedHike.distance_km} km` },
                  { label: 'Durée', value: formatDuration(selectedHike.duration_min) },
                  { label: 'Dénivelé', value: `${selectedHike.elevation_m} m` },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
                    <p className="text-xs text-gray-400 mb-0.5">{s.label}</p>
                    <p className="text-sm font-bold text-gray-900">{s.value}</p>
                  </div>
                ))}
              </div>

              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Créateur</dt>
                  <dd className="text-sm text-gray-700">{selectedHike.creator_name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Date</dt>
                  <dd className="text-sm text-gray-700">
                    {formatDate(selectedHike.date_start)}
                    {selectedHike.date_flexible && <span className="ml-1 text-xs text-gray-400">(flexible)</span>}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Niveau</dt>
                  <dd><LevelBadge level={selectedHike.level} /></dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Places</dt>
                  <dd className="text-sm text-gray-700">
                    {selectedHike.current_count} / {selectedHike.max_participants} participants
                  </dd>
                </div>
                <div className="flex gap-4">
                  <div>
                    <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Véhicule</dt>
                    <dd className="text-sm text-gray-700">{selectedHike.has_vehicle ? 'Oui' : 'Non'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Auto-accept</dt>
                    <dd className="text-sm text-gray-700">{selectedHike.auto_accept ? 'Oui' : 'Non'}</dd>
                  </div>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Créée le</dt>
                  <dd className="text-sm text-gray-700">{formatDate(selectedHike.created_at)}</dd>
                </div>
              </dl>

              {/* Participants */}
              {selectedHike.participants.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
                    Participants ({selectedHike.participants.length})
                  </p>
                  <ul className="space-y-2">
                    {selectedHike.participants.map((p) => (
                      <li key={p.user_id} className="flex items-center gap-2">
                        <Avatar url={p.photo_url} name={p.display_name} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 font-medium truncate">{p.display_name}</p>
                          <p className="text-xs text-gray-400">
                            {ROLE_LABELS[p.role] ?? p.role}
                          </p>
                        </div>
                        <span className={`text-xs font-medium ${PARTICIPATION_STATUS_STYLES[p.status] ?? 'text-gray-500'}`}>
                          {p.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-mono break-all">{selectedHike.id}</p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}
