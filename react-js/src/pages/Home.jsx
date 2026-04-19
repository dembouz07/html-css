import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div>
            {/* ── HERO ──────────────────────────────────────────────── */}
            <section className="bg-gray-100 min-h-screen flex items-center pt-16">
                <div className="max-w-6xl mx-auto px-6 py-20 w-full">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        {/* Texte */}
                        <div>
                            <p className="text-blue-600 text-lg font-semibold mb-2">Bonjour, je suis</p>
                            <h1 className="font-syne font-bold text-5xl text-gray-900 mb-4 leading-tight">
                                Ousseynou Faye
                            </h1>
                            <h2 className="text-2xl text-gray-700 mb-6 font-normal leading-relaxed">
                                Apprenant AWS re/Start • Développeur Full Stack • Passionné de Cloud et DevOps
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                                Je conçois et développe des applications web modernes, robustes et évolutives.
                                Passionné par la résolution de problèmes, je transforme des idées en solutions
                                performantes en combinant développement logiciel, Cloud et DevOps.
                            </p>

                            {/* Réseaux sociaux */}
                            <div className="flex gap-6 mb-8 text-2xl">
                                <a href="#" className="text-gray-600 hover:text-black transition-colors"><i className="fab fa-github" /></a>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors"><i className="fab fa-linkedin" /></a>
                                <a href="mailto:fayeouz84@gmail.com" className="text-gray-600 hover:text-gray-900 transition-colors"><i className="fas fa-envelope" /></a>
                            </div>

                            {/* Boutons */}
                            <div className="flex gap-4 flex-wrap">
                                <button
                                    onClick={() => navigate('/projets')}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md flex items-center gap-2"
                                >
                                    <i className="fas fa-briefcase" /> Projets
                                </button>
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 text-gray-700"
                                >
                                    Contacter Moi
                                </button>
                            </div>
                        </div>

                        {/* Photo */}
                        <div className="flex justify-center">
                            <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-xl">
                                <img
                                    src="/assets/ouz.jpeg"
                                    alt="Photo Ousseynou Faye"
                                    className="w-full h-full object-cover"
                                    onError={e => { e.target.src = 'https://placehold.co/400x400/1e3a5f/white?text=OF' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── À PROPOS ─────────────────────────────────────────── */}
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6">

                    <div className="text-center mb-16">
                        <h2 className="font-syne font-bold text-4xl text-gray-900">À propos de moi</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <div className="relative">
                            <div className="absolute -right-4 -bottom-4 bg-blue-500 w-full h-full rounded-2xl opacity-10" />
                            <img
                                src="/assets/ouz.jpeg"
                                alt="Ousseynou Faye"
                                className="relative rounded-2xl shadow-lg w-full object-cover"
                                onError={e => { e.target.style.minHeight = '300px'; e.target.style.background = '#e5e7eb' }}
                            />
                        </div>

                        {/* Texte */}
                        <div>
                            <h3 className="font-syne font-semibold text-3xl text-gray-800 mb-6">Mon Parcours</h3>
                            <p className="text-gray-600 leading-relaxed mb-5">
                                Développeur logiciel passionné, je conçois et développe des applications modernes
                                en mettant l'accent sur la performance, la maintenabilité et l'expérience utilisateur.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-5">
                                Actuellement en formation <strong>AWS Cloud & DevOps (AWS re/Start)</strong> à Orange
                                Digital Center, je renforce mes compétences en cloud computing, automatisation,
                                intégration et déploiement continu.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Après avoir débuté en développement Front-End, j'ai évolué vers le Back-End et le
                                Full Stack, ce qui me permet aujourd'hui de concevoir des applications complètes,
                                du design jusqu'au déploiement dans le cloud.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}