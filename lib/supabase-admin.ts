import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Ce client utilise la Service Role Key — jamais importé dans un Client Component
// Lazy initialization pour éviter les erreurs au build time (env vars absentes)
let _adminClient: SupabaseClient | null = null

function getAdminClient(): SupabaseClient {
  if (!_adminClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Missing Supabase environment variables')
    }
    _adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return _adminClient
}

export interface Profile {
  id: string
  created_at: string
  display_name: string | null
  email: string | null
  avatar_url: string | null
  platform: 'ios' | 'android' | null
}

export interface DashboardStats {
  totalUsers: number
  newUsersThisWeek: number
  iosCount: number
  androidCount: number
  totalHikes: number
  hikesThisWeek: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [
    { count: totalUsers },
    { count: newUsersThisWeek },
    { count: iosCount },
    { count: androidCount },
    { count: totalHikes },
    { count: hikesThisWeek },
  ] = await Promise.all([
    getAdminClient().from('profiles').select('*', { count: 'exact', head: true }),
    getAdminClient()
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo),
    getAdminClient()
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('platform', 'ios'),
    getAdminClient()
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('platform', 'android'),
    getAdminClient().from('hikes').select('*', { count: 'exact', head: true }),
    getAdminClient()
      .from('hikes')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo),
  ])

  return {
    totalUsers: totalUsers ?? 0,
    newUsersThisWeek: newUsersThisWeek ?? 0,
    iosCount: iosCount ?? 0,
    androidCount: androidCount ?? 0,
    totalHikes: totalHikes ?? 0,
    hikesThisWeek: hikesThisWeek ?? 0,
  }
}

export async function getUsers(
  page: number,
  search: string,
): Promise<{ users: (Profile & { hike_count: number })[]; total: number }> {
  const pageSize = 20
  const offset = (page - 1) * pageSize

  let query = getAdminClient()
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1)

  if (search) {
    query = query.or(`display_name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  const { data: users, count } = await query

  if (!users || users.length === 0) {
    return { users: [], total: count ?? 0 }
  }

  const userIds = users.map((u) => u.id)
  const { data: hikes } = await getAdminClient()
    .from('hikes')
    .select('user_id')
    .in('user_id', userIds)

  const hikeCountMap: Record<string, number> = {}
  hikes?.forEach((h) => {
    hikeCountMap[h.user_id] = (hikeCountMap[h.user_id] ?? 0) + 1
  })

  return {
    users: users.map((u) => ({ ...u, hike_count: hikeCountMap[u.id] ?? 0 })),
    total: count ?? 0,
  }
}

export async function getUserById(id: string): Promise<(Profile & { hike_count: number }) | null> {
  const { data: user } = await getAdminClient().from('profiles').select('*').eq('id', id).single()

  if (!user) return null

  const { count } = await getAdminClient()
    .from('hikes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', id)

  return { ...user, hike_count: count ?? 0 }
}
