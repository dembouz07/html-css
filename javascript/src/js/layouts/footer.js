/**
 * footer.js
 * Composant Footer réutilisable
 */

/**
 * Retourne le HTML du footer
 * @returns {string} HTML string
 */
export function renderFooter() {
  return `
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-2xl font-bold mb-4">Ousseynou Faye</h2>
        <p class="text-gray-400 mb-6">
          © Développeur Full Stack • Cloud & DevOps Learner (AWS re/Start)
        </p>
        <div class="flex justify-center gap-6 text-2xl">
          <a href="#" class="text-gray-400 hover:text-white transition">
            <i class="fab fa-github"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-blue-400 transition">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-orange-400 transition">
            <i class="fab fa-aws"></i>
          </a>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Monte le footer dans le DOM
 */
export function mountFooter() {
  let footerEl = document.getElementById("app-footer");
  if (!footerEl) {
    footerEl = document.createElement("div");
    footerEl.id = "app-footer";
    document.body.appendChild(footerEl);
  }
  footerEl.innerHTML = renderFooter();
}