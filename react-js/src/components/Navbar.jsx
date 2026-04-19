import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: '#0f1b2d', borderBottom: '1px solid rgba(255,255,255,.08)',
            height: '64px', display: 'flex', alignItems: 'center',
        }}>
            <div style={{
                maxWidth: 1200, margin: '0 auto', padding: '0 2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            }}>
                {/* Logo */}
                <NavLink to="/" style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.3rem',
                    color: '#fff', textDecoration: 'none',
                }}>
                    OF
                </NavLink>

                {/* Liens */}
                <ul style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
                    {[
                        { to: '/',        label: 'Accueil', icon: 'fa-house',    end: true },
                        { to: '/projets', label: 'Projets', icon: 'fa-briefcase' },
                        { to: '/contact', label: 'Contact', icon: 'fa-envelope'  },
                    ].map(({ to, label, icon, end }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={end}
                                style={({ isActive }) => ({
                                    color: isActive ? '#fff' : 'rgba(255,255,255,.65)',
                                    background: isActive ? 'rgba(255,255,255,.12)' : 'transparent',
                                    textDecoration: 'none', fontWeight: 500, fontSize: '.95rem',
                                    padding: '.4rem .9rem', borderRadius: 8,
                                    display: 'flex', alignItems: 'center', gap: '.4rem',
                                    transition: 'all .2s',
                                })}
                            >
                                <i className={`fas ${icon}`} /> {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}