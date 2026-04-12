/**
 * addProject.js
 * Page d'ajout d'un nouveau projet
 */

import { addProject } from "../services/projectService.js";

/**
 * Monte la page d'ajout de projet
 * @param {HTMLElement} container
 * @param {Function} onNavigate - callback(page, params)
 */
export function mountAddProject(container, onNavigate) {
  container.innerHTML = `
    <section class="bg-gray-50 pt-24 pb-20 min-h-screen flex items-center">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-gray-900">Ajouter un Projet</h2>
            <div class="w-20 h-1 bg-blue-600 mx-auto mt-3 rounded"></div>
            <p class="text-gray-600 mt-4">
              Remplissez les informations pour ajouter un nouveau projet à votre portfolio.
            </p>
          </div>

          <div id="success-msg" class="hidden mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
            <i class="fas fa-check-circle mr-2"></i> Projet ajouté avec succès !
          </div>

          <form id="add-project-form" class="space-y-6" novalidate>
            <div>
              <label class="block text-gray-700 font-medium mb-2">Nom du projet *</label>
              <input type="text" name="title"
                placeholder="Ex: Application de gestion des étudiants"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Description courte *</label>
              <input type="text" name="shortDescription"
                placeholder="Résumé affiché sur la carte projet"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Description complète *</label>
              <textarea rows="4" name="description"
                placeholder="Décrivez brièvement le projet..."
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"></textarea>
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Image du projet</label>
              <input type="file" name="imageFile" accept="image/*"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer file:mr-4">
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Technologies utilisées *</label>
              <input type="text" name="technologies"
                placeholder="Ex: Laravel, AWS, Docker (séparées par des virgules)"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Lien du projet</label>
              <input type="url" name="demoUrl"
                placeholder="https://monprojet.com"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Lien Github</label>
              <input type="url" name="githubUrl"
                placeholder="https://github.com/moncompte/monprojet.git"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
            </div>

            <div class="flex justify-between items-center pt-6">
              <button type="button" id="cancel-btn"
                class="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                Annuler
              </button>
              <button type="submit"
                class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow flex items-center gap-2">
                <i class="fas fa-save"></i> Enregistrer le projet
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  // Bouton annuler
  container.querySelector("#cancel-btn").addEventListener("click", () => {
    if (onNavigate) onNavigate("projects");
  });

  // Soumission du formulaire
  container
    .querySelector("#add-project-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = Object.fromEntries(new FormData(form));

      // Validation simple
      if (!formData.title || !formData.description || !formData.technologies) {
        alert("Veuillez remplir tous les champs obligatoires (*).");
        return;
      }

      // Ajout du projet
      addProject({
        title: formData.title,
        shortDescription: formData.shortDescription || formData.description,
        description: formData.description,
        technologies: formData.technologies,
        image: "../public/assets/placeholder.png",
        demoUrl: formData.demoUrl || "#",
        githubUrl: formData.githubUrl || "#",
      });

      // Feedback
      form.reset();
      const successMsg = container.querySelector("#success-msg");
      successMsg.classList.remove("hidden");
      setTimeout(() => {
        if (onNavigate) onNavigate("projects");
      }, 1500);
    });
}