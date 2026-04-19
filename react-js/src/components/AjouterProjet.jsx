import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProject } from '../services/projectService.js'

const EMPTY = { title: '', shortDescription: '', description: '', technologies: '', image: '', demoUrl: '', githubUrl: '' }

export default function AjouterProjet() {
    const navigate  = useNavigate()
    const [form, setForm]       = useState(EMPTY)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError]     = useState(null)

    const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-gray-800"

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.title.trim() || !form.description.trim() || !form.technologies.trim()) {
            setError('Veuillez remplir tous les champs obligatoires (*).'); return
        }
        try {
            setLoading(true); setError(null)
            await addProject({
                ...form,
                image: form.image || `https://placehold.co/600x400/3b82f6/white?text=${encodeURIComponent(form.title)}`,
                demoUrl:   form.demoUrl   || '#',
                githubUrl: form.githubUrl || '#',
            })
            setSuccess(true)
            setTimeout(() => navigate('/projets'), 1500)
        } catch {
            setError("Erreur lors de l'ajout. Vérifiez que json-server est lancé sur le port 3001.")
        } finally { setLoading(false) }
    }

    return (
        <div className="pt-16 min-h-screen bg-gray-50 py-20 flex items-center">
            <div className="max-w-3xl mx-auto px-6 w-full">
                <div className="bg-white rounded-2xl shadow-lg p-10">

                    <div className="text-center mb-10">
                        <h2 className="font-syne font-bold text-3xl text-gray-900">Ajouter un Projet</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mt-3 rounded" />
                        <p className="text-gray-600 mt-4">Remplissez les informations pour ajouter un nouveau projet à votre portfolio.</p>
                    </div>

                    {success && (
                        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 font-medium">
                            <i className="fas fa-check-circle" /> Projet ajouté avec succès ! Redirection…
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                            <i className="fas fa-exclamation-circle" /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Nom du projet *</label>
                            <input name="title" value={form.title} onChange={handleChange}
                                   placeholder="Ex: Application de gestion des étudiants" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Description courte</label>
                            <input name="shortDescription" value={form.shortDescription} onChange={handleChange}
                                   placeholder="Résumé affiché sur la carte projet" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Description complète *</label>
                            <textarea name="description" value={form.description} onChange={handleChange}
                                      rows={4} placeholder="Décrivez brièvement le projet…" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Image du projet (URL)</label>
                            <input name="image" value={form.image} onChange={handleChange}
                                   placeholder="https://… (laisser vide pour image auto)" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Technologies utilisées *</label>
                            <input name="technologies" value={form.technologies} onChange={handleChange}
                                   placeholder="Ex: Laravel, AWS, Docker (séparées par des virgules)" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Lien du projet</label>
                            <input name="demoUrl" type="url" value={form.demoUrl} onChange={handleChange}
                                   placeholder="https://monprojet.com" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Lien Github</label>
                            <input name="githubUrl" type="url" value={form.githubUrl} onChange={handleChange}
                                   placeholder="https://github.com/moncompte/monprojet.git" className={inputClass} />
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <button type="button" onClick={() => navigate('/projets')}
                                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                                Annuler
                            </button>
                            <button type="submit" disabled={loading}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow flex items-center gap-2 disabled:opacity-70">
                                {loading
                                    ? <><i className="fas fa-spinner fa-spin" /> Enregistrement…</>
                                    : <><i className="fas fa-save" /> Enregistrer le projet</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}