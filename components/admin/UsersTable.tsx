'use client'

import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { User } from '@/lib/supabase-admin'
import Image from 'next/image'

type UserWithHikeCount = User & { hike_count: number }

interface UsersTableProps {
  users: UserWithHikeCount[]
  total: number
  page: number
  search: string
  selectedUser: UserWithHikeCount | null
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function LevelBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    easy: 'bg-green-50 text-green-700',
    medium: 'bg-orange-50 text-orange-700',
    hard: 'bg-red-50 text-red-700',
    beginner: 'bg-green-50 text-green-700',
    intermediate: 'bg-orange-50 text-orange-700',
    expert: 'bg-red-50 text-red-700',
  }
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${styles[level] ?? 'bg-gray-100 text-gray-600'}`}
    >
      {level}
    </span>
  )
}

function Stars({ avg, count }: { avg: number; count: number }) {
  if (count === 0) return <span className="text-gray-300 text-xs">—</span>
  return (
    <span className="text-xs text-gray-600">
      <span className="text-yellow-400">★</span> {avg.toFixed(1)}{' '}
      <span className="text-gray-400">({count})</span>
    </span>
  )
}

function Avatar({ url, name }: { url: string | null; name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
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

export function UsersTable({ users, total, page, search, selectedUser }: UsersTableProps) {
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
    updateParams({ search: searchInput, page: '1', userId: '' })
  }

  return (
    <div className="flex gap-6 h-full">
      <div className="flex-1 min-w-0 space-y-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Rechercher par nom…"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: '#1D9E75' }}
          >
            Rechercher
          </button>
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearchInput('')
                updateParams({ search: '', page: '1' })
              }}
              className="px-3 py-2.5 rounded-xl text-sm text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </form>

        <p className="text-xs text-gray-400">
          {total} utilisateur{total !== 1 ? 's' : ''}
          {search && ` pour « ${search} »`}
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Téléphone
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Niveau
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Note
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Inscription
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Randos
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isSelected = selectedUser?.id === user.id
                  return (
                    <tr
                      key={user.id}
                      onClick={() => updateParams({ userId: user.id })}
                      className={`cursor-pointer transition-colors ${isSelected ? 'bg-[#e8f7f1]' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar url={user.photo_url} name={user.display_name} />
                          <div className="min-w-0">
                            <span className="font-medium text-gray-900 truncate block max-w-[120px]">
                              {user.display_name}
                            </span>
                            {user.is_banned && (
                              <span className="text-xs text-red-500 font-medium">Banni</span>
                            )}
                            {user.is_deleted && (
                              <span className="text-xs text-gray-400 font-medium">Supprimé</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                        {user.phone}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <LevelBadge level={user.level} />
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <Stars avg={user.rating_avg} count={user.rating_count} />
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {user.hike_count}
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
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              ← Précédent
            </button>
            <span className="text-sm text-gray-500">
              Page {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => updateParams({ page: String(page + 1) })}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Suivant →
            </button>
          </div>
        )}
      </div>

      {/* Panneau détail */}
      {selectedUser && (
        <aside className="w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-0">
            <div className="h-24 bg-gradient-to-br from-[#1D9E75] to-[#157a5a]" />
            <div className="px-5 pb-5">
              <div className="-mt-8 mb-4 flex items-end justify-between">
                <Avatar url={selectedUser.photo_url} name={selectedUser.display_name} />
                <button
                  onClick={() => updateParams({ userId: '' })}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Fermer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <h3 className="font-bold text-gray-900 text-base">{selectedUser.display_name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{selectedUser.phone}</p>

              {(selectedUser.is_banned || selectedUser.is_deleted) && (
                <div className="mt-2 flex gap-2">
                  {selectedUser.is_banned && (
                    <span className="text-xs bg-red-50 text-red-600 font-medium px-2 py-0.5 rounded-full">
                      Banni
                    </span>
                  )}
                  {selectedUser.is_deleted && (
                    <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-full">
                      Supprimé
                    </span>
                  )}
                </div>
              )}

              <dl className="mt-5 space-y-3">
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Niveau
                  </dt>
                  <dd>
                    <LevelBadge level={selectedUser.level} />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Note moyenne
                  </dt>
                  <dd>
                    <Stars avg={selectedUser.rating_avg} count={selectedUser.rating_count} />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Langues
                  </dt>
                  <dd className="text-sm text-gray-700">
                    {selectedUser.languages?.join(', ') || '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Randonnées
                  </dt>
                  <dd className="text-2xl font-extrabold text-gray-900">
                    {selectedUser.hike_count}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Membre depuis
                  </dt>
                  <dd className="text-sm text-gray-700">{formatDate(selectedUser.created_at)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    ID
                  </dt>
                  <dd className="text-xs text-gray-400 font-mono break-all">{selectedUser.id}</dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}
