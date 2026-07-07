import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import AdminLogin from './AdminLogin.jsx'
import ReservationList from './ReservationList.jsx'

// Entry point for the #admin hash route. Tracks the Supabase auth
// session and shows either the login form or the reservations view.
function AdminPage() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setChecking(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => setSession(newSession),
    )
    return () => listener.subscription.unsubscribe()
  }, [])

  if (checking) {
    return <div className="admin-shell admin-checking">Checking session…</div>
  }

  if (!session) {
    return <AdminLogin />
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <span className="admin-topbar-brand">
          Seoul Craft Moment · <strong>예약 관리</strong>
        </span>
        <div className="admin-topbar-actions">
          <span className="admin-topbar-user">{session.user.email}</span>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => supabase.auth.signOut()}
          >
            로그아웃
          </button>
        </div>
      </header>

      <main className="admin-main">
        <ReservationList />
      </main>
    </div>
  )
}

export default AdminPage
