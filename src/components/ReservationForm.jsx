import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

const MATERIALS = [
  'Hanji Object Making',
  'Ceramic Texture Session',
  'Mother-of-Pearl Detail',
  'Knot & Textile Moment',
  'Private group session',
]

const EMPTY = {
  name: '',
  email: '',
  program: MATERIALS[0],
  party_size: 2,
  preferred_date: '',
  message: '',
}

function ReservationForm() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isSupabaseConfigured) {
      setStatus('error')
      setErrorMsg('The database is not connected yet. Add your Supabase keys to .env.local.')
      return
    }
    setStatus('submitting')
    setErrorMsg('')
    const { error } = await supabase.from('reservations').insert({
      name: form.name,
      email: form.email,
      program: form.program,
      party_size: Number(form.party_size) || 1,
      preferred_date: form.preferred_date || null,
      message: form.message || null,
    })
    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
      return
    }
    setStatus('success')
    setForm(EMPTY)
  }

  return (
    <section className="section section-soft" id="reserve">
      <div className="container reserve-grid">
        <div className="reserve-intro">
          <span className="eyebrow">Reserve your moment</span>
          <h2 className="section-title">Request a craft session</h2>
          <p className="section-lead">
            Send a reservation request and we'll confirm your seat by email. Small
            groups, English-friendly, free cancellation up to 48 hours before.
          </p>
          <ul className="reserve-points">
            <li><span aria-hidden="true">✓</span> A maker replies personally</li>
            <li><span aria-hidden="true">✓</span> Take-home object included</li>
            <li><span aria-hidden="true">✓</span> No account required</li>
          </ul>
        </div>

        <form className="reserve-card" onSubmit={handleSubmit}>
          {status === 'success' ? (
            <div className="reserve-success" role="status">
              <span className="reserve-success-mark" aria-hidden="true">✓</span>
              <h3>Reservation request sent</h3>
              <p>Thank you — we saved your request and will reply by email soon.</p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setStatus('idle')}
              >
                Send another request
              </button>
            </div>
          ) : (
            <>
              <div className="field-row">
                <label className="field">
                  <span>Name</span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Your name"
                  />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="field">
                <span>Workshop</span>
                <select value={form.program} onChange={update('program')}>
                  {MATERIALS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </label>

              <div className="field-row">
                <label className="field">
                  <span>Guests</span>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={form.party_size}
                    onChange={update('party_size')}
                  />
                </label>
                <label className="field">
                  <span>Preferred date</span>
                  <input
                    type="date"
                    value={form.preferred_date}
                    onChange={update('preferred_date')}
                  />
                </label>
              </div>

              <label className="field">
                <span>Message <em>(optional)</em></span>
                <textarea
                  rows="3"
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Anything we should know?"
                />
              </label>

              {status === 'error' && (
                <p className="reserve-error" role="alert">{errorMsg}</p>
              )}
              {!isSupabaseConfigured && (
                <p className="reserve-hint">
                  Demo mode — connect Supabase to store real reservations.
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-lg reserve-submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Send reservation request'}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

export default ReservationForm
