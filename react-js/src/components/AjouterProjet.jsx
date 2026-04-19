/**
 * AjouterProjet.jsx
 * Formulaire d'ajout d'un nouveau projet.
 * Utilise ProjectForm (formulaire partagé) et addProject (API).
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProject } from '../services/projectService.js'
import ProjectForm from './ui/ProjectForm.jsx'
import Alert from './ui/Alert.jsx'

export default function AjouterProjet() {
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)

    async function handleSubmit(formData) {
        await addProject(formData)
        setSuccess(true)
        setTimeout(() => navigate('/projets'), 1500)
    }

    return (
        <div className="page">
            <div className="container" style={{ padding: '2.5rem 2rem' }}>
                <div className="card form-card">

                    <h2 className="form-title">Ajouter un Projet</h2>
                    <div className="form-bar" style={{ background: 'var(--blue)' }} />

                    {success && (
                        <Alert type="success">Projet ajouté avec succès ! Redirection…</Alert>
                    )}

                    <ProjectForm
                        onSubmit={handleSubmit}
                        onCancel={() => navigate('/projets')}
                        submitLabel="Enregistrer le projet"
                        accentColor="var(--blue)"
                    />

                </div>
            </div>
        </div>
    )
}