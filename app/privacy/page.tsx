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
      <main className="pt-14 md:pt-16 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Politique de confidentialité
          </h1>
          <p className="text-gray-400 text-sm mb-10 md:mb-12">Dernière mise à jour : 13 avril 2025</p>

          <div className="bg-[#E1F5EE] border-l-4 border-[#1D9E75] rounded-r-xl px-5 py-4 mb-10 md:mb-12 text-sm text-[#085041] leading-relaxed">
            Lacet est une application de mise en relation de randonneurs. Nous collectons uniquement les données nécessaires au fonctionnement du service. Nous ne vendons jamais tes données et nous n&apos;affichons pas de publicité.
          </div>

          <div className="space-y-10 md:space-y-12">

            <section>
              <h2 className="text-lg md:text-xl font-bold text-[#085041] mb-4 pb-3 border-b-2 border-[#E1F5EE]">1. Qui sommes-nous ?</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Lacet est une application mobile éditée par [Nom de l&apos;entité juridique], dont le siège social est situé à [Adresse]. Pour toute question relative à la protection de tes données, tu peux nous contacter à l&apos;adresse <a href="mailto:privacy@lacet.app" className="text-[#1D9E75] hover:underline">privacy@lacet.app</a>.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dans le cadre du Règlement Général sur la Protection des Données (RGPD), nous agissons en qualité de responsable du traitement.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-[#085041] mb-4 pb-3 border-b-2 border-[#E1F5EE]">2. Données collectées</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Nous collectons uniquement les données strictement nécessaires au fonctionnement de Lacet.
              </p>

              <h3 className="text-sm font-semibold text-gray-900 mb-3">Données fournies directement par toi</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#E1F5EE] text-[#085041]">
                      <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">Donnée</th>
                      <th className="text-left px-4 py-3 font-semibold">Obligatoire</th>
                      <th className="text-left px-4 py-3 font-semibold rounded-tr-lg">Utilisation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['Numéro de téléphone', 'Oui', 'Authentification par OTP SMS'],
                      ['Prénom et initiale du nom', 'Oui', 'Identification dans les groupes'],
                      ['Date de naissance', 'Oui', 'Calcul et affichage de l\'âge'],
                      ['Niveau d\'expérience', 'Oui', 'Filtrage et compatibilité des randonnées'],
                      ['Langues parlées', 'Oui', 'Mise en relation avec des groupes compatibles'],
                      ['Photo de profil', 'Non', 'Identification visuelle dans les groupes'],
                      ['Option voiturage', 'Oui', 'Affichage sur le profil et les annonces'],
                    ].map(([donnee, obligatoire, utilisation]) => (
                      <tr key={donnee} className="text-gray-600">
                        <td className="px-4 py-3">{donnee}</td>
                        <td className="px-4 py-3">{obligatoire}</td>
                        <td className="px-4 py-3">{utilisation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-sm font-semibold text-gray-900 mb-3">Données générées par l&apos;utilisation</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#E1F5EE] text-[#085041]">
                      <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">Donnée</th>
                      <th className="text-left px-4 py-3 font-semibold rounded-tr-lg">Utilisation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['Itinéraires créés (titre, tracé GPX, date, niveau)', 'Publication dans le feed et gestion des groupes'],
                      ['Participations aux randonnées', 'Gestion des groupes, calcul des statistiques personnelles'],
                      ['Messages de chat', 'Communication au sein des groupes'],
                      ['Notes reçues et émises', 'Calcul de la réputation, affichage sur le profil'],
                      ['Position géographique approximative', 'Affichage des randonnées à proximité (collectée à la demande, non stockée en continu)'],
                      ['Token de notification push', 'Envoi des notifications liées à l\'activité'],
                      ['Préférences de notifications et d\'affichage', 'Personnalisation de l\'expérience'],
                    ].map(([donnee, utilisation]) => (
                      <tr key={donnee} className="text-gray-600">
                        <td className="px-4 py-3">{donnee}</td>
                        <td className="px-4 py-3">{utilisation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-sm font-semibold text-gray-900 mb-2">Données collectées automatiquement</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nous collectons des données techniques minimales pour assurer le bon fonctionnement de l&apos;application : version de l&apos;application installée, identifiant de session, logs d&apos;erreurs techniques. Ces données ne permettent pas de t&apos;identifier directement et sont conservées 30 jours.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-[#085041] mb-4 pb-3 border-b-2 border-[#E1F5EE]">3. Finalités et bases légales</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#E1F5EE] text-[#085041]">
                      <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">Finalité</th>
                      <th className="text-left px-4 py-3 font-semibold rounded-tr-lg">Base légale (RGPD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['Création et gestion de ton compte', 'Exécution du contrat (art. 6.1.b)'],
                      ['Mise en relation avec d\'autres randonneurs', 'Exécution du contrat (art. 6.1.b)'],
                      ['Affichage des randonnées à proximité', 'Consentement (art. 6.1.a) — demandé à l\'utilisation'],
                      ['Envoi de notifications push', 'Consentement (art. 6.1.a) — demandé à l\'installation'],
                      ['Calcul de la réputation et des badges', 'Exécution du contrat (art. 6.1.b)'],
                      ['Modération et sécurité de la plateforme', 'Intérêt légitime (art. 6.1.f)'],
                      ['Amélioration du service via logs techniques', 'Intérêt légitime (art. 6.1.f)'],
                    ].map(([finalite, base]) => (
                      <tr key={finalite} className="text-gray-600">
                        <td className="px-4 py-3">{finalite}</td>
                        <td className="px-4 py-3">{base}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-[#085041] mb-4 pb-3 border-b-2 border-[#E1F5EE]">4. Durée de conservation</h2>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#E1F5EE] text-[#085041]">
                      <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">Donnée</th>
                      <th className="text-left px-4 py-3 font-semibold rounded-tr-lg">Durée de conservation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['Données de profil', 'Jusqu\'à la suppression du compte + 30 jours (délai de sauvegarde)'],
                      ['Messages de chat', 'Jusqu\'à la suppression du compte'],
                      ['Itinéraires créés', 'Anonymisés à la suppression du compte, conservés pour ne pas affecter les groupes existants'],
                      ['Notes et avis', 'Supprimés à la suppression du compte'],
                      ['Logs techniques', '30 jours glissants'],
                      ['Données de signalement', '1 an à compter du signalement'],
                    ].map(([donnee, duree]) => (
                      <tr key={donnee} className="text-gray-600">
                        <td className="px-4 py-3">{donnee}</td>
                        <td className="px-4 py-3">{duree}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                En cas de suppression de ton compte, l&apos;ensemble de tes données personnelles est effacé dans un délai de 30 jours, à l&apos;exception des données pour lesquelles nous avons une obligation légale de conservation.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-[#085041] mb-4 pb-3 border-b-2 border-[#E1F5EE]">5. Partage des données</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Nous ne vendons jamais tes données personnelles à des tiers.</p>

              <h3 className="text-sm font-semibold text-gray-900 mb-2">Données visibles par les autres utilisateurs</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Sur ton profil public, les autres utilisateurs peuvent voir : ton prénom, ton âge, ton niveau d&apos;expérience, tes langues, ta photo (si renseignée), ta note moyenne, le nombre de randonnées effectuées, et tes badges. Ton numéro de téléphone n&apos;est jamais visible.
              </p>

              <h3 className="text-sm font-semibold text-gray-900 mb-3">Sous-traitants techniques</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#E1F5EE] text-[#085041]">
                      <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">Sous-traitant</th>
                      <th className="text-left px-4 py-3 font-semibold">Rôle</th>
                      <th className="text-left px-4 py-3 font-semibold rounded-tr-lg">Localisation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['Supabase', 'Base de données, authentification, stockage des fichiers', 'Union européenne (AWS Frankfurt)'],
                      ['Twilio', 'Envoi des SMS OTP d\'authentification', 'États-Unis (couvert par les clauses contractuelles types)'],
                      ['Expo', 'Envoi des notifications push', 'États-Unis (couvert par les clauses contractuelles types)'],
                      ['Mapbox', 'Affichage des cartes et tracés', 'États-Unis (couvert par les clauses contractuelles types)'],
                    ].map(([nom, role, lieu]) => (
                      <tr key={nom} className="text-gray-600">
                        <td className="px-4 py-3 font-medium">{nom}</td>
                        <td className="px-4 py-3">{role}</td>
                        <td className="px-4 py-3">{lieu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-[#085041] mb-4 pb-3 border-b-2 border-[#E1F5EE]">6. Hébergement et transferts hors UE</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Les données sont principalement hébergées dans l&apos;Union européenne (Supabase sur AWS Frankfurt). Certains sous-traitants (Twilio, Expo, Mapbox) sont établis aux États-Unis. Ces transferts sont encadrés par les Clauses Contractuelles Types (CCT) de la Commission européenne, conformément à l&apos;article 46 du RGPD.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-[#085041] mb-4 pb-3 border-b-2 border-[#E1F5EE]">7. Tes droits</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Conformément au RGPD, tu disposes des droits suivants sur tes données personnelles :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {[
                  { title: 'Droit d\'accès', desc: 'Obtenir une copie de toutes les données que nous détenons sur toi.' },
                  { title: 'Droit de rectification', desc: 'Corriger toute donnée inexacte ou incomplète depuis les paramètres de l\'app.' },
                  { title: 'Droit à l\'effacement', desc: 'Supprimer ton compte et toutes tes données depuis Paramètres → "Supprimer mon compte".' },
                  { title: 'Droit à la portabilité', desc: 'Recevoir tes données dans un format structuré et lisible par machine.' },
                  { title: 'Droit d\'opposition', desc: 'T\'opposer à un traitement basé sur notre intérêt légitime.' },
                  { title: 'Droit au retrait du consentement', desc: 'Retirer à tout moment ton consentement (géolocalisation, notifications) depuis les Paramètres.' },
                ].map((right) => (
                  <div key={right.title} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{right.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{right.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pour exercer ces droits, contacte-nous à <a href="mailto:privacy@lacet.app" className="text-[#1D9E75] hover:underline">privacy@lacet.app</a>. Nous répondons dans un délai d&apos;un mois. En cas de réponse insatisfaisante, tu peux introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#1D9E75] hover:underline">CNIL</a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-[#085041] mb-4 pb-3 border-b-2 border-[#E1F5EE]">8. Mineurs</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lacet est une application destinée aux personnes âgées d&apos;au moins 16 ans. Nous ne collectons pas sciemment de données concernant des personnes de moins de 16 ans. Si tu constates qu&apos;un mineur a créé un compte, contacte-nous à <a href="mailto:privacy@lacet.app" className="text-[#1D9E75] hover:underline">privacy@lacet.app</a> pour que nous procédions à la suppression du compte dans les meilleurs délais.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-[#085041] mb-4 pb-3 border-b-2 border-[#E1F5EE]">9. Modifications de cette politique</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Nous pouvons être amenés à modifier cette politique de confidentialité pour refléter des évolutions légales ou des changements dans notre service. En cas de modification substantielle, tu seras notifié par une notification push ou un message dans l&apos;application au moins 30 jours avant l&apos;entrée en vigueur des changements.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                La version en vigueur est toujours accessible à l&apos;adresse <strong>lacet.app/privacy</strong>. La date de dernière mise à jour est indiquée en haut de cette page.
              </p>
            </section>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 text-center">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">10. Nous contacter</h2>
              <p className="text-sm text-gray-500 mb-5">Pour toute question relative à la protection de tes données personnelles :</p>
              <a
                href="mailto:privacy@lacet.app"
                className="inline-block bg-[#1D9E75] hover:bg-[#085041] text-white px-7 py-3 rounded-full text-sm font-medium transition-colors"
              >
                privacy@lacet.app
              </a>
              <p className="text-xs text-gray-400 mt-4">Ou par courrier : [Nom de l&apos;entité], [Adresse complète], France</p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
