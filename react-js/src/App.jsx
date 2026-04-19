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
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />
            <main className="flex-1">
                <Routes>
                    <Route path="/"                   element={<Home />} />
                    <Route path="/projets"            element={<Dossier />} />
                    {/* /ajouter AVANT /:id pour éviter le conflit */}
                    <Route path="/projets/ajouter"    element={<AjouterProjet />} />
                    <Route path="/projets/:id/editer" element={<EditerProjet />} />
                    <Route path="/projets/:id"        element={<DetaillerProjet />} />
                    <Route path="/contact"            element={<Contact />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}