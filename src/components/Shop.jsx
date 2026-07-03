import { IMG } from '../images.js'

const OBJECTS = [
  { name: 'Hanji Objects', img: IMG.objHanji, tag: 'Paper', note: 'Small vessels & light shades' },
  { name: 'Ceramic Pieces', img: IMG.objCeramic, tag: 'Clay', note: 'Cups, dishes & minimal forms' },
  { name: 'Mother-of-Pearl Details', img: IMG.objPearl, tag: 'Najeon', note: 'Trays & fine inlay pieces' },
  { name: 'Textile & Knot Gifts', img: IMG.objTextile, tag: 'Fabric', note: 'Ornaments & wrapped gifts' },
]

function Shop() {
  return (
    <section className="section" id="objects">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Curated handmade objects</span>
            <h2 className="section-title">Objects by Korean makers</h2>
          </div>
          <p className="section-lead">
            After a session, explore a small selection of handmade objects that carry the
            same materials, textures, and quiet beauty from the workshop.
          </p>
        </div>

        <div className="object-grid">
          {OBJECTS.map((o) => (
            <article key={o.name} className="object-card">
              <div className="object-media">
                <img src={o.img} alt={o.name} loading="lazy" />
                <span className="object-badge">{o.tag}</span>
              </div>
              <div className="object-body">
                <h3>{o.name}</h3>
                <p>{o.note}</p>
                <span className="object-link">View collection →</span>
              </div>
            </article>
          ))}
        </div>

        <div className="object-cta">
          <p className="object-note">
            <span aria-hidden="true">✦</span> A preview of an upcoming curated shop — browsing only for now.
          </p>
          <a className="btn btn-outline" href="#reserve">View Curated Objects</a>
        </div>
      </div>
    </section>
  )
}

export default Shop
