/**
 * contactService.js
 * Gestion de la logique du formulaire de contact
 */

/**
 * Valide les champs du formulaire de contact
 * @param {Object} formData - { name, email, subject, message }
 * @returns {{ valid: boolean, errors: Object }}
 */
export function validateContactForm(formData) {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = "Le nom doit contenir au moins 2 caractères.";
  }

  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Veuillez entrer une adresse email valide.";
  }

  if (!formData.subject || formData.subject.trim().length < 3) {
    errors.subject = "Le sujet doit contenir au moins 3 caractères.";
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = "Le message doit contenir au moins 10 caractères.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Envoie le formulaire de contact (simulation — en prod, appel fetch/API)
 * @param {Object} formData
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitContactForm(formData) {
  // Simulation d'un appel réseau
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Formulaire envoyé :", formData);
      resolve({
        success: true,
        message: "Votre message a été envoyé avec succès !",
      });
    }, 800);
  });
}

/**
 * Affiche les erreurs dans le formulaire
 * @param {Object} errors
 */
export function displayFormErrors(errors) {
  // Reset existing errors
  document.querySelectorAll(".form-error").forEach((el) => el.remove());
  document
    .querySelectorAll(".input-error")
    .forEach((el) => el.classList.remove("input-error", "border-red-500"));

  Object.entries(errors).forEach(([field, message]) => {
    const input = document.querySelector(`[name="${field}"]`);
    if (!input) return;

    input.classList.add("border-red-500");

    const errorEl = document.createElement("p");
    errorEl.className = "form-error text-red-500 text-sm mt-1";
    errorEl.textContent = message;
    input.parentNode.appendChild(errorEl);
  });
}

/**
 * Réinitialise le formulaire
 * @param {HTMLFormElement} form
 */
export function resetContactForm(form) {
  form.reset();
  document.querySelectorAll(".form-error").forEach((el) => el.remove());
  document
    .querySelectorAll(".border-red-500")
    .forEach((el) => el.classList.remove("border-red-500"));
}