import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { updateProject } from '../services/projectService.js'
import { useProject } from '../hooks/useProject.js'

export default function EditerProjet() {
    const { id }   = useParams()
    const navigate = useNavigate()
    const { project, loading, error } = useProject(id)
    const [form, setForm]       = useState(null)
    const [saving, setSaving]   = useState(false)
    const [success, setSuccess] = useState(false)
    const [saveError, setSaveError] = useState(null)

    // Pré-remplir quand projet chargé
    if (project && !form) {
        setForm({
            ...project,
            technologies: Array.isArray(project.technologies)
                ? project.technologies.join(', ')
                : project.technologies || '',
        })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.title.trim() || !form.description.trim() || !form.technologies.trim()) {
            setSaveError('Veuillez remplir tous les champs obligatoires (*).'); return
        }
        try {
            setSaving(true); setSaveError(null)
            await updateProject(id, form)
            setSuccess(true)
            setTimeout(() => navigate(`/projets/${id}`), 1500)
        } catch {
            setSaveError('Erreur lors de la mise à jour. Vérifiez que json-server est lancé.')
        } finally { setSaving(false) }
    }

    if (loading) return (
        <div className="pt-16 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-gray-400">
                <div className="spinner" /> <span>Chargement…</span>
            </div>
        </div>
    )

    if (error || (!loading && !project)) return (
        <div className="pt-16 min-h-screen flex items-center justify-center text-center px-6">
            <div>
                <h2 className="font-syne text-2xl text-gray-800 mb-4">Projet introuvable</h2>
                <button onClick={() => navigate('/projets')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                    ← Retour aux projets
                </button>
            </div>
        </div>
    )

    if (!form) return null

    const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition text-gray-800"

    return (
        <div className="pt-16 min-h-screen bg-gray-50 py-20 flex items-center">
            <div className="max-w-3xl mx-auto px-6 w-full">
                <div className="bg-white rounded-2xl shadow-lg p-10">

                    <div className="text-center mb-10">
                        <h2 className="font-syne font-bold text-3xl text-gray-900">Modifier le Projet</h2>
                        <div className="w-20 h-1 bg-yellow-500 mx-auto mt-3 rounded" />
                        <p className="text-gray-600 mt-4">Modifiez les informations du projet <strong>{project.title}</strong>.</p>
                    </div>

                    {success && (
                        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 font-medium">
                            <i className="fas fa-check-circle" /> Projet modifié avec succès ! Redirection…
                        </div>
                    )}
                    {saveError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                            <i className="fas fa-exclamation-circle" /> {saveError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        {[
                            { name: 'title',            label: 'Nom du projet *',        ph: '' },
                            { name: 'shortDescription', label: 'Description courte',     ph: 'Résumé affiché sur la carte' },
                            { name: 'technologies',     label: 'Technologies *',         ph: 'React, Node.js (séparées par virgules)' },
                            { name: 'image',            label: "URL de l'image",         ph: 'https://…' },
                            { name: 'demoUrl',          label: 'Lien Demo',              ph: 'https://monprojet.com' },
                            { name: 'githubUrl',        label: 'Lien GitHub',            ph: 'https://github.com/…' },
                        ].map(({ name, label, ph }) => (
                            <div key={name}>
                                <label className="block text-gray-700 font-medium mb-2">{label}</label>
                                <input name={name} value={form[name] || ''} onChange={handleChange}
                                       placeholder={ph} className={inputClass} />
                            </div>
                        ))}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Description complète *</label>
                            <textarea name="description" value={form.description || ''} onChange={handleChange}
                                      rows={4} className={inputClass} />
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <button type="button" onClick={() => navigate(`/projets/${id}`)}
                                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                                Annuler
                            </button>
                            <button type="submit" disabled={saving}
                                    className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition shadow flex items-center gap-2 disabled:opacity-70">
                                {saving
                                    ? <><i className="fas fa-spinner fa-spin" /> Enregistrement…</>
                                    : <><i className="fas fa-save" /> Enregistrer les modifications</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}