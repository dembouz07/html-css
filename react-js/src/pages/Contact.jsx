import { useState } from 'react'

const inputStyle = (hasError) => ({
    width: '100%', padding: '.75rem 1rem',
    border: `2px solid ${hasError ? '#ef4444' : '#e2e8f0'}`,
    borderRadius: 10, fontSize: '.95rem', fontFamily: 'inherit',
    color: '#1e293b', outline: 'none', transition: 'border-color .2s',
    boxSizing: 'border-box',
})

function Field({ label, name, type = 'text', value, onChange, error, rows }) {
    const isTextarea = !!rows
    return (
        <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', fontSize: '.88rem', fontWeight: 600, color: '#475569', marginBottom: '.4rem' }}>
                {label}
            </label>
            {isTextarea ? (
                <textarea
                    name={name} value={value} onChange={onChange} rows={rows}
                    style={{ ...inputStyle(!!error), resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = error ? '#ef4444' : '#e2e8f0'}
                />
            ) : (
                <input
                    type={type} name={name} value={value} onChange={onChange}
                    style={inputStyle(!!error)}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = error ? '#ef4444' : '#e2e8f0'}
                />
            )}
            {error && <p style={{ color: '#ef4444', fontSize: '.82rem', marginTop: '.3rem' }}>{error}</p>}
        </div>
    )
}

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [errors, setErrors] = useState({})
    const [sent, setSent]     = useState(false)
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
    }

    function validate() {
        const e = {}
        if (!form.name.trim() || form.name.trim().length < 2)
            e.name = 'Le nom doit contenir au moins 2 caractères.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            e.email = 'Adresse email invalide.'
        if (!form.subject.trim())
            e.subject = 'Le sujet est requis.'
        if (!form.message.trim() || form.message.trim().length < 10)
            e.message = 'Le message doit contenir au moins 10 caractères.'
        return e
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) { setErrors(errs); return }
        setLoading(true)
        await new Promise(r => setTimeout(r, 900))
        setLoading(false)
        setSent(true)
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSent(false), 5000)
    }

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)', background: '#f8fafc', padding: '3rem 0' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>

                {/* Titre */}
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', color: '#0f1b2d', marginBottom: '.5rem' }}>
                    Me Contacter
                </h1>
                <div style={{ width: 48, height: 4, background: '#2563eb', borderRadius: 4, marginBottom: '3rem' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

                    {/* ── Infos ───────────────────────────────────────── */}
                    <div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', color: '#0f1b2d', marginBottom: '1rem' }}>
                            Restons en contact
                        </h3>
                        <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '2rem' }}>
                            Disponible pour projets freelance, collaborations ou opportunités
                            en développement web, cloud et DevOps.
                        </p>

                        {/* Coordonnées */}
                        {[
                            { icon: 'fa-location-dot', text: 'Dakar, Sénégal' },
                            { icon: 'fa-envelope',     text: 'fayeouz84@gmail.com' },
                            { icon: 'fa-phone',        text: '+221 77 400 62 35' },
                        ].map(({ icon, text }) => (
                            <div key={text} style={{
                                display: 'flex', alignItems: 'center', gap: '1rem',
                                marginBottom: '1rem', color: '#334155',
                            }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 10,
                                    background: '#eff6ff', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', flexShrink: 0,
                                }}>
                                    <i className={`fas ${icon}`} style={{ color: '#2563eb' }} />
                                </div>
                                <span>{text}</span>
                            </div>
                        ))}

                        {/* Réseaux */}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', fontSize: '1.5rem' }}>
                            {[
                                { icon: 'fa-github',   fab: true },
                                { icon: 'fa-linkedin', fab: true },
                                { icon: 'fa-aws',      fab: true },
                            ].map(({ icon }) => (
                                <a key={icon} href="#" style={{
                                    width: 44, height: 44, borderRadius: 10, background: '#1e293b',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'rgba(255,255,255,.6)', fontSize: '1.1rem', transition: 'all .2s',
                                    textDecoration: 'none',
                                }}
                                   onMouseOver={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = '#fff' }}
                                   onMouseOut={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = 'rgba(255,255,255,.6)' }}
                                >
                                    <i className={`fab ${icon}`} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Formulaire ──────────────────────────────────── */}
                    <div style={{
                        background: '#fff', borderRadius: 16, padding: '2.5rem',
                        boxShadow: '0 4px 24px rgba(0,0,0,.08)',
                    }}>
                        {sent && (
                            <div style={{
                                background: '#d1fae5', color: '#065f46', padding: '.9rem 1.2rem',
                                borderRadius: 10, marginBottom: '1.5rem', display: 'flex',
                                alignItems: 'center', gap: '.6rem', fontWeight: 500,
                            }}>
                                <i className="fas fa-check-circle" />
                                Message envoyé avec succès ! Je vous répondrai rapidement.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate>
                            <Field label="Nom complet *" name="name"    value={form.name}    onChange={handleChange} error={errors.name} />
                            <Field label="Email *"       name="email"   type="email" value={form.email}   onChange={handleChange} error={errors.email} />
                            <Field label="Sujet *"       name="subject" value={form.subject} onChange={handleChange} error={errors.subject} />
                            <Field label="Message *"     name="message" value={form.message} onChange={handleChange} error={errors.message} rows={5} />

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%', padding: '.85rem', background: '#2563eb',
                                    color: '#fff', border: 'none', borderRadius: 10,
                                    fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    gap: '.5rem', opacity: loading ? .8 : 1, fontFamily: 'inherit',
                                    transition: 'all .2s',
                                }}
                                onMouseOver={e => { if (!loading) e.currentTarget.style.background = '#1d4ed8' }}
                                onMouseOut={e => { e.currentTarget.style.background = '#2563eb' }}
                            >
                                {loading
                                    ? <><i className="fas fa-spinner fa-spin" /> Envoi en cours…</>
                                    : <><i className="fas fa-paper-plane" /> Envoyer le message</>
                                }
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}