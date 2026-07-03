import { useState } from 'react'

const NAV = [
  { label: 'Experiences', href: '#programs' },
  { label: 'Browse', href: '#categories' },
  { label: 'Objects', href: '#objects' },
  { label: 'Private Sessions', href: '#private' },
  { label: 'Visit', href: '#visit' },
]

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">◇</span>
          <span className="brand-name">Seoul Craft Moment</span>
        </a>

        <nav className={`nav ${open ? 'is-open' : ''}`}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="btn btn-primary nav-cta" href="#reserve" onClick={() => setOpen(false)}>
            Reserve
          </a>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Header
