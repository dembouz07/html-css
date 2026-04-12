/**
 * projects.js
 * Page liste des projets
 */

import { getAllProjects } from "../services/projectService.js";
import { createProjectCard } from "../layouts/projectCard.js";

/**
 * Monte la page projets dans le container
 * @param {HTMLElement} container
 * @param {Function} onNavigate - callback(page, params)
 */
export function mountProjects(container, onNavigate) {
  const projects = getAllProjects();

  container.innerHTML = `
    <section class="bg-gray-50 min-h-screen pt-24 pb-20">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div class="text-center md:text-left">
            <h2 class="text-4xl font-bold text-gray-900">Mes Projets</h2>
            <div class="w-20 h-1 bg-blue-600 mt-3 rounded mx-auto md:mx-0"></div>
            <p class="text-gray-600 mt-4">
              Quelques réalisations illustrant mes compétences en développement, cloud et DevOps.
            </p>
          </div>
          <button id="add-project-btn"
            class="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700 transition shadow">
            <i class="fas fa-plus"></i> Ajouter un projet
          </button>
        </div>
        <div id="projects-grid" class="grid md:grid-cols-2 gap-8"></div>
      </div>
    </section>
  `;

  container.querySelector("#add-project-btn").addEventListener("click", () => {
    if (onNavigate) onNavigate("add-project");
  });

  const grid = container.querySelector("#projects-grid");
  projects.forEach((project, index) => {
    const card = createProjectCard(project, onNavigate);

    if (index === projects.length - 1 && projects.length % 2 !== 0) {
      card.classList.add("md:col-span-2", "md:w-1/2", "md:mx-auto");
    }

    grid.appendChild(card);
  });
}