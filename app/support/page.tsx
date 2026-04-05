import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Contactez l\'équipe Lacet pour toute question ou problème.',
}

export default function SupportPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Support</h1>
          <p className="text-gray-500 mb-12">
            Une question, un problème ou une suggestion ? L&apos;équipe Lacet est là pour vous
            aider.
          </p>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Comment créer une randonnée ?',
                  a: null,
                },
                {
                  q: 'Comment fonctionne le matching ?',
                  a: null,
                },
                {
                  q: 'Comment supprimer mon compte ?',
                  a: null,
                },
                {
                  q: "Comment signaler un utilisateur ?",
                  a: null,
                },
              ].map((item, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4">
                  <p className="font-medium text-gray-900 mb-1">{item.q}</p>
                  {/* TODO: Rédiger la réponse */}
                  <p className="text-sm text-gray-400 italic">[À compléter]</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact form */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Nous contacter</h2>
            <p className="text-gray-500 text-sm mb-6">
              Vous ne trouvez pas de réponse à votre question ? Envoyez-nous un message.
            </p>

            {/* TODO: Connecter le formulaire à un backend (ex: Resend, Formspree) */}
            <form className="space-y-5" action="#" method="POST">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Décrivez votre problème ou votre question..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-colors bg-[#1D9E75] hover:bg-[#157a5a]"
              >
                Envoyer le message
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
