import Image from 'next/image'
import { Map, Users, Mountain, Crosshair, MessageSquare, MapPin, Star } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { LogoIcon } from '@/components/Logo'

function PhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ width: 260 }}>
      {/* Dynamic Island par-dessus l'image */}
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[88px] h-[26px] bg-black rounded-full z-10" />
      {/* Bordure + screenshot */}
      <div className="rounded-[44px] border-[5px] border-gray-800 overflow-hidden shadow-2xl">
        <Image
          src="/app-screenshot.png"
          alt="Capture d'écran de l'application Lacet — écran Explorer"
          width={260}
          height={562}
          className="block w-full h-auto"
          priority
        />
      </div>
    </div>
  )
}

function AppStoreBadge({ store }: { store: 'apple' | 'google' }) {
  return (
    <a
      href="#"
      className="flex items-center gap-2.5 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-xl transition-colors group"
    >
      {store === 'apple' ? (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.3-2.18 3.87.03 3.02 2.65 4.03 2.68 4.04l-.05.17zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.18 23.76c.35.2.74.24 1.12.14L15.34 12 12 8.66 3.18 23.76zM20.5 10.61L17.7 9 15 12l2.7 3 2.8-1.61c.8-.46.8-2.32 0-2.78zM1.86.29C1.54.7 1.36 1.28 1.36 2v20c0 .72.18 1.3.5 1.71L12 12 1.86.29zM15.34 12L4.3.1A1.78 1.78 0 0 0 3.18.24L15.34 12z" />
        </svg>
      )}
      <div className="text-left">
        <p className="text-[10px] opacity-70 leading-tight">
          {store === 'apple' ? 'Disponible sur' : 'Disponible sur'}
        </p>
        <p className="text-sm font-semibold leading-tight">
          {store === 'apple' ? 'App Store' : 'Google Play'}
        </p>
      </div>
    </a>
  )
}

function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 text-2xl">
        {icon}
      </div>
      <div className="w-8 h-8 rounded-full bg-[#1D9E75] text-white text-sm font-bold flex items-center justify-center mb-3">
        {number}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{description}</p>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-[#e8f7f1] flex items-center justify-center mb-4 text-xl">
        {icon}
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="min-h-screen bg-[#F5F0EB] flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm text-[#1D9E75] font-medium shadow-sm mb-8">
              <LogoIcon size={16} />
              La rando, ensemble
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Trouve ta prochaine rando,{' '}
              <span style={{ color: '#1D9E75' }}>avec les bonnes personnes</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-lg">
              Lacet connecte les randonneurs par niveau, région et envies pour vivre des aventures
              en groupe mémorables. Plus besoin de randonner seul.
            </p>
            <div className="flex flex-wrap gap-3">
              <AppStoreBadge store="apple" />
              <AppStoreBadge store="google" />
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative background */}
              <div
                className="absolute -inset-8 rounded-[60px] opacity-20 blur-3xl"
                style={{ background: '#1D9E75' }}
              />
              <div className="relative">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              En trois étapes simples, trouvez votre prochaine aventure et les compagnons qui vont
              avec.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepCard
              number="1"
              title="Crée ta rando"
              description="Publie ton itinéraire avec la distance, le dénivelé, la date et le niveau requis. Importe ou dessine ton tracé GPX."
              icon={<Map className="w-7 h-7 text-[#1D9E75]" />}
            />
            <StepCard
              number="2"
              title="Trouve ton groupe"
              description="L'algorithme de matching te propose des randonneurs compatibles avec ton niveau et tes disponibilités. Tu choisis."
              icon={<Users className="w-7 h-7 text-[#1D9E75]" />}
            />
            <StepCard
              number="3"
              title="Marche ensemble"
              description="Coordonnez-vous dans le chat de groupe, partagez le point de départ, et vivez une aventure inoubliable."
              icon={<Mountain className="w-7 h-7 text-[#1D9E75]" />}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#F5F0EB]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Tout ce dont tu as besoin
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Des outils pensés pour les randonneurs, par des randonneurs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Crosshair className="w-6 h-6 text-[#1D9E75]" />}
              title="Matching par niveau"
              description="Débutant, intermédiaire ou expert — tu rencontres des gens au même niveau que toi, pas plus, pas moins."
            />
            <FeatureCard
              icon={<MessageSquare className="w-6 h-6 text-[#1D9E75]" />}
              title="Chat de groupe"
              description="Un chat intégré pour chaque sortie. Organisez le covoiturage, partagez des photos, restez coordonnés."
            />
            <FeatureCard
              icon={<MapPin className="w-6 h-6 text-[#1D9E75]" />}
              title="Itinéraires GPX"
              description="Importez ou exportez vos tracés GPS. Visualisez le profil de dénivelé et l'itinéraire détaillé."
            />
            <FeatureCard
              icon={<Star className="w-6 h-6 text-[#1D9E75]" />}
              title="Évaluations post-rando"
              description="Après chaque sortie, évaluez vos compagnons. Construisez votre réputation de randonneur fiable."
            />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Prêt à randonner autrement ?
          </h2>
          <p className="text-gray-500 mb-10">
            Télécharge Lacet et rejoins une communauté de randonneurs qui partagent ta passion.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <AppStoreBadge store="apple" />
            <AppStoreBadge store="google" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
