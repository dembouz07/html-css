/**
 * Dossier.jsx
 * Composant chargé de gérer (stocker, afficher, supprimer) la liste des projets.
 * Utilise le hook useProjects pour centraliser la logique d'état.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects.js'
import Projet from './Projet.jsx'
import Modal from './ui/Modal.jsx'
import Spinner from './ui/Spinner.jsx'
import Alert from './ui/Alert.jsx'

export default function Dossier() {
    const navigate = useNavigate()
    const { projects, loading, error, deleteProject } = useProjects()
    const [deleteModal, setDeleteModal] = useState(null) // { id, title }
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

    if (loading) return <div className="page"><Spinner text="Chargement des projets…" /></div>

    return (
        <div className="page">
            <div className="container" style={{ padding: '2.5rem 2rem' }}>

                {/* En-tête */}
                <div className="projects-header">
                    <div>
                        <h1 className="section-title">Mes Projets</h1>
                        <div className="section-bar" />
                        <p style={{ color: 'var(--gray-600)' }}>
                            {projects.length} réalisation{projects.length > 1 ? 's' : ''}
                        </p>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/projets/ajouter')}>
                        <i className="fas fa-plus" /> Ajouter un projet
                    </button>
                </div>

                {/* Erreurs */}
                {(error || deleteError) && (
                    <Alert type="error">{error || deleteError}</Alert>
                )}

                {/* Grille vide */}
                {projects.length === 0 && !error ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray-400)' }}>
                        <i className="fas fa-folder-open" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }} />
                        <p>Aucun projet. Ajoutez votre premier projet !</p>
                    </div>
                ) : (
                    <div className="projects-grid">
                        {projects.map(project => (
                            <Projet
                                key={project.id}
                                project={project}
                                onDelete={() => setDeleteModal(project)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modale de confirmation suppression */}
            {deleteModal && (
                <Modal
                    title="Supprimer le projet ?"
                    message={`Vous êtes sur le point de supprimer "${deleteModal.title}". Cette action est irréversible.`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteModal(null)}
                    danger
                    confirmLabel="Supprimer"
                />
            )}
        </div>
    )
}