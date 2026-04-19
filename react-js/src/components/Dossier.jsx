import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects.js'
import Projet from './Projet.jsx'

export default function Dossier() {
    const navigate = useNavigate()
    const { projects, loading, error, deleteProject } = useProjects()
    const [deleteModal, setDeleteModal] = useState(null)
    const [deleteError, setDeleteError] = useState(null)

    async function handleDeleteConfirm() {
        try {
            await deleteProject(deleteModal.id)
            setDeleteModal(null)
        } catch {
            setDeleteError('Erreur lors de la suppression.')
            setDeleteModal(null)
        }
    }

    if (loading) return (
        <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4 text-gray-400">
                <div className="spinner" />
                <span>Chargement des projets…</span>
            </div>
        </div>
    )

    return (
        <div className="pt-16 min-h-screen bg-gray-50">
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">

                    {/* En-tête */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                        <div>
                            <h2 className="font-syne font-bold text-4xl text-gray-900">Mes Projets</h2>
                            <div className="w-20 h-1 bg-blue-600 mt-3 rounded" />
                            <p className="text-gray-600 mt-4">
                                Quelques réalisations illustrant mes compétences en développement, cloud et DevOps.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/projets/ajouter')}
                            className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700 transition shadow"
                        >
                            <i className="fas fa-plus" /> Ajouter un projet
                        </button>
                    </div>

                    {/* Erreurs */}
                    {(error || deleteError) && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                            <i className="fas fa-exclamation-circle" />
                            {error || deleteError}
                        </div>
                    )}

                    {/* Grille vide */}
                    {projects.length === 0 && !error ? (
                        <div className="text-center py-20 text-gray-400">
                            <i className="fas fa-folder-open text-5xl mb-4 block" />
                            <p>Aucun projet. Ajoutez votre premier projet !</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8">
                            {projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className={
                                        index === projects.length - 1 && projects.length % 2 !== 0
                                            ? 'md:col-span-2 md:w-1/2 md:mx-auto'
                                            : ''
                                    }
                                >
                                    <Projet project={project} onDelete={() => setDeleteModal(project)} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Modale suppression */}
            {deleteModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
                    onClick={() => setDeleteModal(null)}
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-trash text-red-500 text-2xl" />
                            </div>
                            <h3 className="font-syne font-bold text-2xl text-gray-900 mb-2">Supprimer le projet ?</h3>
                            <p className="text-gray-600">
                                Vous êtes sur le point de supprimer <strong>"{deleteModal.title}"</strong>. Cette action est irréversible.
                            </p>
                        </div>
                        <div className="flex gap-3 justify-center">
                            <button onClick={() => setDeleteModal(null)}
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