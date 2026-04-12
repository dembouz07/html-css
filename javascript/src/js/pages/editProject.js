/**
 * editProject.js
 * Page de modification d'un projet existant
 */

import { getProjectById, updateProject } from "../services/projectService.js";

/**
 * Monte la page d'édition d'un projet
 * @param {HTMLElement} container
 * @param {number} id - id du projet à modifier
 * @param {Function} onNavigate - callback(page, params)
 */
export function mountEditProject(container, id, onNavigate) {
    const project = getProjectById(Number(id));

  // Projet introuvable
  if (!project) {
    container.innerHTML = `
      <section class="min-h-screen flex items-center justify-center pt-16">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Projet introuvable</h2>
          <p class="text-gray-500 mb-6">Ce projet n'existe pas ou a été supprimé.</p>
          <button id="back-btn"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            ← Retour aux projets
          </button>
        </div>
      </section>
    `;
    container.querySelector("#back-btn").addEventListener("click", () => {
      if (onNavigate) onNavigate("projects");
    });
    return;
  }

  container.innerHTML = `
    <section class="bg-gray-50 pt-24 pb-20 min-h-screen flex items-center">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10">

          <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-gray-900">Modifier le Projet</h2>
            <div class="w-20 h-1 bg-yellow-500 mx-auto mt-3 rounded"></div>
            <p class="text-gray-600 mt-4">
              Modifiez les informations du projet
              <strong class="text-gray-800">${project.title}</strong>.
            </p>
          </div>

          <!-- Message de succès -->
          <div id="success-msg"
            class="hidden mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
            <i class="fas fa-check-circle mr-2"></i> Projet modifié avec succès !
          </div>

          <form id="edit-project-form" class="space-y-6" novalidate>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Nom du projet *</label>
              <input type="text" name="title"
                value="${project.title}"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition">
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Description courte *</label>
              <input type="text" name="shortDescription"
                value="${project.shortDescription}"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition">
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Description complète *</label>
              <textarea rows="4" name="description"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition">${project.description}</textarea>
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Technologies utilisées *</label>
              <input type="text" name="technologies"
                value="${project.technologies.join(", ")}"
                placeholder="Ex: Laravel, AWS, Docker"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition">
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Lien Demo</label>
              <input type="url" name="demoUrl"
                value="${project.demoUrl !== "#" ? project.demoUrl : ""}"
                placeholder="https://monprojet.com"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition">
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Lien GitHub</label>
              <input type="url" name="githubUrl"
                value="${project.githubUrl !== "#" ? project.githubUrl : ""}"
                placeholder="https://github.com/..."
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition">
            </div>

            <div class="flex justify-between items-center pt-6">
              <button type="button" id="cancel-btn"
                class="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                Annuler
              </button>
              <button type="submit"
                class="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition shadow flex items-center gap-2">
                <i class="fas fa-save"></i> Enregistrer les modifications
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  `;

  // Annuler → retour au détail du projet
  container.querySelector("#cancel-btn").addEventListener("click", () => {
    if (onNavigate) onNavigate("project-detail", { slug: project.slug });
  });

  // Soumission du formulaire
  container.querySelector("#edit-project-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    // Validation simple
    if (!data.title || !data.description || !data.technologies) {
      alert("Veuillez remplir tous les champs obligatoires (*).");
      return;
    }

    // Mise à jour via le service
    updateProject(project.id, {
      title: data.title,
      shortDescription: data.shortDescription || data.description,
      description: data.description,
      technologies: data.technologies,
      demoUrl: data.demoUrl || "#",
      githubUrl: data.githubUrl || "#",
    });

    // Feedback succès puis redirection
    container.querySelector("#success-msg").classList.remove("hidden");
    setTimeout(() => {
      if (onNavigate) onNavigate("projects");
    }, 1500);
  });
}