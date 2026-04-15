import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _adminClient: SupabaseClient | null = null

function getAdminClient(): SupabaseClient {
  if (!_adminClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Missing Supabase environment variables')
    }
    _adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  }
  return _adminClient
}

export interface User {
  id: string
  display_name: string
  phone: string
  phone_verified: boolean
  photo_url: string | null
  birth_date: string
  level: string
  languages: string[]
  rating_avg: number
  rating_count: number
  created_at: string
  is_banned: boolean
  is_deleted: boolean
  deleted_at: string | null
}

export interface DashboardStats {
  // Utilisateurs
  totalUsers: number
  activeUsers: number
  newUsersThisWeek: number
  bannedUsers: number
  deletedUsers: number
  // Randonnées
  totalHikes: number
  hikesThisWeek: number
  openHikes: number
  completedHikes: number
  // Activité
  totalParticipations: number
  totalMessages: number
  totalRatings: number
  avgRatingScore: number
  totalReports: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const db = getAdminClient()
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [
    { count: totalUsers },
    { count: activeUsers },
    { count: newUsersThisWeek },
    { count: bannedUsers },
    { count: deletedUsers },
    { count: totalHikes },
    { count: hikesThisWeek },
    { count: openHikes },
    { count: completedHikes },
    { count: totalParticipations },
    { count: totalMessages },
    ratingsResult,
    { count: totalReports },
  ] = await Promise.all([
    db.from('user').select('*', { count: 'exact', head: true }),
    db.from('user').select('*', { count: 'exact', head: true }).eq('is_deleted', false).eq('is_banned', false),
    db.from('user').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
    db.from('user').select('*', { count: 'exact', head: true }).eq('is_banned', true),
    db.from('user').select('*', { count: 'exact', head: true }).eq('is_deleted', true),
    db.from('hike').select('*', { count: 'exact', head: true }),
    db.from('hike').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
    db.from('hike').select('*', { count: 'exact', head: true }).eq('status', 'open'),
    db.from('hike').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
    db.from('participation').select('*', { count: 'exact', head: true }),
    db.from('group_message').select('*', { count: 'exact', head: true }).eq('is_system', false),
    db.from('rating').select('score'),
    db.from('report').select('*', { count: 'exact', head: true }),
  ])

  const scores = ratingsResult.data ?? []
  const avgRatingScore =
    scores.length > 0
      ? Math.round((scores.reduce((sum, r) => sum + r.score, 0) / scores.length) * 10) / 10
      : 0

  return {
    totalUsers: totalUsers ?? 0,
    activeUsers: activeUsers ?? 0,
    newUsersThisWeek: newUsersThisWeek ?? 0,
    bannedUsers: bannedUsers ?? 0,
    deletedUsers: deletedUsers ?? 0,
    totalHikes: totalHikes ?? 0,
    hikesThisWeek: hikesThisWeek ?? 0,
    openHikes: openHikes ?? 0,
    completedHikes: completedHikes ?? 0,
    totalParticipations: totalParticipations ?? 0,
    totalMessages: totalMessages ?? 0,
    totalRatings: scores.length,
    avgRatingScore,
    totalReports: totalReports ?? 0,
  }
}

export async function getUsers(
  page: number,
  search: string,
): Promise<{ users: (User & { hike_count: number })[]; total: number }> {
  const pageSize = 20
  const offset = (page - 1) * pageSize
  const db = getAdminClient()

  let query = db
    .from('user')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1)

  if (search) {
    query = query.ilike('display_name', `%${search}%`)
  }

  const { data: users, count } = await query

  if (!users || users.length === 0) return { users: [], total: count ?? 0 }

  const userIds = users.map((u) => u.id)
  const { data: participations } = await db
    .from('participation')
    .select('user_id')
    .in('user_id', userIds)

  const hikeCountMap: Record<string, number> = {}
  participations?.forEach((p) => {
    hikeCountMap[p.user_id] = (hikeCountMap[p.user_id] ?? 0) + 1
  })

  return {
    users: users.map((u) => ({ ...u, hike_count: hikeCountMap[u.id] ?? 0 })),
    total: count ?? 0,
  }
}

