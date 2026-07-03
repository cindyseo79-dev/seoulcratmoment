const VALUES = [
  {
    icon: '❋',
    title: 'Local materials',
    desc: 'Hanji, clay, mother-of-pearl, knots, textiles, tea, and scent — real Korean craft materials, guided by makers.',
  },
  {
    icon: '❍',
    title: 'Small group',
    desc: 'Quiet sessions of two to four guests, designed for individuals, couples, and small groups.',
  },
  {
    icon: '❖',
    title: 'Take-home object',
    desc: 'You leave with a small handmade object — a real memory from Seoul shaped by your own hands.',
  },
]

function Concept() {
  return (
    <section className="section section-soft" id="concept">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Why Seoul Craft Moment</span>
            <h2 className="section-title">Not just a class. A moment with Korean materials.</h2>
          </div>
          <p className="section-lead">
            Each session is a quiet encounter with Korean craft — touch the material,
            learn its story, make with your hands, and take home a piece of Seoul.
          </p>
        </div>

        <div className="value-grid">
          {VALUES.map((v) => (
            <article key={v.title} className="value-card">
              <span className="value-icon" aria-hidden="true">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Concept
