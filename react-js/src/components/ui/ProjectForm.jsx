/**
 * ProjectForm.jsx
 * Formulaire partagé entre AjouterProjet et EditerProjet.
 * Reçoit les valeurs initiales et un callback onSubmit.
 */

import { useState } from 'react'
import Alert from './Alert.jsx'

const EMPTY = {
    title: '', shortDescription: '', description: '',
    technologies: '', image: '', demoUrl: '', githubUrl: '',
}

export default function ProjectForm({ initial = EMPTY, onSubmit, onCancel, submitLabel = 'Enregistrer', accentColor = 'var(--blue)' }) {
    const [form, setForm]   = useState({
        ...EMPTY,
        ...initial,
        technologies: Array.isArray(initial.technologies)
            ? initial.technologies.join(', ')
            : initial.technologies || '',
    })
    const [error, setError]     = useState(null)
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)

        if (!form.title.trim() || !form.description.trim() || !form.technologies.trim()) {
            setError('Veuillez remplir tous les champs obligatoires (*).')
            return
        }

        try {
            setLoading(true)
            await onSubmit({
                ...form,
                image: form.image.trim() || `https://placehold.co/600x400/1e3a5f/white?text=${encodeURIComponent(form.title)}`,
                demoUrl:   form.demoUrl   || '#',
                githubUrl: form.githubUrl || '#',
            })
        } catch (err) {
            setError(err.message || 'Une erreur est survenue.')
        } finally {
            setLoading(false)
        }
    }

    const fields = [
        { name: 'title',            label: 'Nom du projet *',         type: 'input',    placeholder: 'Ex: Application de gestion des étudiants' },
        { name: 'shortDescription', label: 'Description courte',      type: 'input',    placeholder: 'Résumé affiché sur la carte projet' },
        { name: 'description',      label: 'Description complète *',  type: 'textarea', placeholder: 'Décrivez le projet en détail…' },
        { name: 'technologies',     label: 'Technologies *',          type: 'input',    placeholder: 'Ex: React, Node.js, AWS (séparées par virgules)' },
        { name: 'image',            label: "URL de l'image",          type: 'input',    placeholder: 'https://… (laisser vide pour image auto)' },
        { name: 'demoUrl',          label: 'Lien Demo',               type: 'input',    placeholder: 'https://monprojet.com' },
        { name: 'githubUrl',        label: 'Lien GitHub',             type: 'input',    placeholder: 'https://github.com/…' },
    ]

    return (
        <form onSubmit={handleSubmit} noValidate>
            {error && <Alert type="error">{error}</Alert>}

            {fields.map(({ name, label, type, placeholder }) => (
                <div className="form-group" key={name}>
                    <label>{label}</label>
                    {type === 'textarea' ? (
                        <textarea
                            name={name} value={form[name]} rows={4}
                            placeholder={placeholder} onChange={handleChange}
                        />
                    ) : (
                        <input
                            name={name} value={form[name]}
                            placeholder={placeholder} onChange={handleChange}
                        />
                    )}
                </div>
            ))}

            <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    <i className="fas fa-times" /> Annuler
                </button>
                <button
                    type="submit"
                    className="btn"
                    style={{ background: accentColor, color: '#fff' }}
                    disabled={loading}
                >
                    {loading
                        ? <><i className="fas fa-spinner fa-spin" /> Enregistrement…</>
                        : <><i className="fas fa-save" /> {submitLabel}</>
                    }
                </button>
            </div>
        </form>
    )
}