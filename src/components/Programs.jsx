import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { DEFAULT_PROGRAMS, mapProgramRow } from '../data/programs.js'

function Programs() {
  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS)
  const [source, setSource] = useState(isSupabaseConfigured ? 'loading' : 'fallback')

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let active = true
    ;(async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('sort_order', { ascending: true })
      if (!active) return
      if (error || !data || data.length === 0) {
        setSource('fallback')
        return
      }
      setPrograms(data.map(mapProgramRow))
      setSource('db')
    })()
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="section" id="programs">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Craft workshops</span>
            <h2 className="section-title">Book a hands-on session</h2>
          </div>
          <p className="section-lead">
            Small, maker-led workshops in Seoul. Reserve a seat or ask a question
            first — every session includes a take-home object.
            {source === 'db' && <span className="live-badge">● Live from database</span>}
          </p>
        </div>

        <div className="program-grid">
          {programs.map((p) => (
            <article key={p.title} className="program-card">
              <div className="program-media">
                <img src={p.img} alt={p.title} loading="lazy" />
                <span className="program-mat">{p.material}</span>
                {p.featured && <span className="program-flag">Most booked</span>}
              </div>
              <div className="program-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <ul className="program-meta">
                  <li><span aria-hidden="true">◷</span> {p.duration}</li>
                  <li><span aria-hidden="true">☰</span> {p.level}</li>
                </ul>
                <div className="program-foot">
                  <span className="program-price">
                    {p.price} <em>/ person</em>
                  </span>
                  <div className="program-actions">
                    <a className="btn btn-ghost btn-sm" href="#reserve">Ask</a>
                    <a className="btn btn-primary btn-sm" href="#reserve">Reserve</a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs
