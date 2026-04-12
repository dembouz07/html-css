/**
 * projectService.js
 * Gestion des données et logique métier des projets
 */

const projects = [
  {
    id: 1,
    slug: "app-etudiant",
    title: "Application de gestion des étudiants",
    shortDescription:
      "Application web complète permettant la gestion des étudiants, authentification sécurisée et base de données SQL Server.",
    description:
      "Application web permettant la gestion complète des étudiants avec authentification, CRUD et base de données relationnelle.",
    image: "../public/assets/appEtudiant.png",
    technologies: ["HTML", "Tailwind", "SQL Server", "JavaScript"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    slug: "ec2-deployment",
    title: "Déploiement AWS EC2",
    shortDescription:
      "Configuration et déploiement d'un serveur web Apache sur AWS EC2 avec gestion des accès et sécurité réseau.",
    description:
      "Mise en place d'un serveur web Apache sur AWS EC2 avec configuration réseau, accès SSH sécurisé et déploiement d'application.",
    image: "../public/assets/ec2.png",
    technologies: ["AWS EC2", "Linux", "Apache", "SSH"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    slug: "ci-cd-pipeline",
    title: "Pipeline CI/CD avec GitHub Actions",
    shortDescription:
      "Automatisation du build, test et déploiement continu d'une application web grâce à GitHub Actions.",
    description:
      "Automatisation du build, des tests et du déploiement continu grâce à GitHub Actions pour améliorer la livraison logicielle.",
    image: "../public/assets/CI-CD.png",
    technologies: ["GitHub Actions", "CI/CD", "Automation", "DevOps"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    slug: "laravel-app",
    title: "Application Laravel",
    shortDescription:
      "Développement d'une plateforme de gestion de livres avec Laravel, architecture MVC et interface moderne.",
    description:
      "Développement d'une plateforme web basée sur Laravel avec architecture MVC, gestion des utilisateurs et interface moderne.",
    image: "../public/assets/laravel.png",
    technologies: ["Laravel", "PHP", "MySQL", "MVC"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    slug: "cloudwatch-monitoring",
    title: "Monitoring AWS CloudWatch",
    shortDescription:
      "Mise en place du monitoring des performances EC2 avec CloudWatch et notifications automatiques via SNS.",
    description:
      "Configuration du monitoring AWS CloudWatch avec alertes SNS pour surveiller les performances des instances EC2.",
    image: "../public/assets/cloudWatch.png",
    technologies: ["CloudWatch", "AWS SNS", "Monitoring", "AWS"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

/**
 * Retourne tous les projets
 * @returns {Array} liste des projets
 */
export function getAllProjects() {
  return [...projects];
}

/**
 * Retourne un projet par son slug
 * @param {string} slug
 * @returns {Object|null}
 */
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

/**
 * Retourne un projet par son id
 * @param {number} id
 * @returns {Object|null}
 */
export function getProjectById(id) {
  return projects.find((p) => p.id === Number(id)) || null;
}

/**
 * Ajoute un nouveau projet (simulation — en prod, appel API)
 * @param {Object} projectData
 * @returns {Object} projet créé
 */
export function addProject(projectData) {
  const newProject = {
    id: projects.length + 1,
    slug: projectData.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
    ...projectData,
    technologies: projectData.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };
  projects.push(newProject);
  return newProject;
}