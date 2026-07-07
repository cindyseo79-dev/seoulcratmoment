import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import ReservationDetail from './ReservationDetail.jsx'

const STATUS_TABS = [
  { key: 'all', label: '전체' },
  { key: 'new', label: '신규' },
  { key: 'confirmed', label: '확정' },
  { key: 'cancelled', label: '취소' },
]

const STATUS_BADGE = {
  new: { label: '신규', className: 'admin-badge admin-badge-new' },
  confirmed: { label: '확정', className: 'admin-badge admin-badge-confirmed' },
  cancelled: { label: '취소', className: 'admin-badge admin-badge-cancelled' },
}

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
  })
}

// Reservations table: status tabs + text search + expandable detail
// row with reply / edit / status actions.
function ReservationList() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })
      if (cancelled) return
      if (error) {
        setErrorMsg(error.message)
      } else {
        setRows(data ?? [])
      }
      setLoading(false)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((r) => {
      if (tab !== 'all' && r.status !== tab) return false
      if (!q) return true
      return (
        r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
      )
    })
  }, [rows, tab, query])

  async function setStatus(row, status) {
    setUpdatingId(row.id)
    setErrorMsg('')
    const { error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', row.id)
    if (error) {
      setErrorMsg(error.message)
    } else {
      setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status } : r)))
    }
    setUpdatingId(null)
  }

  if (loading) {
    return <p className="admin-placeholder">예약을 불러오는 중…</p>
  }

  return (
    <div className="admin-reservations">
      <div className="admin-toolbar">
        <div className="admin-tabs" role="tablist">
          {STATUS_TABS.map((t) => {
            const count =
              t.key === 'all'
                ? rows.length
                : rows.filter((r) => r.status === t.key).length
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                className={`admin-tab${tab === t.key ? ' is-active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label} <em>{count}</em>
              </button>
            )
          })}
        </div>
        <input
          type="search"
          className="admin-search"
          placeholder="이름 / 이메일 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {errorMsg && (
        <p className="reserve-error" role="alert">{errorMsg}</p>
      )}

      {filtered.length === 0 ? (
        <p className="admin-placeholder">표시할 예약이 없습니다.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>신청일</th>
              <th>이름</th>
              <th>프로그램</th>
              <th>인원</th>
              <th>희망일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const badge = STATUS_BADGE[r.status] ?? STATUS_BADGE.new
              const isOpen = openId === r.id
              return [
                <tr
                  key={r.id}
                  className={`admin-row${isOpen ? ' is-open' : ''}`}
                  onClick={() => setOpenId(isOpen ? null : r.id)}
                >
                  <td>{formatDate(r.created_at)}</td>
                  <td>{r.name}</td>
                  <td>{r.program ?? '—'}</td>
                  <td>{r.party_size}</td>
                  <td>{formatDate(r.preferred_date)}</td>
                  <td><span className={badge.className}>{badge.label}</span></td>
                </tr>,
                isOpen && (
                  <tr key={`${r.id}-detail`} className="admin-detail-row">
                    <td colSpan={6}>
                      <ReservationDetail
                        row={r}
                        updating={updatingId === r.id}
                        onStatusChange={setStatus}
                        onRowChange={(updated) =>
                          setRows((rs) =>
                            rs.map((x) => (x.id === updated.id ? updated : x)),
                          )
                        }
                      />
                    </td>
                  </tr>
                ),
              ]
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ReservationList
