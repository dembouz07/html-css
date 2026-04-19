import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { deleteProject } from '../services/projectService.js'
import { useProject } from '../hooks/useProject.js'

export default function DetaillerProjet() {
    const { id }   = useParams()
    const navigate = useNavigate()
    const { project, loading, error } = useProject(id)
    const [deleteModal, setDeleteModal] = useState(false)

    async function handleDeleteConfirm() {
        try {
            await deleteProject(id)
            navigate('/projets')
        } catch {
            setDeleteModal(false)
        }
    }

    if (loading) return (
        <div className="pt-16 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-gray-400">
                <div className="spinner" /> <span>Chargement…</span>
            </div>
        </div>
    )

    if (error || !project) return (
        <div className="pt-16 min-h-screen flex items-center justify-center text-center px-6">
            <div>
                <i className="fas fa-exclamation-triangle text-5xl text-red-400 mb-4 block" />
                <h2 className="font-syne text-2xl text-gray-800 mb-4">Projet introuvable</h2>
                <button onClick={() => navigate('/projets')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                    ← Retour aux projets
                </button>
            </div>
        </div>
    )

    return (
        <div className="pt-28 pb-20 min-h-screen">
            <div className="max-w-6xl mx-auto px-6">

                {/* Retour */}
                <button
                    onClick={() => navigate('/projets')}
                    className="text-blue-600 font-semibold hover:underline mb-8 inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer text-base"
                >
                    <i className="fas fa-arrow-left" /> Retour aux projets
                </button>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <img
                        src={project.image}
                        alt={project.title}
                        className="rounded-2xl shadow-lg w-full object-cover"
                        onError={e => { e.target.src = `https://placehold.co/600x400/3b82f6/white?text=${encodeURIComponent(project.title)}` }}
                    />

                    {/* Infos */}
                    <div>
                        <h1 className="font-syne font-bold text-4xl text-gray-800 mb-4">{project.title}</h1>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">{project.description}</p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Technologies</h3>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {(project.technologies || []).map(tech => (
                                <span key={tech} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium">
                  {tech}
                </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                            {project.demoUrl && project.demoUrl !== '#' && (
                                <a href={project.demoUrl} target="_blank" rel="noreferrer"
                                   className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-semibold">
                                    <i className="fas fa-eye" /> Demo
                                </a>
                            )}
                            {project.githubUrl && project.githubUrl !== '#' && (
                                <a href={project.githubUrl} target="_blank" rel="noreferrer"
                                   className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition flex items-center gap-2 font-semibold">
                                    <i className="fab fa-github" /> Code
                                </a>
                            )}
                            <button onClick={() => navigate(`/projets/${project.id}/editer`)}
                                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition flex items-center gap-2 font-semibold">
                                <i className="fas fa-pen" /> Editer
                            </button>
                            <button onClick={() => setDeleteModal(true)}
                                    className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition flex items-center gap-2 font-semibold">
                                <i className="fas fa-trash" /> Supprimer
                            </button>
                            <button onClick={() => navigate('/projets')}
                                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition flex items-center gap-2 font-semibold">
                                <i className="fas fa-times" /> Annuler
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modale suppression */}
            {deleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
                     onClick={() => setDeleteModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-trash text-red-500 text-2xl" />
                            </div>
                            <h3 className="font-syne font-bold text-2xl text-gray-900 mb-2">Supprimer le projet ?</h3>
                            <p className="text-gray-600">
                                Vous allez supprimer <strong>"{project.title}"</strong>. Cette action est irréversible.
                            </p>
                        </div>
                        <div className="flex gap-3 justify-center">
                            <button onClick={() => setDeleteModal(false)}
                                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium">
                                Annuler
                            </button>
                            <button onClick={handleDeleteConfirm}
                                    className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium flex items-center gap-2">
                                <i className="fas fa-trash" /> Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}