import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité de l\'application Lacet.',
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Politique de confidentialité
          </h1>
          <p className="text-gray-400 text-sm mb-12">Dernière mise à jour : janvier 2026</p>

          <div className="prose prose-gray max-w-none space-y-10">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
              {/* TODO: Rédiger l'introduction */}
              <p className="text-gray-500 italic">
                [À compléter — présentation de Lacet et engagement envers la protection des données
                personnelles]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                2. Données collectées
              </h2>
              {/* TODO: Lister les données collectées (profil, localisation, activité) */}
              <p className="text-gray-500 italic">
                [À compléter — liste des données collectées lors de l'inscription et de
                l'utilisation de l'application]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                3. Finalités du traitement
              </h2>
              {/* TODO: Expliquer pourquoi ces données sont collectées */}
              <p className="text-gray-500 italic">
                [À compléter — matching, amélioration du service, communications]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                4. Partage des données
              </h2>
              {/* TODO: Préciser avec qui les données sont partagées */}
              <p className="text-gray-500 italic">
                [À compléter — partenaires techniques, absence de vente des données]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                5. Durée de conservation
              </h2>
              {/* TODO: Indiquer les durées de conservation */}
              <p className="text-gray-500 italic">
                [À compléter — durée de conservation des données selon leur nature]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Vos droits</h2>
              {/* TODO: Détailler les droits RGPD */}
              <p className="text-gray-500 italic">
                [À compléter — droit d'accès, de rectification, d'effacement, de portabilité et
                d'opposition conformément au RGPD]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">7. Cookies</h2>
              {/* TODO: Politique cookies */}
              <p className="text-gray-500 italic">
                [À compléter — utilisation des cookies sur le site lacet.app]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">8. Contact</h2>
              {/* TODO: Coordonnées DPO ou responsable du traitement */}
              <p className="text-gray-500 italic">
                [À compléter — adresse email de contact pour les questions relatives à la
                confidentialité]
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