export async function getUserById(id: string): Promise<(User & { hike_count: number }) | null> {
  const db = getAdminClient()
  const { data: user } = await db.from('user').select('*').eq('id', id).single()
  if (!user) return null

  const { count } = await db
    .from('participation')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', id)

  return { ...user, hike_count: count ?? 0 }
}

type AdminRow = Record<string, unknown>

export interface ReportUserSummary {
  id: string
  display_name: string
  photo_url: string | null
  phone: string | null
}

export interface ReportHikeSummary {
  id: string
  title: string
  status: string | null
  date_start: string | null
}

export interface ReportRecord {
  id: string
  created_at: string
  updated_at: string | null
  status: string
  category: string | null
  description: string | null
  target_type: string
  reporter_user_id: string | null
  reported_user_id: string | null
  hike_id: string | null
  message_id: string | null
  resolved_at: string | null
  reporter: ReportUserSummary | null
  reported_user: ReportUserSummary | null
  hike: ReportHikeSummary | null
  raw: Record<string, string>
}

function pickFirstString(row: AdminRow, keys: string[]): string | null {
  for (const key of keys) {
    const value = row[key]
    if (typeof value === 'string' && value.trim()) return value
  }
  return null
}

function stringifyRawValue(value: unknown): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function inferReportTargetType(row: AdminRow): string {
  const explicitType = pickFirstString(row, [
    'target_type',
    'entity_type',
    'subject_type',
    'resource_type',
    'content_type',
  ])

  if (explicitType) return explicitType
  if (pickFirstString(row, ['reported_user_id', 'target_user_id', 'user_target_id'])) return 'user'
  if (pickFirstString(row, ['hike_id', 'target_hike_id'])) return 'hike'
  if (pickFirstString(row, ['group_message_id', 'message_id', 'target_message_id'])) return 'message'
  return 'other'
}

function serializeReportRaw(row: AdminRow): Record<string, string> {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [key, stringifyRawValue(value)]),
  )
}

function normalizeReport(
  row: AdminRow,
  usersById: Record<string, ReportUserSummary>,
  hikesById: Record<string, ReportHikeSummary>,
): ReportRecord {
  const targetType = inferReportTargetType(row)
  const reporterUserId = pickFirstString(row, [
    'reporter_user_id',
    'reporter_id',
    'author_user_id',
    'created_by',
    'created_by_user_id',
    'sender_user_id',
  ])

  let reportedUserId = pickFirstString(row, [
    'reported_user_id',
    'target_user_id',
    'user_target_id',
    'offending_user_id',
    'against_user_id',
    'reported_id',
  ])

  if (!reportedUserId && targetType === 'user') {
    reportedUserId = pickFirstString(row, ['user_id'])
  }

  const hikeId = pickFirstString(row, ['hike_id', 'target_hike_id'])
  const messageId = pickFirstString(row, ['group_message_id', 'message_id', 'target_message_id'])

  return {
    id: pickFirstString(row, ['id']) ?? '',
    created_at: pickFirstString(row, ['created_at']) ?? new Date(0).toISOString(),
    updated_at: pickFirstString(row, ['updated_at', 'processed_at']) ?? null,
    status: pickFirstString(row, ['status', 'report_status', 'moderation_status', 'state']) ?? 'new',
    category: pickFirstString(row, ['reason', 'category', 'report_type', 'type', 'motif']),
    description: pickFirstString(row, ['description', 'details', 'message', 'comment', 'context', 'body']),
    target_type: targetType,
    reporter_user_id: reporterUserId,
    reported_user_id: reportedUserId,
    hike_id: hikeId,
    message_id: messageId,
    resolved_at: pickFirstString(row, ['resolved_at', 'reviewed_at', 'closed_at', 'handled_at']),
    reporter: reporterUserId ? usersById[reporterUserId] ?? null : null,
    reported_user: reportedUserId ? usersById[reportedUserId] ?? null : null,
    hike: hikeId ? hikesById[hikeId] ?? null : null,
    raw: serializeReportRaw(row),
  }
}

