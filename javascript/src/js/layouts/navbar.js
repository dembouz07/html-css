/**
 * navbar.js
 * Composant Navbar réutilisable
 */

/**
 * Retourne le HTML de la navbar
 * @param {string} activePage - 'home' | 'projects' | 'contact'
 * @returns {string} HTML string
 */
export function renderNavbar(activePage = "home") {
  const links = [
    {
      id: "home",
      href: "#home",
      icon: "fa-house",
      label: "Accueil",
      page: "home",
    },
    {
      id: "projects",
      href: "#projects",
      icon: "fa-briefcase",
      label: "Projets",
      page: "projects",
    },
    {
      id: "contact",
      href: "#contact",
      icon: "fa-envelope",
      label: "Contact",
      page: "contact",
    },
  ];

  const navLinks = links
    .map(
      (link) => `
    <a href="${link.href}"
       data-page="${link.page}"
       class="nav-link text-lg font-semibold hover:text-gray-300 mx-4 transition ${
         activePage === link.page ? "text-blue-400" : ""
       }">
      <i class="fas ${link.icon} mr-1"></i> ${link.label}
    </a>
  `
    )
    .join("");

  return `
    <nav class="bg-gray-900 shadow-md border-b-2 border-gray-700 text-white fixed w-full top-0 z-50">
      <div class="container mx-auto flex items-center px-6 h-16 justify-between">
        <a href="#home" data-page="home" class="nav-link">
          <img src="../public/assets/logo.png" alt="Logo" class="h-12 inline-block">
        </a>
        <div class="flex gap-2">
          ${navLinks}
        </div>
      </div>
    </nav>
  `;
}

/**
 * Monte la navbar dans le DOM et gère la navigation SPA
 * @param {string} activePage
 * @param {Function} onNavigate - callback(page, params)
 */
export function mountNavbar(activePage, onNavigate) {
  let navEl = document.getElementById("navbar");
  if (!navEl) {
    navEl = document.createElement("div");
    navEl.id = "navbar";
    document.body.prepend(navEl);
  }
  navEl.innerHTML = renderNavbar(activePage);

  // Gestion des liens de navigation
  navEl.querySelectorAll(".nav-link[data-page]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (onNavigate) onNavigate(page);
    });
  });
}