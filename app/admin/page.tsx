'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogoIcon } from '@/components/Logo'

type Step = 'email' | 'otp'

export default function AdminLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStep('otp')
      } else {
        console.log(res)
        setError('Une erreur est survenue')
      }
    } catch {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token: otp }),
      })

      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        const data = await res.json()
        setError(data.error ?? 'Code invalide')
      }
    } catch {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <LogoIcon size={40} />
          <h1 className="mt-3 text-xl font-bold text-gray-900">Administration</h1>
          <p className="text-sm text-gray-500 mt-1">Accès restreint</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {step === 'email' ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  autoComplete="email"
                  placeholder="admin@lacet.app"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#1D9E75' }}
              >
                {loading ? 'Envoi…' : 'Envoyer le code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  Un code à 6 chiffres a été envoyé à{' '}
                  <span className="font-medium text-gray-700">{email}</span>
                </p>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Code de vérification
                </label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6} 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  required
                  autoFocus
                  autoComplete="one-time-code"
                  placeholder="000000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#1D9E75' }}
              >
                {loading ? 'Vérification…' : 'Accéder'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('email')
                  setOtp('')
                  setError('')
                }}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Changer d&apos;adresse e-mail
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