async function hydrateReports(rows: AdminRow[]): Promise<ReportRecord[]> {
  if (rows.length === 0) return []

  const db = getAdminClient()
  const userIds = Array.from(
    new Set(
      rows.flatMap((row) => {
        const targetType = inferReportTargetType(row)
        const ids = [
          pickFirstString(row, [
            'reporter_user_id',
            'reporter_id',
            'author_user_id',
            'created_by',
            'created_by_user_id',
            'sender_user_id',
          ]),
          pickFirstString(row, [
            'reported_user_id',
            'target_user_id',
            'user_target_id',
            'offending_user_id',
            'against_user_id',
            'reported_id',
          ]),
        ]

        if (targetType === 'user') {
          ids.push(pickFirstString(row, ['user_id']))
        }

        return ids.filter((id): id is string => Boolean(id))
      }),
    ),
  )

  const hikeIds = Array.from(
    new Set(
      rows
        .map((row) => pickFirstString(row, ['hike_id', 'target_hike_id']))
        .filter((id): id is string => Boolean(id)),
    ),
  )

  const [usersResult, hikesResult] = await Promise.all([
    userIds.length > 0
      ? db.from('user').select('id, display_name, photo_url, phone').in('id', userIds)
      : Promise.resolve({ data: [] as ReportUserSummary[] }),
    hikeIds.length > 0
      ? db.from('hike').select('id, title, status, date_start').in('id', hikeIds)
      : Promise.resolve({ data: [] as ReportHikeSummary[] }),
  ])

  const usersById: Record<string, ReportUserSummary> = {}
  usersResult.data?.forEach((user) => {
    usersById[user.id] = user
  })

  const hikesById: Record<string, ReportHikeSummary> = {}
  hikesResult.data?.forEach((hike) => {
    hikesById[hike.id] = hike
  })

  return rows.map((row) => normalizeReport(row, usersById, hikesById))
}

function matchesReportSearch(report: ReportRecord, search: string): boolean {
  if (!search) return true

  const haystack = [
    report.id,
    report.status,
    report.category ?? '',
    report.description ?? '',
    report.target_type,
    report.reporter?.display_name ?? '',
    report.reported_user?.display_name ?? '',
    report.hike?.title ?? '',
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(search.toLowerCase())
}

export async function getReports(
  page: number,
  search: string,
): Promise<{ reports: ReportRecord[]; total: number }> {
  const pageSize = 20
  const offset = (page - 1) * pageSize
  const db = getAdminClient()

  if (search.trim()) {
    const { data } = await db.from('report').select('*').order('created_at', { ascending: false })
    const hydratedReports = await hydrateReports((data ?? []) as AdminRow[])
    const filteredReports = hydratedReports.filter((report) => matchesReportSearch(report, search))

    return {
      reports: filteredReports.slice(offset, offset + pageSize),
      total: filteredReports.length,
    }
  }

  const { data, count } = await db
    .from('report')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1)

  return {
    reports: await hydrateReports((data ?? []) as AdminRow[]),
    total: count ?? 0,
  }
}

export async function getReportById(id: string): Promise<ReportRecord | null> {
  const db = getAdminClient()
  const { data } = await db.from('report').select('*').eq('id', id).maybeSingle()

  if (!data) return null

  const reports = await hydrateReports([data as AdminRow])
  return reports[0] ?? null
}

export interface Hike {
  id: string
  title: string
  description: string | null
  creator_id: string
  date_start: string
  date_flexible: boolean
  distance_km: number
  duration_min: number
  elevation_m: number
  level: string
  status: string
  max_participants: number
  current_count: number
  has_vehicle: boolean
  auto_accept: boolean
  created_at: string
}

export interface HikeParticipant {
  user_id: string
  role: string
  status: string
  joined_at: string
  display_name: string
  photo_url: string | null
}

