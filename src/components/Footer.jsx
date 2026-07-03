const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Experiences', href: '#programs' },
      { label: 'Browse materials', href: '#categories' },
      { label: 'Curated objects', href: '#objects' },
      { label: 'Private sessions', href: '#private' },
    ],
  },
  {
    title: 'Service',
    links: [
      { label: 'Reserve', href: '#reserve' },
      { label: 'Visit the studio', href: '#visit' },
      { label: 'Programs', href: '#programs' },
      { label: 'Gift workshops', href: '#private' },
    ],
  },
]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand">
            <span className="brand-mark" aria-hidden="true">◇</span>
            <span className="brand-name">Seoul Craft Moment</span>
          </span>
          <p>Korean craft experiences in Seoul — discover, make, and take home.</p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} className="footer-col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container footer-bar">
        <span>© 2026 Seoul Craft Moment</span>
        <span>Seoul, Korea · English-friendly craft sessions</span>
      </div>
    </footer>
  )
}

export default Footer
