import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../projectService';

// Mock de fetch
global.fetch = jest.fn();

describe('Project Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('getProjects', () => {
    it('devrait récupérer tous les projets', async () => {
      const mockProjects = {
        success: true,
        data: [
          { _id: '1', title: 'Projet 1' },
          { _id: '2', title: 'Projet 2' }
        ]
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProjects
      });

      const result = await getProjects();

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/projects'));
      expect(result).toEqual(mockProjects);
    });

    it('devrait gérer les erreurs', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await expect(getProjects()).rejects.toThrow();
    });
  });

  describe('getProjectById', () => {
    it('devrait récupérer un projet par son ID', async () => {
      const mockProject = {
        success: true,
        data: { _id: '1', title: 'Projet 1' }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProject
      });

      const result = await getProjectById('1');

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/projects/1'));
      expect(result).toEqual(mockProject);
    });
  });

  describe('createProject', () => {
    it('devrait créer un nouveau projet', async () => {
      const newProject = { title: 'Nouveau Projet', description: 'Description' };
      const mockResponse = {
        success: true,
        data: { _id: '1', ...newProject }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await createProject(newProject);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/projects'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject)
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateProject', () => {
    it('devrait mettre à jour un projet existant', async () => {
      const updatedData = { title: 'Projet Modifié' };
      const mockResponse = {
        success: true,
        data: { _id: '1', ...updatedData }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await updateProject('1', updatedData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/projects/1'),
        expect.objectContaining({
          method: 'PUT'
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteProject', () => {
    it('devrait supprimer un projet', async () => {
      const mockResponse = {
        success: true,
        message: 'Projet supprimé avec succès'
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await deleteProject('1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/projects/1'),
        expect.objectContaining({
          method: 'DELETE'
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
