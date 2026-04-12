/**
 * projectCard.js
 * Composant carte de projet réutilisable
 */

/**
 * Retourne le HTML d'une carte projet
 * @param {Object} project
 * @param {Function} onViewDetail - callback(slug)
 * @returns {string} HTML string
 */
export function renderProjectCard(project, onViewDetail) {
  return `
    <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group">
      <div class="overflow-hidden h-52">
        <img 
          src="${project.image}" 
          alt="${project.title}"
          class="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          onerror="this.src='https://via.placeholder.com/400x200?text=${encodeURIComponent(project.title)}'">
      </div>
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">
          ${project.title}
        </h3>
        <p class="text-gray-600 text-sm mb-4">
          ${project.shortDescription}
        </p>
        <div class="flex flex-wrap gap-2 mb-4">
          ${project.technologies
            .slice(0, 3)
            .map(
              (tech) =>
                `<span class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">${tech}</span>`
            )
            .join("")}
        </div>
        <button 
          data-slug="${project.slug}"
          class="view-project-btn inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
          Voir le projet →
        </button>
      </div>
    </div>
  `;
}

/**
 * Crée un élément DOM de carte projet et attache les événements
 * @param {Object} project
 * @param {Function} onViewDetail - callback(slug)
 * @returns {HTMLElement}
 */
export function createProjectCard(project, onViewDetail) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = renderProjectCard(project);
  const card = wrapper.firstElementChild;

  card.querySelector(".view-project-btn").addEventListener("click", () => {
    if (onViewDetail) onViewDetail(project.slug);
  });

  return card;
}