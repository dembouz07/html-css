export default function Footer() {
    return (
        <footer style={{
            background: '#0f1b2d', color: 'rgba(255,255,255,.6)',
            textAlign: 'center', padding: '2.5rem 1rem', marginTop: '4rem',
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <h3 style={{
                    fontFamily: "'Syne', sans-serif", color: '#fff',
                    marginBottom: '.5rem', fontSize: '1.4rem',
                }}>
                    Ousseynou Faye
                </h3>
                <p style={{ marginBottom: '1rem' }}>
                    © Développeur Full Stack • Cloud & DevOps Learner (AWS re/Start)
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', fontSize: '1.4rem' }}>
                    {[
                        { icon: 'fa-github',   href: '#' },
                        { icon: 'fa-linkedin', href: '#' },
                        { icon: 'fa-aws',      href: '#', brand: true },
                    ].map(({ icon, href, brand }) => (
                        <a key={icon} href={href} style={{ color: 'rgba(255,255,255,.45)', transition: 'color .2s' }}
                           onMouseOver={e => e.target.style.color = '#fff'}
                           onMouseOut={e => e.target.style.color = 'rgba(255,255,255,.45)'}
                        >
                            <i className={`${brand ? 'fab' : 'fab'} fa-${icon}`} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}