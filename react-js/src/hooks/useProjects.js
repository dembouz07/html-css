/**
 * useProjects.js
 * Hook personnalisé pour gérer l'état et les opérations sur les projets.
 * Centralise la logique fetch/add/update/delete pour éviter la répétition.
 */

import { useState, useEffect, useCallback } from 'react'
import {
    getAllProjects,
    addProject as apiAdd,
    updateProject as apiUpdate,
    deleteProject as apiDelete,
} from '../services/projectService.js'

export function useProjects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading]   = useState(true)
    const [error, setError]       = useState(null)

    // ── Chargement ────────────────────────────────────────────────
    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await getAllProjects()
            setProjects(data)
        } catch {
            setError('Impossible de charger les projets. Vérifiez que json-server est lancé sur le port 3001.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchProjects() }, [fetchProjects])

    // ── Ajout ─────────────────────────────────────────────────────
    const addProject = useCallback(async (data) => {
        const created = await apiAdd(data)
        setProjects(prev => [...prev, created])
        return created
    }, [])

    // ── Mise à jour ───────────────────────────────────────────────
    const updateProject = useCallback(async (id, data) => {
        const updated = await apiUpdate(id, data)
        setProjects(prev => prev.map(p => p.id === updated.id ? updated : p))
        return updated
    }, [])

    // ── Suppression ───────────────────────────────────────────────
    const deleteProject = useCallback(async (id) => {
        await apiDelete(id)
        setProjects(prev => prev.filter(p => p.id !== id))
    }, [])

    return { projects, loading, error, fetchProjects, addProject, updateProject, deleteProject }
}