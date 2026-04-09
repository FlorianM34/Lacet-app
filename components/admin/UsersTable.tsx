'use client'

import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { Profile } from '@/lib/supabase-admin'
import Image from 'next/image'

type UserWithHikeCount = Profile & { hike_count: number }

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

function AppleIcon() {
  return (
    <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.3-2.18 3.87.03 3.02 2.65 4.03 2.68 4.04l-.05.17zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function AndroidIcon() {
  return (
    <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.18 23.76c.35.2.74.24 1.12.14L15.34 12 12 8.66 3.18 23.76zM20.5 10.61L17.7 9 15 12l2.7 3 2.8-1.61c.8-.46.8-2.32 0-2.78zM1.86.29C1.54.7 1.36 1.28 1.36 2v20c0 .72.18 1.3.5 1.71L12 12 1.86.29zM15.34 12L4.3.1A1.78 1.78 0 0 0 3.18.24L15.34 12z" />
    </svg>
  )
}

function PlatformBadge({ platform }: { platform: string | null }) {
  if (!platform) return <span className="text-gray-300">—</span>
  const isIos = platform.toLowerCase() === 'ios'
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        isIos ? 'bg-gray-100 text-gray-600' : 'bg-green-50 text-green-700'
      }`}
    >
      {isIos ? <AppleIcon /> : <AndroidIcon />} {platform.toUpperCase()}
    </span>
  )
}

function Avatar({ url, name }: { url: string | null; name: string | null }) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?'

  if (url) {
    return (
      <Image
        src={url}
        alt={name ?? 'Avatar'}
        width={32}
        height={32}
        className="w-8 h-8 rounded-full object-cover"
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

  function selectUser(userId: string) {
    updateParams({ userId })
  }

  return (
    <div className="flex gap-6 h-full">
      {/* Table container */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Rechercher par nom ou email…"
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

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Plateforme
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
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400 text-sm">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isSelected = selectedUser?.id === user.id
                  return (
                    <tr
                      key={user.id}
                      onClick={() => selectUser(user.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#e8f7f1]'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar url={user.avatar_url} name={user.display_name} />
                          <span className="font-medium text-gray-900 truncate max-w-[120px]">
                            {user.display_name ?? <span className="text-gray-400 italic">Sans nom</span>}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate max-w-[180px] hidden md:table-cell">
                        {user.email ?? '—'}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <PlatformBadge platform={user.platform} />
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

        {/* Pagination */}
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

      {/* User detail panel */}
      {selectedUser && (
        <aside className="w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-0">
            <div className="h-24 bg-gradient-to-br from-[#1D9E75] to-[#157a5a]" />
            <div className="px-5 pb-5">
              <div className="-mt-8 mb-4 flex items-end justify-between">
                <Avatar url={selectedUser.avatar_url} name={selectedUser.display_name} />
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

              <h3 className="font-bold text-gray-900 text-base">
                {selectedUser.display_name ?? <span className="text-gray-400 italic">Sans nom</span>}
              </h3>
              {selectedUser.email && (
                <p className="text-sm text-gray-500 mt-0.5 break-all">{selectedUser.email}</p>
              )}

              <dl className="mt-5 space-y-3">
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                    Plateforme
                  </dt>
                  <dd>
                    <PlatformBadge platform={selectedUser.platform} />
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
                    Randonnées
                  </dt>
                  <dd className="text-2xl font-extrabold text-gray-900">
                    {selectedUser.hike_count}
                  </dd>
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
