# Guide des Tests Unitaires

Ce guide explique comment exécuter les tests unitaires pour le backend et le frontend.

---

## 📦 Installation des Dépendances

### Backend (Express.js)

```bash
cd express-js
npm install
```

Cela installera:
- `jest` - Framework de test
- `supertest` - Pour tester les API HTTP
- `@types/jest` - Types TypeScript pour Jest

### Frontend (React)

```bash
cd react-js
npm install
```

Les dépendances de test sont déjà incluses avec `create-react-app`:
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`

---

## 🧪 Exécution des Tests

### Backend

```bash
cd express-js

# Exécuter tous les tests avec couverture
npm test

# Exécuter les tests en mode watch (développement)
npm run test:watch
```

**Résultats attendus:**
- Tests des contrôleurs (CRUD projets)
- Génération du rapport de couverture dans `express-js/coverage/`
- Fichier LCOV: `express-js/coverage/lcov.info`

### Frontend

```bash
cd react-js

# Exécuter tous les tests avec couverture
npm test

# Exécuter les tests en mode watch (développement)
npm run test:watch
```

**Résultats attendus:**
- Tests des composants React
- Tests des services
- Génération du rapport de couverture dans `react-js/coverage/`
- Fichier LCOV: `react-js/coverage/lcov.info`

---

## 📊 Rapports de Couverture

### Visualiser les Rapports Localement

#### Backend
```bash
cd express-js
npm test
# Ouvrir le rapport HTML
open coverage/lcov-report/index.html  # macOS
start coverage/lcov-report/index.html # Windows
xdg-open coverage/lcov-report/index.html # Linux
```

#### Frontend
```bash
cd react-js
npm test
# Ouvrir le rapport HTML
open coverage/lcov-report/index.html  # macOS
start coverage/lcov-report/index.html # Windows
xdg-open coverage/lcov-report/index.html # Linux
```

### Dans SonarQube

Les fichiers `lcov.info` sont automatiquement lus par SonarQube lors de l'analyse:
- Backend: `express-js/coverage/lcov.info`
- Frontend: `react-js/coverage/lcov.info`

---

## 📝 Structure des Tests

### Backend (`express-js/`)

```
express-js/
├── src/
│   ├── controllers/
│   │   ├── projectController.js
│   │   └── __tests__/
│   │       └── projectController.test.js
│   ├── models/
│   ├── routes/
│   └── middleware/
├── jest.config.js
└── package.json
```

**Tests inclus:**
- ✅ `getAllProjects()` - Récupération de tous les projets
- ✅ `getProjectById()` - Récupération d'un projet par ID
- ✅ `createProject()` - Création d'un nouveau projet
- ✅ `updateProject()` - Mise à jour d'un projet
- ✅ `deleteProject()` - Suppression d'un projet
- ✅ Gestion des erreurs (404, validation, etc.)

### Frontend (`react-js/`)

```
react-js/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── __tests__/
│   │       └── Navbar.test.jsx
│   ├── services/
│   │   ├── projectService.js
│   │   └── __tests__/
│   │       └── projectService.test.js
│   └── pages/
└── package.json
```

**Tests inclus:**
- ✅ Composant Navbar - Affichage et navigation
- ✅ Service projets - Toutes les opérations CRUD
- ✅ Gestion des erreurs API

---

## 🔄 Intégration avec Jenkins

Les tests sont automatiquement exécutés dans le pipeline Jenkins. Vous pouvez ajouter un stage de tests avant le build:

```groovy
stage('Run Tests') {
    steps {
        script {
            // Tests Backend
            dir('express-js') {
                sh 'npm ci'
                sh 'npm test'
            }
            
            // Tests Frontend
            dir('react-js') {
                sh 'npm ci'
                sh 'npm test'
            }
        }
    }
}
```

---

## 📈 Métriques de Couverture

### Objectifs de Couverture

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

### Configuration Jest (Backend)

La configuration dans `jest.config.js` définit:
- Fichiers à inclure: `src/**/*.js`
- Fichiers à exclure: `**/*.test.js`, `**/*.spec.js`
- Formats de rapport: `text`, `lcov`, `html`

### Configuration React (Frontend)

React Scripts gère automatiquement la configuration Jest avec:
- Support JSX/React
- Transformations Babel
- Mocks automatiques

---

## 🐛 Dépannage

### Problème: "Cannot find module"

**Solution:**
```bash
# Backend
cd express-js
rm -rf node_modules package-lock.json
npm install

# Frontend
cd react-js
rm -rf node_modules package-lock.json
npm install
```

### Problème: Tests qui échouent

**Vérifications:**
1. Les dépendances sont installées: `npm install`
2. La version de Node.js est compatible (>= 18)
3. Les mocks sont correctement configurés

### Problème: Couverture non générée

**Solution:**
```bash
# Backend
cd express-js
npm test -- --coverage --verbose

# Frontend
cd react-js
npm test -- --coverage --watchAll=false
```

---

## 📚 Ressources

### Documentation

- **Jest**: https://jestjs.io/
- **React Testing Library**: https://testing-library.com/react
- **Supertest**: https://github.com/visionmedia/supertest

### Bonnes Pratiques

1. **Écrire des tests lisibles** - Utilisez des descriptions claires
2. **Tester les cas limites** - Erreurs, valeurs nulles, etc.
3. **Isoler les tests** - Chaque test doit être indépendant
4. **Utiliser des mocks** - Pour les dépendances externes
5. **Maintenir une bonne couverture** - Viser > 80%

---

## ✅ Checklist

Avant de commiter:

- [ ] Tous les tests passent localement
- [ ] La couverture est > 80%
- [ ] Les nouveaux fichiers ont des tests
- [ ] Les tests sont documentés
- [ ] Les mocks sont appropriés

---

**Les tests sont maintenant configurés et prêts à être exécutés!** 🎉