export async function getHikes(
  page: number,
  search: string,
  statusFilter: string,
): Promise<{ hikes: (Hike & { creator_name: string })[]; total: number }> {
  const pageSize = 20
  const offset = (page - 1) * pageSize
  const db = getAdminClient()

  let query = db
    .from('hike')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1)

  if (search) query = query.ilike('title', `%${search}%`)
  if (statusFilter) query = query.eq('status', statusFilter)

  const { data: hikes, count } = await query
  if (!hikes || hikes.length === 0) return { hikes: [], total: count ?? 0 }

  const creatorIds = Array.from(new Set(hikes.map((h) => h.creator_id)))
  const { data: creators } = await db
    .from('user')
    .select('id, display_name')
    .in('id', creatorIds)

  const creatorMap: Record<string, string> = {}
  creators?.forEach((c) => { creatorMap[c.id] = c.display_name })

  return {
    hikes: hikes.map((h) => ({ ...h, creator_name: creatorMap[h.creator_id] ?? '—' })),
    total: count ?? 0,
  }
}

export interface HikeMapPoint {
  id: string
  title: string
  level: string
  status: string
  date_start: string
  current_count: number
  max_participants: number
  lng: number
  lat: number
  route: [number, number][] | null
}

// Décode un point PostGIS EWKB hex → { lng, lat }
function parseWKBPoint(hex: string): { lng: number; lat: number } | null {
  try {
    const bytes = new Uint8Array(hex.length / 2)
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
    }
    const view = new DataView(bytes.buffer)
    const le = bytes[0] === 1
    const type = view.getUint32(1, le)
    const hasSrid = (type & 0x20000000) !== 0
    const offset = 5 + (hasSrid ? 4 : 0)
    return { lng: view.getFloat64(offset, le), lat: view.getFloat64(offset + 8, le) }
  } catch {
    return null
  }
}

export async function getHikesForMap(): Promise<HikeMapPoint[]> {
  const db = getAdminClient()
  const { data } = await db
    .from('hike')
    .select('id, title, level, status, date_start, current_count, max_participants, start_location, route_coordinates')
    .neq('status', 'cancelled')

  if (!data) return []

  const points: HikeMapPoint[] = []
  for (const h of data) {
    const loc = h.start_location
    let coords: { lng: number; lat: number } | null = null

    if (typeof loc === 'string') {
      coords = parseWKBPoint(loc)
    } else if (loc && typeof loc === 'object' && loc.type === 'Point') {
      coords = { lng: loc.coordinates[0], lat: loc.coordinates[1] }
    }

    // Fallback : premier point du tracé
    if (!coords && h.route_coordinates) {
      try {
        const route: [number, number][] =
          typeof h.route_coordinates === 'string'
            ? JSON.parse(h.route_coordinates)
            : h.route_coordinates
        if (route.length > 0) coords = { lng: route[0][0], lat: route[0][1] }
      } catch { /* ignore */ }
    }

    if (!coords) continue

    let route: [number, number][] | null = null
    if (h.route_coordinates) {
      try {
        route =
          typeof h.route_coordinates === 'string'
            ? JSON.parse(h.route_coordinates)
            : h.route_coordinates
      } catch { /* ignore */ }
    }

    points.push({
      id: h.id, title: h.title, level: h.level, status: h.status,
      date_start: h.date_start, current_count: h.current_count,
      max_participants: h.max_participants,
      lng: coords.lng, lat: coords.lat,
      route,
    })
  }
  return points
}

export async function getHikeById(
  id: string,
): Promise<(Hike & { creator_name: string; participants: HikeParticipant[] }) | null> {
  const db = getAdminClient()
  const { data: hike } = await db.from('hike').select('*').eq('id', id).single()
  if (!hike) return null

  const [{ data: creator }, { data: participations }] = await Promise.all([
    db.from('user').select('display_name').eq('id', hike.creator_id).single(),
    db.from('participation').select('user_id, role, status, joined_at').eq('hike_id', id),
  ])

  let participants: HikeParticipant[] = []
  if (participations && participations.length > 0) {
    const userIds = participations.map((p) => p.user_id)
    const { data: users } = await db
      .from('user')
      .select('id, display_name, photo_url')
      .in('id', userIds)

    const userMap: Record<string, { display_name: string; photo_url: string | null }> = {}
    users?.forEach((u) => { userMap[u.id] = u })

    participants = participations.map((p) => ({
      ...p,
      display_name: userMap[p.user_id]?.display_name ?? '—',
      photo_url: userMap[p.user_id]?.photo_url ?? null,
    }))
  }

  return {
    ...hike,
    creator_name: creator?.display_name ?? '—',
    participants,
  }
}
