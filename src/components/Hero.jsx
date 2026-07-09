import { useState } from 'react'
import { IMG } from '../images.js'
import { RESERVATION_OPTIONS } from '../data/programs.js'

const CHIPS = ['Hanji', 'Ceramic', 'Mother-of-Pearl', 'Knot & Textile', 'Tea', 'Scent']

// Full-bleed hero: one photograph, one line, one booking bar.
// Submitting the bar scrolls to the reservation form with the
// chosen workshop / date / guests prefilled (via a window event).
function Hero() {
  const [program, setProgram] = useState(RESERVATION_OPTIONS[0])
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(2)

  function handleSubmit(e) {
    e.preventDefault()
    window.dispatchEvent(
      new CustomEvent('scm:prefill', {
        detail: { program, preferred_date: date, party_size: guests },
      }),
    )
    document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="top">
      <img
        className="hero-backdrop"
        src={IMG.heroFull}
        alt=""
        loading="eager"
        fetchPriority="high"
      />
      <div className="hero-scrim" aria-hidden="true" />

      <div className="container hero-inner">
        <span className="hero-eyebrow">
          Book a Korean craft workshop · Seoul
        </span>
        <h1 className="hero-title">
          One evening in Seoul.
          <br />
          <em>One object made by your hands.</em>
        </h1>
        <p className="hero-sub">
          Small maker-led sessions in hanji, ceramic, mother-of-pearl and
          textile. Reserve a seat, craft an object, take it home.
        </p>

        <form className="hero-book" onSubmit={handleSubmit}>
          <label className="hero-book-field">
            <span>Workshop</span>
            <select value={program} onChange={(e) => setProgram(e.target.value)}>
              {RESERVATION_OPTIONS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </label>
          <label className="hero-book-field">
            <span>Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label className="hero-book-field hero-book-guests">
            <span>Guests</span>
            <input
              type="number"
              min="1"
              max="8"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </label>
          <button type="submit" className="btn hero-book-btn">
            Reserve a seat
          </button>
        </form>

        <div className="hero-chips">
          {CHIPS.map((c) => (
            <a key={c} className="hero-chip" href="#categories">
              {c}
            </a>
          ))}
        </div>

        <ul className="hero-trust">
          <li><strong>4.9</strong> guest rating</li>
          <li><strong>2–4</strong> people per session</li>
          <li>Free cancellation up to <strong>48h</strong></li>
          <li>English-friendly</li>
        </ul>
      </div>
    </section>
  )
}

export default Hero
