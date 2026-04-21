import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation de l'application Lacet.",
}

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-14 md:pt-16 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Conditions générales d&apos;utilisation
          </h1>
          <p className="text-gray-400 text-sm mb-10 md:mb-12">Dernière mise à jour : janvier 2026</p>

          <div className="space-y-8 md:space-y-10">
            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">1. Objet</h2>
              {/* TODO: Définir l'objet des CGU */}
              <p className="text-gray-500 italic">
                [À compléter — description du service Lacet et de l'objet des présentes conditions]
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">2. Acceptation des CGU</h2>
              {/* TODO: Modalités d'acceptation */}
              <p className="text-gray-500 italic">
                [À compléter — condition d'accès au service et acceptation des CGU]
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">3. Création de compte</h2>
              {/* TODO: Conditions de création de compte */}
              <p className="text-gray-500 italic">
                [À compléter — âge minimum, informations requises, responsabilité du compte]
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">4. Utilisation du service</h2>
              {/* TODO: Règles d'utilisation et comportements interdits */}
              <p className="text-gray-500 italic">
                [À compléter — comportements attendus, contenus prohibés, règles communautaires]
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                5. Responsabilité et sécurité
              </h2>
              {/* TODO: Clause de limitation de responsabilité */}
              <p className="text-gray-500 italic">
                [À compléter — limite de responsabilité de Lacet concernant les sorties en montagne
                et les interactions entre utilisateurs]
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">6. Propriété intellectuelle</h2>
              {/* TODO: Droits sur les contenus */}
              <p className="text-gray-500 italic">
                [À compléter — propriété des contenus publiés, licence accordée à Lacet]
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">7. Suspension et résiliation</h2>
              {/* TODO: Conditions de suspension */}
              <p className="text-gray-500 italic">
                [À compléter — motifs de suspension de compte, procédure de résiliation]
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">8. Droit applicable</h2>
              {/* TODO: Juridiction et loi applicable */}
              <p className="text-gray-500 italic">
                [À compléter — droit français applicable, juridiction compétente]
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">9. Contact</h2>
              {/* TODO: Coordonnées pour les litiges */}
              <p className="text-gray-500 italic">
                [À compléter — coordonnées pour toute question relative aux CGU]
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
