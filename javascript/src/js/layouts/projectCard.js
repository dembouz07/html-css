/**
 * projectCard.js
 * Composant carte de projet réutilisable
 */

// projectCard.js est dans layouts/ → services/ est au même niveau
import { deleteProject } from "../services/projectService.js";

/**
 * Crée un élément DOM de carte projet et attache les événements
 * @param {Object} project
 * @param {Function} onNavigate - callback(page, params)
 * @returns {HTMLElement}
 */
export function createProjectCard(project, onNavigate) {
  const div = document.createElement("div");
  div.className =
    "bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group";

  div.innerHTML = `
    <div class="overflow-hidden h-52">
      <img
        src="${project.image}"
        alt="${project.title}"
        class="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        onerror="this.src='https://placehold.co/400x200/3b82f6/white?text=${encodeURIComponent(project.title)}'">
    </div>
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">${project.title}</h3>
      <p class="text-gray-600 text-sm mb-4">${project.shortDescription}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        ${project.technologies
          .slice(0, 3)
          .map(
            (t) =>
              `<span class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">${t}</span>`
          )
          .join("")}
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="view-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
          <i class="fas fa-eye mr-1"></i> Voir
        </button>
        <button class="edit-btn bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm font-medium">
          <i class="fas fa-pen mr-1"></i> Modifier
        </button>
        <button class="delete-btn bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium">
          <i class="fas fa-trash mr-1"></i> Supprimer
        </button>
      </div>
    </div>
  `;

  div.querySelector(".view-btn").addEventListener("click", () => {
    if (onNavigate) onNavigate("project-detail", { slug: project.slug });
  });

  div.querySelector(".edit-btn").addEventListener("click", () => {
    if (onNavigate) onNavigate("edit-project", { id: project.id });
  });

  div.querySelector(".delete-btn").addEventListener("click", () => {
    showDeleteModal(project.id, project.title, onNavigate);
  });

  return div;
}

/**
 * Affiche une modale de confirmation avant suppression
 */
function showDeleteModal(id, title, onNavigate) {
  const existing = document.getElementById("delete-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "delete-modal";
  modal.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50";
  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
      <div class="text-center mb-6">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-trash text-red-500 text-2xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Supprimer le projet ?</h3>
        <p class="text-gray-600">
          Vous êtes sur le point de supprimer
          <span class="font-semibold text-gray-800">"${title}"</span>.
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
  `;

  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });

  modal.querySelector("#modal-cancel").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector("#modal-confirm").addEventListener("click", () => {
    const success = deleteProject(id);
    modal.remove();
    if (success && onNavigate) onNavigate("projects");
  });
}