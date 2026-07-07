import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

function formatDateTime(value) {
  if (!value) return '—'
  return new Date(value).toLocaleString('ko-KR')
}

// Expanded detail panel for one reservation: view info, edit the
// booking fields, or compose a reply that opens in the mail app.
function ReservationDetail({ row, onRowChange, onStatusChange, updating }) {
  const [mode, setMode] = useState('view') // view | edit | reply
  const [form, setForm] = useState({
    program: row.program ?? '',
    party_size: row.party_size,
    preferred_date: row.preferred_date ?? '',
  })
  const [reply, setReply] = useState('')
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setErrorMsg('')
    const patch = {
      program: form.program || null,
      party_size: Number(form.party_size) || 1,
      preferred_date: form.preferred_date || null,
    }
    const { error } = await supabase
      .from('reservations')
      .update(patch)
      .eq('id', row.id)
    setSaving(false)
    if (error) {
      setErrorMsg(error.message)
      return
    }
    onRowChange({ ...row, ...patch })
    setMode('view')
  }

  // Opens the admin's own mail app with recipient / subject / body
  // prefilled, so replies come from their real mailbox.
  function replyHref() {
    const subject = `Seoul Craft Moment — 예약 안내 (${row.program ?? '문의'})`
    const body =
      `${row.name}님, 안녕하세요.\n\n` +
      `${reply}\n\n` +
      `— Seoul Craft Moment`
    return `mailto:${row.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="admin-detail" onClick={(e) => e.stopPropagation()}>
      {mode === 'edit' ? (
        <form className="admin-edit-form" onSubmit={handleSave}>
          <div className="field-row">
            <label className="field">
              <span>프로그램</span>
              <input
                type="text"
                value={form.program}
                onChange={update('program')}
                placeholder="프로그램명"
              />
            </label>
            <label className="field">
              <span>인원</span>
              <input
                type="number"
                min="1"
                max="20"
                value={form.party_size}
                onChange={update('party_size')}
              />
            </label>
            <label className="field">
              <span>희망일</span>
              <input
                type="date"
                value={form.preferred_date}
                onChange={update('preferred_date')}
              />
            </label>
          </div>
          {errorMsg && <p className="reserve-error" role="alert">{errorMsg}</p>}
          <div className="admin-detail-actions">
            <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
              {saving ? '저장 중…' : '저장'}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setMode('view')}
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <dl className="admin-detail-grid">
          <div>
            <dt>이메일</dt>
            <dd><a href={`mailto:${row.email}`}>{row.email}</a></dd>
          </div>
          <div>
            <dt>신청 시각</dt>
            <dd>{formatDateTime(row.created_at)}</dd>
          </div>
          <div className="admin-detail-message">
            <dt>메시지</dt>
            <dd>{row.message || '(없음)'}</dd>
          </div>
        </dl>
      )}

      {mode === 'reply' && (
        <div className="admin-reply">
          <label className="field">
            <span>답장 내용</span>
            <textarea
              rows="4"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="예: 7월 20일 오후 2시에 좌석을 확정해드렸습니다. 공방에서 뵙겠습니다!"
            />
          </label>
          <div className="admin-detail-actions">
            <a
              className={`btn btn-primary btn-sm${reply.trim() ? '' : ' is-disabled'}`}
              href={reply.trim() ? replyHref() : undefined}
              aria-disabled={!reply.trim()}
            >
              메일 앱에서 보내기
            </a>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setMode('view')}
            >
              닫기
            </button>
          </div>
          <p className="admin-reply-hint">
            받는사람·제목·내용이 채워진 상태로 메일 앱이 열립니다. 실제 발송은
            본인 메일 계정에서 이루어집니다.
          </p>
        </div>
      )}

      {mode === 'view' && (
        <div className="admin-detail-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setMode('reply')}
          >
            ✉ 답장 쓰기
          </button>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setMode('edit')}
          >
            ✎ 예약 수정
          </button>
          <span className="admin-actions-divider" aria-hidden="true" />
          {row.status !== 'confirmed' && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={updating}
              onClick={() => onStatusChange(row, 'confirmed')}
            >
              확정
            </button>
          )}
          {row.status !== 'cancelled' && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              disabled={updating}
              onClick={() => onStatusChange(row, 'cancelled')}
            >
              취소
            </button>
          )}
          {row.status !== 'new' && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              disabled={updating}
              onClick={() => onStatusChange(row, 'new')}
            >
              신규로 되돌리기
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ReservationDetail
