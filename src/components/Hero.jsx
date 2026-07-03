import { IMG } from '../images.js'

const CHIPS = ['Hanji', 'Ceramic', 'Mother-of-Pearl', 'Knot & Textile', 'Tea', 'Scent']

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Book a Korean craft workshop · Seoul</span>
          <h1 className="hero-title">
            Find and reserve a<br />
            <span className="hl">Korean craft workshop</span><br />
            in Seoul.
          </h1>
          <p className="hero-sub">
            A booking service for small, maker-led sessions. Search a material,
            reserve your seat, make an object by hand — and take it home.
          </p>

          <form className="hero-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <div className="hero-search-field">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                type="text"
                aria-label="Search craft experiences"
                placeholder="Search a material — hanji, ceramic, tea…"
              />
            </div>
            <button type="submit" className="btn btn-primary hero-search-btn">
              Search workshops
            </button>
          </form>

          <div className="hero-chips">
            <span className="hero-chips-label">Popular</span>
            {CHIPS.map((c) => (
              <a key={c} className="chip" href="#categories">
                {c}
              </a>
            ))}
          </div>

          <ul className="hero-trust">
            <li><strong>4.9</strong> guest rating</li>
            <li><strong>2–4</strong> people per session</li>
            <li>Free cancellation up to <strong>48h</strong></li>
          </ul>
        </div>

        <div className="hero-media">
          <figure className="hero-photo hero-photo-main">
            <img src={IMG.heroMain} alt="Hands shaping clay in a Korean pottery workshop" loading="eager" />
          </figure>
          <figure className="hero-photo hero-photo-side">
            <img src={IMG.heroSide} alt="A quiet craft workshop table in Seoul" loading="lazy" />
          </figure>
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Instant reservation
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
