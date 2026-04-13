import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Contactez l\'équipe Lacet pour toute question ou problème.',
}

const FAQ_SECTIONS = [
  {
    title: 'Démarrer avec Lacet',
    items: [
      {
        q: 'Comment créer un compte ?',
        a: 'Lacet utilise uniquement ton numéro de téléphone pour créer un compte. Télécharge l\'app, saisis ton numéro, reçois un code SMS à 6 chiffres, valide — c\'est tout. Aucun mot de passe, aucun email requis.',
      },
      {
        q: 'Comment fonctionne le feed de randonnées ?',
        a: 'Le feed affiche les randonnées proposées par d\'autres utilisateurs dans un rayon autour de toi. Swipe à droite pour rejoindre, à gauche pour passer. Tu peux filtrer par distance, date et niveau depuis le bouton "Filtres" en haut de l\'écran.',
      },
      {
        q: 'Comment proposer ma propre randonnée ?',
        a: 'Appuie sur l\'onglet "+" en bas de l\'écran. Tu peux importer un fichier GPX depuis Komoot, AllTrails ou Wikiloc, ou dessiner ton itinéraire directement sur la carte. Remplis ensuite les informations (date, niveau, nombre de places) et publie.',
      },
      {
        q: 'Qu\'est-ce qu\'un fichier GPX ?',
        a: 'Un fichier GPX contient les coordonnées GPS de ton itinéraire. Tu peux en exporter depuis Komoot (ouvre ta rando → "Exporter" → "GPX"), AllTrails (ouvre la randonnée → icône de partage → "Exporter GPX") ou Wikiloc (ouvre le parcours → "Télécharger le tracé"). Si tu n\'as pas de fichier GPX, l\'option "Dessiner sur la carte" est disponible.',
      },
    ],
  },
  {
    title: 'Groupes et chat',
    items: [
      {
        q: 'Comment rejoindre une randonnée ?',
        a: 'Swipe à droite sur une carte dans le feed, ou appuie sur le bouton vert. Si l\'organisateur a activé la validation manuelle, ta demande lui sera envoyée et tu seras notifié de sa décision. Si l\'acceptation est automatique, tu rejoins le groupe immédiatement.',
      },
      {
        q: 'Puis-je quitter un groupe après avoir rejoint ?',
        a: 'Oui. Depuis la fiche de la randonnée, appuie sur "Quitter le groupe". Les autres membres pourront éventuellement te laisser une note suite à ton départ. Une place se libère automatiquement dans le feed.',
      },
      {
        q: 'Combien de randonnées puis-je rejoindre simultanément ?',
        a: 'Tu peux participer à 3 randonnées à venir en même temps, demandes en attente incluses. Cette limite permet de garder une vraie disponibilité pour chaque groupe.',
      },
      {
        q: 'Les messages du chat sont-ils permanents ?',
        a: 'Le chat reste accessible après la randonnée. Le groupe peut continuer à échanger et organiser de nouvelles sorties ensemble. Les messages ne sont pas supprimés automatiquement.',
      },
    ],
  },
  {
    title: 'Profil et notation',
    items: [
      {
        q: 'Comment fonctionne le système de notation ?',
        a: '24 heures après le début d\'une randonnée, un message apparaît dans le chat pour inviter chaque participant à noter les autres (1 à 5 étoiles). Les notes sont anonymes jusqu\'à leur révélation simultanée — elles sont dévoilées quand tout le groupe a répondu, ou automatiquement après 48 heures.',
      },
      {
        q: 'Puis-je modifier mon profil ?',
        a: 'Oui, depuis l\'onglet Profil → "Modifier mon profil". Tu peux changer ton prénom, ton niveau d\'expérience, tes langues parlées, ton option de voiturage, et ta photo (optionnelle).',
      },
      {
        q: 'Comment sont attribués les badges ?',
        a: 'Les badges sont attribués automatiquement selon ton activité : Distance (Randonneur 50 km, Explorateur 200 km, Baroudeur 500 km), Randonnées (Première sortie, Habitué 10, Vétéran 30), Organisateur (Initiateur 1, Guide 5, Chef de cordée 15). Tu reçois une notification dès qu\'un nouveau badge est débloqué.',
      },
    ],
  },
  {
    title: 'Sécurité et modération',
    items: [
      {
        q: 'Comment signaler un utilisateur ?',
        a: 'Depuis le profil d\'un utilisateur ou depuis le chat, appuie sur les trois points "···" puis "Signaler". Choisis le motif (comportement inapproprié, fausse identité, spam, autre) et confirme. Chaque signalement est examiné par notre équipe.',
      },
      {
        q: 'Mon numéro de téléphone est-il visible par les autres ?',
        a: 'Non. Ton numéro de téléphone est uniquement utilisé pour l\'authentification. Il n\'est jamais affiché sur ton profil public ni partagé avec d\'autres utilisateurs.',
      },
      {
        q: 'Comment supprimer mon compte ?',
        a: 'Va dans Profil → Paramètres → "Supprimer mon compte". Tape "SUPPRIMER" pour confirmer. Toutes tes données personnelles sont définitivement effacées. Cette action est irréversible.',
      },
    ],
  },
]

export default function SupportPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Centre d&apos;aide</h1>
          <p className="text-gray-500 mb-12">
            Retrouve les réponses aux questions les plus fréquentes sur Lacet.
          </p>

          <div className="space-y-12 mb-16">
            {FAQ_SECTIONS.map((section) => (
              <section key={section.title}>
                <h2 className="text-xs font-semibold tracking-widest uppercase text-[#1D9E75] mb-5 pb-2 border-b-2 border-[#E1F5EE]">
                  {section.title}
                </h2>
                <div className="divide-y divide-gray-100">
                  {section.items.map((item) => (
                    <div key={item.q} className="py-5">
                      <p className="font-medium text-gray-900 mb-2">{item.q}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Tu n&apos;as pas trouvé ta réponse ?</h2>
            <p className="text-sm text-gray-500 mb-6">Notre équipe répond généralement sous 24 à 48 heures.</p>
            <a
              href="mailto:support@lacet.app"
              className="inline-block bg-[#1D9E75] hover:bg-[#085041] text-white px-7 py-3 rounded-full text-sm font-medium transition-colors"
            >
              Contacter le support
            </a>
            <p className="text-xs text-gray-400 mt-3">support@lacet.app</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
