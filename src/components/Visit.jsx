// Visit / find-us section.
// Directions use plain map-search links (Naver, Kakao, Google) — free, no
// API key, no request cost. Edit VENUE below to your real address.
const VENUE = {
  name: 'Seoul Craft Moment',
  // Shown to visitors. Replace with your real studio address.
  addressLine: '12, Insadong-gil, Jongno-gu, Seoul',
  addressKo: '서울 종로구 인사동길 12',
  nearest: 'Anguk Station (Line 3), Exit 6 · 4 min walk',
  hours: [
    { days: 'Tue – Sun', time: '10:00 – 19:00' },
    { days: 'Monday', time: 'Closed' },
  ],
}

// A map search opens to the venue by name + address (works without coordinates).
const query = encodeURIComponent(`${VENUE.name} ${VENUE.addressKo}`)
const MAPS = [
  { label: 'Naver Map', href: `https://map.naver.com/p/search/${query}`, primary: true },
  { label: 'Kakao Map', href: `https://map.kakao.com/?q=${query}` },
  { label: 'Google Maps', href: `https://www.google.com/maps/search/?api=1&query=${query}` },
]

function Visit() {
  return (
    <section className="section section-blue" id="visit">
      <div className="container visit-grid">
        <div className="visit-intro">
          <span className="eyebrow">Visit the studio</span>
          <h2 className="section-title">Come make it in person</h2>
          <p className="section-lead">
            Reserve online, then join us in Seoul's craft quarter. Pick your
            map below for turn-by-turn directions.
          </p>

          <div className="visit-actions">
            {MAPS.map((m) => (
              <a
                key={m.label}
                className={`btn ${m.primary ? 'btn-primary' : 'btn-ghost'}`}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span aria-hidden="true">↗</span> {m.label}
              </a>
            ))}
          </div>
        </div>

        <div className="visit-card">
          <dl className="visit-info">
            <div className="visit-row">
              <dt><span aria-hidden="true">◇</span> Address</dt>
              <dd>
                {VENUE.addressLine}
                <span className="visit-sub">{VENUE.addressKo}</span>
              </dd>
            </div>
            <div className="visit-row">
              <dt><span aria-hidden="true">◷</span> Getting here</dt>
              <dd>{VENUE.nearest}</dd>
            </div>
            <div className="visit-row">
              <dt><span aria-hidden="true">☰</span> Hours</dt>
              <dd>
                {VENUE.hours.map((h) => (
                  <span key={h.days} className="visit-hours">
                    <em>{h.days}</em> {h.time}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <a className="btn btn-outline btn-lg visit-cta" href="#reserve">
            Reserve a seat first
          </a>
        </div>
      </div>
    </section>
  )
}

export default Visit
