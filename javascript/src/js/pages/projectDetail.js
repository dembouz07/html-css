/**
 * projectDetail.js
 * Page détail d'un projet
 */

import { getProjectBySlug, deleteProject } from "../services/projectService.js";

/**
 * Monte la page détail d'un projet
 * @param {HTMLElement} container
 * @param {string} slug - identifiant du projet
 * @param {Function} onNavigate - callback(page, params)
 */
export function mountProjectDetail(container, slug, onNavigate) {
  const project = getProjectBySlug(slug);

  if (!project) {
    container.innerHTML = `
      <section class="min-h-screen flex items-center justify-center pt-16">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Projet introuvable</h2>
          <p class="text-gray-600 mb-6">Ce projet n'existe pas ou a été supprimé.</p>
          <button id="back-btn" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
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
    <section class="pt-24 pb-20 min-h-screen">
      <div class="container mx-auto px-6">
        <button id="back-btn"
          class="text-blue-600 font-semibold hover:underline mb-8 inline-flex items-center gap-2 transition">
          <i class="fas fa-arrow-left"></i> Retour aux projets
        </button>

        <div class="grid md:grid-cols-2 gap-12 items-center">
          <img 
            src="${project.image}" 
            alt="${project.title}"
            class="rounded-2xl shadow-lg w-full object-cover"
            onerror="this.src='https://via.placeholder.com/600x400?text=${encodeURIComponent(project.title)}'">

          <div>
            <h1 class="text-4xl font-bold text-gray-800 mb-4">
              ${project.title}
            </h1>
            <p class="text-gray-600 mb-8 leading-relaxed text-lg">
              ${project.description}
            </p>

            <h3 class="text-xl font-semibold mb-4 text-gray-800">Technologies</h3>
            <div class="flex flex-wrap gap-3 mb-8">
              ${project.technologies
                .map(
                  (tech) =>
                    `<span class="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium">${tech}</span>`
                )
                .join("")}
            </div>

            <div class="flex flex-wrap gap-3">
              <a href="${project.demoUrl}"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <i class="fas fa-eye"></i> Demo
              </a>
              <a href="${project.githubUrl}"
                class="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition flex items-center gap-2">
                <i class="fab fa-github"></i> Code
              </a>
              <button id="edit-btn"
                class="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition flex items-center gap-2">
                <i class="fas fa-pen"></i> Modifier
              </button>
              <button id="delete-btn"
                class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition flex items-center gap-2">
                <i class="fas fa-trash"></i> Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modale de confirmation suppression -->
    <div id="delete-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-trash text-red-500 text-2xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Supprimer le projet ?</h3>
          <p class="text-gray-600">
            Vous êtes sur le point de supprimer
            <span class="font-semibold text-gray-800">"${project.title}"</span>.
            Cette action est irréversible.
          </p>
        </div>
        <div class="flex gap-3 justify-center">
          <button id="modal-cancel"
            class="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium">
            Annuler
          </button>
          <button id="modal-confirm"
            class="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium flex items-center gap-2">
            <i class="fas fa-trash"></i> Supprimer
          </button>
        </div>
      </div>
    </div>
  `;

  const modal = container.querySelector("#delete-modal");

  // Retour aux projets
  container.querySelector("#back-btn").addEventListener("click", () => {
    if (onNavigate) onNavigate("projects");
  });

  // Modifier → page d'édition
  container.querySelector("#edit-btn").addEventListener("click", () => {
    if (onNavigate) onNavigate("edit-project", { id: project.id });
  });

  // Supprimer → ouvre la modale
  container.querySelector("#delete-btn").addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // Annuler dans la modale → ferme la modale
  container.querySelector("#modal-cancel").addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Clic en dehors de la modale → ferme la modale
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // Confirmer la suppression
  container.querySelector("#modal-confirm").addEventListener("click", () => {
    const success = deleteProject(project.id);
    if (success && onNavigate) onNavigate("projects");
  });
}