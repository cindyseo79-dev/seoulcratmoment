const OPTIONS = [
  { title: 'Private traveler group', desc: 'A dedicated session for you and your travel companions.' },
  { title: 'Family session', desc: 'A calm, hands-on craft moment for all ages.' },
  { title: 'Corporate cultural program', desc: 'A meaningful Korean craft experience for teams.' },
  { title: 'Gift-focused workshop', desc: 'Make handmade gifts to give or take home.' },
]

function PrivateSessions() {
  return (
    <section className="section section-soft" id="private">
      <div className="container private-grid">
        <div className="private-intro">
          <span className="eyebrow">Private group sessions</span>
          <h2 className="section-title">Private sessions for meaningful gatherings</h2>
          <p className="section-lead">
            We design private craft moments for families, friends, small teams, and
            cultural groups looking for a slower, more personal Korean experience.
          </p>
          <a className="btn btn-primary" href="#reserve">Ask About a Private Session</a>
        </div>

        <ul className="private-options">
          {OPTIONS.map((o) => (
            <li key={o.title} className="private-option">
              <span className="private-check" aria-hidden="true">✓</span>
              <div>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default PrivateSessions
