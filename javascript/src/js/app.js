/**
 * app.js
 * Point d'entrée principal — Routeur SPA
 *
 * Gère la navigation entre les pages sans rechargement.
 * Chaque "page" est un module JS indépendant.
 */

import { mountNavbar } from "./layouts/navbar.js";
import { mountFooter } from "./layouts/footer.js";
import { mountHome } from "./pages/home.js";
import { mountProjects } from "./pages/projects.js";
import { mountProjectDetail } from "./pages/projectDetail.js";
import { mountAddProject } from "./pages/addProject.js";
import { mountContact } from "./pages/contact.js";

// ─── État de l'application ───────────────────────────────────────────────────

const state = {
  currentPage: "home",
  params: {},
};

// ─── Routeur ─────────────────────────────────────────────────────────────────

/**
 * Navigue vers une page
 * @param {string} page - identifiant de la page
 * @param {Object} params - paramètres optionnels (ex: { slug: "ec2-deployment" })
 */
function navigate(page, params = {}) {
  state.currentPage = page;
  state.params = params;

  // Mise à jour de la navbar
  const navPage = ["projects", "add-project", "project-detail"].includes(page)
    ? "projects"
    : page === "contact"
    ? "contact"
    : "home";

  mountNavbar(navPage, navigate);
  renderPage();

  // Scroll en haut
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Affiche la page courante dans le container principal
 */
function renderPage() {
  const container = document.getElementById("app");
  if (!container) return;

  container.innerHTML = "";

  switch (state.currentPage) {
    case "home":
      mountHome(container, navigate);
      break;

    case "projects":
      mountProjects(container, navigate);
      break;

    case "project-detail":
      mountProjectDetail(container, state.params.slug, navigate);
      break;

    case "add-project":
      mountAddProject(container, navigate);
      break;

    case "contact":
      mountContact(container, navigate);
      break;

    default:
      container.innerHTML = `
        <section class="min-h-screen flex items-center justify-center pt-16">
          <div class="text-center">
            <h2 class="text-4xl font-bold text-gray-800 mb-4">Page introuvable</h2>
            <button onclick="" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Retour à l'accueil
            </button>
          </div>
        </section>
      `;
      container.querySelector("button").addEventListener("click", () => navigate("home"));
  }
}

// ─── Initialisation ───────────────────────────────────────────────────────────

function init() {
  // Monte la navbar et le footer
  mountNavbar("home", navigate);
  mountFooter();

  // Rend la page initiale
  renderPage();
}

// Démarre l'app quand le DOM est prêt
document.addEventListener("DOMContentLoaded", init);