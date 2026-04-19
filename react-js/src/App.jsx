import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Dossier from './components/Dossier.jsx'
import DetaillerProjet from './components/DetaillerProjet.jsx'
import AjouterProjet from './components/AjouterProjet.jsx'
import EditerProjet from './components/EditerProjet.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/projets"        element={<Dossier />} />
        <Route path="/projets/:id"    element={<DetaillerProjet />} />
        <Route path="/projets/ajouter" element={<AjouterProjet />} />
        <Route path="/projets/:id/editer" element={<EditerProjet />} />
        <Route path="/contact"        element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}