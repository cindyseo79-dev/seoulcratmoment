import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

// Admin sign-in form. There is no sign-up UI on purpose — the admin
// account is created manually in Supabase → Authentication → Users.
function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isSupabaseConfigured) {
      setStatus('error')
      setErrorMsg('The database is not connected yet. Add your Supabase keys to .env.local.')
      return
    }
    setStatus('submitting')
    setErrorMsg('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
      return
    }
    // Success: AdminPage's onAuthStateChange listener swaps in the
    // reservations view, so nothing else to do here.
    setStatus('idle')
  }

  return (
    <div className="admin-login">
      <form className="reserve-card admin-login-card" onSubmit={handleSubmit}>
        <h1 className="admin-login-title">Admin sign in</h1>
        <p className="admin-login-lead">Seoul Craft Moment — reservations</p>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>

        {status === 'error' && (
          <p className="reserve-error" role="alert">{errorMsg}</p>
        )}
        {!isSupabaseConfigured && (
          <p className="reserve-hint">
            Demo mode — connect Supabase to enable the admin page.
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Signing in…' : 'Sign in'}
        </button>

        <a className="admin-back-link" href="#">← Back to the site</a>
      </form>
    </div>
  )
}

export default AdminLogin
