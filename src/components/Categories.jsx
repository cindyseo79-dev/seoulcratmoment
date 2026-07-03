import { IMG } from '../images.js'

const CATEGORIES = [
  { key: 'hanji', name: 'Hanji', desc: 'Korean paper objects', img: IMG.catHanji },
  { key: 'ceramic', name: 'Ceramic', desc: 'Clay form & texture', img: IMG.catCeramic },
  { key: 'pearl', name: 'Mother-of-Pearl', desc: 'Light & fine pattern', img: IMG.catPearl },
  { key: 'knot', name: 'Knot & Textile', desc: 'Knots & soft fabric', img: IMG.catKnot },
  { key: 'tea', name: 'Tea', desc: 'Calm tasting ritual', img: IMG.catTea },
  { key: 'scent', name: 'Scent', desc: 'Korean aroma & wood', img: IMG.catScent },
]

function Categories() {
  return (
    <section className="section" id="categories">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Browse by material</span>
            <h2 className="section-title">What would you like to make?</h2>
          </div>
          <p className="section-lead">
            Every workshop starts with a Korean material. Pick one to see its
            sessions and the handmade objects behind it.
          </p>
        </div>

        <div className="cat-grid">
          {CATEGORIES.map((c) => (
            <a key={c.key} className="cat-card" href="#programs">
              <span className="cat-thumb">
                <img src={c.img} alt={c.name} loading="lazy" />
              </span>
              <span className="cat-text">
                <span className="cat-name">{c.name}</span>
                <span className="cat-desc">{c.desc}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
