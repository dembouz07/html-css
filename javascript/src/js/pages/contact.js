/**
 * contact.js
 * Page de contact
 */

import {
  validateContactForm,
  submitContactForm,
  displayFormErrors,
  resetContactForm,
} from "../services/contactService.js";

/**
 * Monte la page de contact
 * @param {HTMLElement} container
 * @param {Function} onNavigate - callback(page, params)
 */
export function mountContact(container, onNavigate) {
  container.innerHTML = `
    <section class="bg-gray-50 pt-24 pb-20 min-h-screen">
      <div class="container mx-auto px-6 max-w-6xl">

        <div class="text-center mb-14">
          <h2 class="text-4xl font-semibold text-gray-800">Me Contacter</h2>
          <div class="w-20 h-1 bg-blue-600 mx-auto mt-3 rounded"></div>
          <p class="text-gray-600 mt-4">
            Une idée de projet ou une collaboration ? Écrivez-moi directement.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-start">

          <!-- INFOS -->
          <div class="space-y-6">
            <h3 class="text-2xl font-semibold text-gray-800">Restons en contact</h3>
            <p class="text-gray-600">
              Disponible pour projets freelance, collaborations ou opportunités
              en développement web, cloud et DevOps.
            </p>
            <div class="space-y-5 text-gray-700">
              <div class="flex items-center gap-4">
                <i class="fa-solid fa-location-dot text-blue-600 text-xl w-6"></i>
                <span>Dakar, Sénégal</span>
              </div>
              <div class="flex items-center gap-4">
                <i class="fa-solid fa-envelope text-blue-600 text-xl w-6"></i>
                <span>fayeouz84@gmail.com</span>
              </div>
              <div class="flex items-center gap-4">
                <i class="fa-solid fa-phone text-blue-600 text-xl w-6"></i>
                <span>+221 77 400 62 35</span>
              </div>
            </div>
            <div class="flex gap-6 pt-6 text-2xl">
              <a href="#" class="text-gray-600 hover:text-blue-600 transition"><i class="fa-brands fa-github"></i></a>
              <a href="#" class="text-gray-600 hover:text-blue-600 transition"><i class="fa-brands fa-linkedin"></i></a>
              <a href="#" class="text-gray-600 hover:text-orange-400 transition"><i class="fa-brands fa-aws"></i></a>
            </div>
          </div>

          <!-- FORMULAIRE -->
          <div class="bg-white shadow-lg rounded-2xl p-8">
            <div id="contact-success" class="hidden mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
              <i class="fas fa-check-circle mr-2"></i> Message envoyé avec succès !
            </div>

            <form id="contact-form" class="space-y-5" novalidate>
              <div>
                <label class="block text-gray-700 mb-2 font-medium">Nom complet *</label>
                <input type="text" name="name"
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition">
              </div>
              <div>
                <label class="block text-gray-700 mb-2 font-medium">Email *</label>
                <input type="email" name="email"
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition">
              </div>
              <div>
                <label class="block text-gray-700 mb-2 font-medium">Sujet *</label>
                <input type="text" name="subject"
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition">
              </div>
              <div>
                <label class="block text-gray-700 mb-2 font-medium">Message *</label>
                <textarea rows="5" name="message"
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
              </div>
              <button type="submit" id="submit-btn"
                class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                <i class="fa-solid fa-paper-plane"></i>
                Envoyer le message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  `;

  const form = container.querySelector("#contact-form");
  const submitBtn = container.querySelector("#submit-btn");
  const successMsg = container.querySelector("#contact-success");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    const { valid, errors } = validateContactForm(formData);

    if (!valid) {
      displayFormErrors(errors);
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Envoi en cours...`;

    const result = await submitContactForm(formData);

    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Envoyer le message`;

    if (result.success) {
      resetContactForm(form);
      successMsg.classList.remove("hidden");
      setTimeout(() => successMsg.classList.add("hidden"), 4000);
    }
  });
}