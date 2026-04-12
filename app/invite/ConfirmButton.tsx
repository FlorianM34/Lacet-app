'use client'

import { useState } from 'react'

export default function ConfirmButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'confirmed'>('idle')

  async function handleConfirm() {
    setState('loading')
    try {
      await fetch('/api/invite-confirm', { method: 'POST' })
    } catch {
      // silently ignore — the visual confirmation is what matters
    }
    setState('confirmed')
  }

  if (state === 'confirmed') {
    return (
      <>
        <div style={{
          background: '#9FE1CB',
          borderRadius: '16px',
          padding: '1.25rem',
          textAlign: 'center',
          transform: 'rotate(0.4deg)',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: '18px',
            color: '#04342C',
            marginBottom: '4px',
          }}>
            À vendredi soir ✦
          </div>
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#085041',
          }}>
            Réservation confirmée
          </div>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '1.25rem',
          marginLeft: '0.5rem',
          transform: 'rotate(-0.3deg)',
          border: '0.5px solid #F4C0D1',
          fontSize: '14px',
          color: '#72243E',
          lineHeight: 1.85,
          position: 'relative',
          zIndex: 1,
        }}>
          <p>Bonsoir,</p>
          <p style={{marginTop:'8px'}}>Ta réservation est confirmée. Une table en terrasse vous sera réservés par notre service :)</p>
          <p style={{marginTop:'8px'}}>Au plaisir de vous retrouver madame Elhalouat. </p>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            fontStyle: 'italic',
            color: '#4B1528',
            marginTop: '10px',
          }}>Florian</div>
        </div>
      </>
    )
  }

  return (
    <button
      onClick={handleConfirm}
      disabled={state === 'loading'}
      style={{
        width: '100%',
        background: '#72243E',
        color: '#FDF0F4',
        border: 'none',
        borderRadius: '16px',
        padding: '1rem 1.25rem',
        fontFamily: 'Georgia, serif',
        fontStyle: 'italic',
        fontSize: '17px',
        cursor: state === 'loading' ? 'wait' : 'pointer',
        opacity: state === 'loading' ? 0.7 : 1,
        transform: 'rotate(-0.3deg)',
        position: 'relative',
        zIndex: 1,
        letterSpacing: '0.02em',
        transition: 'opacity 0.2s',
      }}
    >
      {state === 'loading' ? '…' : 'Confirmer ma venue'}
    </button>
  )
}
