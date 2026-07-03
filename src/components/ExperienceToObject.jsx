const STEPS = [
  { n: '01', title: 'Choose a material', desc: 'Pick the Korean craft material that draws you in.' },
  { n: '02', title: 'Make with your hands', desc: 'Craft a small object in a guided, unhurried session.' },
  { n: '03', title: 'Take home your object', desc: 'Carry your handmade piece home as a memory from Seoul.' },
  { n: '04', title: 'Discover related pieces', desc: 'Explore curated craft objects made from the same material.' },
]

function ExperienceToObject() {
  return (
    <section className="section section-blue" id="flow">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">From experience to object</span>
            <h2 className="section-title">From making to keeping</h2>
          </div>
          <p className="section-lead">
            The experience does not end at the table. Take home the object you made —
            then discover curated pieces connected to the material you worked with.
          </p>
        </div>

        <ol className="flow-track">
          {STEPS.map((s) => (
            <li key={s.n} className="flow-step">
              <span className="flow-num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ExperienceToObject
