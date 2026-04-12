'use client'

import { useState, useCallback, useMemo } from 'react'
import Map, { Marker, Popup, NavigationControl, FullscreenControl, Source, Layer } from 'react-map-gl/mapbox'
import type { LayerProps } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { HikeMapPoint } from '@/lib/supabase-admin'

const STATUS_COLORS: Record<string, string> = {
  open: '#1D9E75',
  full: '#f97316',
  completed: '#3b82f6',
}

const STATUS_LABELS: Record<string, string> = {
  open: 'Ouverte',
  full: 'Complète',
  completed: 'Terminée',
}

const LEVEL_LABELS: Record<string, string> = {
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile',
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  expert: 'Expert',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

interface HikesMapProps {
  hikes: HikeMapPoint[]
}

export function HikesMap({ hikes }: HikesMapProps) {
  const [popupHike, setPopupHike] = useState<HikeMapPoint | null>(null)

  const handleMarkerClick = useCallback((e: { originalEvent?: Event }, hike: HikeMapPoint) => {
    e.originalEvent?.stopPropagation()
    setPopupHike((prev) => (prev?.id === hike.id ? null : hike))
  }, [])

  const statusCounts = useMemo(
    () =>
      hikes.reduce<Record<string, number>>((acc, h) => {
        acc[h.status] = (acc[h.status] ?? 0) + 1
        return acc
      }, {}),
    [hikes],
  )

  // GeoJSON de tous les tracés (lignes grises)
  const allRoutesGeoJSON = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: hikes
      .filter((h) => h.route && h.route.length > 1)
      .map((h) => ({
        type: 'Feature' as const,
        properties: { id: h.id, status: h.status },
        geometry: {
          type: 'LineString' as const,
          coordinates: h.route as [number, number][],
        },
      })),
  }), [hikes])

  // GeoJSON du tracé sélectionné (mis en avant)
  const selectedRouteGeoJSON = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: popupHike?.route && popupHike.route.length > 1
      ? [{
          type: 'Feature' as const,
          properties: {},
          geometry: {
            type: 'LineString' as const,
            coordinates: popupHike.route,
          },
        }]
      : [],
  }), [popupHike])

  const allRoutesLayer: LayerProps = {
    id: 'all-routes',
    type: 'line',
    paint: {
      'line-color': '#9ca3af',
      'line-width': 1.5,
      'line-opacity': 0.5,
    },
    layout: { 'line-join': 'round', 'line-cap': 'round' },
  }

  const selectedRouteLayer: LayerProps = {
    id: 'selected-route',
    type: 'line',
    paint: {
      'line-color': popupHike ? (STATUS_COLORS[popupHike.status] ?? '#1D9E75') : '#1D9E75',
      'line-width': 3,
      'line-opacity': 1,
    },
    layout: { 'line-join': 'round', 'line-cap': 'round' },
  }

  return (
    <div className="space-y-4">
      {/* Légende */}
      <div className="flex flex-wrap items-center gap-4">
        {hikes.length === 0 ? (
          <span className="text-sm text-gray-400">Aucune randonnée géolocalisée pour l&apos;instant</span>
        ) : (
          <>
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: STATUS_COLORS[status] ?? '#9ca3af' }}
                />
                <span className="text-sm text-gray-600">
                  {STATUS_LABELS[status] ?? status}{' '}
                  <span className="font-semibold text-gray-900">({count})</span>
                </span>
              </div>
            ))}
            <span className="text-sm text-gray-400 ml-auto">
              {hikes.length} randonnée{hikes.length !== 1 ? 's' : ''} · cliquez pour voir le tracé
            </span>
          </>
        )}
      </div>

      {/* Carte */}
      <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: 600 }}>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{ longitude: 2.3, latitude: 46.5, zoom: 5.2 }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
          onClick={() => setPopupHike(null)}
        >
          <NavigationControl position="top-right" />
          <FullscreenControl position="top-right" />

          {/* Tous les tracés en gris */}
          <Source id="all-routes" type="geojson" data={allRoutesGeoJSON}>
            <Layer {...allRoutesLayer} />
          </Source>

          {/* Tracé sélectionné en couleur */}
          <Source id="selected-route" type="geojson" data={selectedRouteGeoJSON}>
            <Layer {...selectedRouteLayer} />
          </Source>

          {/* Marqueurs */}
          {hikes.map((hike) => (
            <Marker
              key={hike.id}
              longitude={hike.lng}
              latitude={hike.lat}
              anchor="center"
              onClick={(e) => handleMarkerClick(e, hike)}
            >
              <div
                className="cursor-pointer transition-transform hover:scale-125"
                style={{
                  width: popupHike?.id === hike.id ? 16 : 12,
                  height: popupHike?.id === hike.id ? 16 : 12,
                  borderRadius: '50%',
                  backgroundColor: STATUS_COLORS[hike.status] ?? '#9ca3af',
                  border: `2px solid ${popupHike?.id === hike.id ? 'white' : 'rgba(255,255,255,0.8)'}`,
                  boxShadow: popupHike?.id === hike.id
                    ? '0 0 0 2px ' + (STATUS_COLORS[hike.status] ?? '#9ca3af') + ', 0 2px 6px rgba(0,0,0,0.3)'
                    : '0 1px 4px rgba(0,0,0,0.25)',
                  transition: 'all 0.15s',
                }}
              />
            </Marker>
          ))}

          {/* Popup */}
          {popupHike && (
            <Popup
              longitude={popupHike.lng}
              latitude={popupHike.lat}
              anchor="bottom"
              offset={14}
              closeButton={false}
              onClose={() => setPopupHike(null)}
              maxWidth="240px"
            >
              <div className="bg-white rounded-xl overflow-hidden text-sm" style={{ minWidth: 200 }}>
                <div className="h-1.5 w-full" style={{ backgroundColor: STATUS_COLORS[popupHike.status] ?? '#9ca3af' }} />
                <div className="p-3 space-y-1.5">
                  <p className="font-semibold text-gray-900 leading-tight">{popupHike.title}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${STATUS_COLORS[popupHike.status] ?? '#9ca3af'}20`,
                        color: STATUS_COLORS[popupHike.status] ?? '#6b7280',
                      }}
                    >
                      {STATUS_LABELS[popupHike.status] ?? popupHike.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {LEVEL_LABELS[popupHike.level] ?? popupHike.level}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{formatDate(popupHike.date_start)}</p>
                  <p className="text-xs text-gray-500">
                    {popupHike.current_count}/{popupHike.max_participants} participants
                  </p>
                  {popupHike.route && (
                    <p className="text-xs text-gray-400">{popupHike.route.length} pts GPS</p>
                  )}
                </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  )
}
