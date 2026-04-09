import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getUsers, getUserById } from '@/lib/supabase-admin'
import { UsersTable } from '@/components/admin/UsersTable'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Utilisateurs | Lacet Admin' }

interface PageProps {
  searchParams: {
    page?: string
    search?: string
    userId?: string
  }
}

export default async function UsersPage({ searchParams }: PageProps) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const search = searchParams.search ?? ''
  const userId = searchParams.userId ?? ''

  const [{ users, total }, selectedUser] = await Promise.all([
    getUsers(page, search),
    userId ? getUserById(userId) : Promise.resolve(null),
  ])

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">Utilisateurs</h2>
        <p className="text-gray-400 text-sm mt-1">Gérez les comptes depuis Supabase</p>
      </div>

      <Suspense fallback={<div className="text-sm text-gray-400">Chargement…</div>}>
        <UsersTable
          users={users}
          total={total}
          page={page}
          search={search}
          selectedUser={selectedUser}
        />
      </Suspense>
    </div>
  )
}
