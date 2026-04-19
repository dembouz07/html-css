import { useNavigate } from 'react-router-dom'

export default function Projet({ project, onDelete }) {
    const navigate = useNavigate()

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
            {/* Image */}
            <div className="overflow-hidden h-52">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.target.src = `https://placehold.co/400x200/3b82f6/white?text=${encodeURIComponent(project.title)}` }}
                />
            </div>

            <div className="p-6">
                {/* Titre — ancre cliquable */}
                <h3
                    className="font-syne font-bold text-xl text-gray-800 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => navigate(`/projets/${project.id}`)}
                    title="Voir le détail"
                >
                    {project.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{project.shortDescription}</p>

                {/* Badges technologies */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {(project.technologies || []).slice(0, 3).map(tech => (
                        <span key={tech} className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-semibold">
              {tech}
            </span>
                    ))}
                </div>

                {/* Boutons */}
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => navigate(`/projets/${project.id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center gap-1.5"
                    >
                        <i className="fas fa-eye" /> Voir
                    </button>
                    <button
                        onClick={() => navigate(`/projets/${project.id}/editer`)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition flex items-center gap-1.5"
                    >
                        <i className="fas fa-pen" /> Modifier
                    </button>
                    <button
                        onClick={() => onDelete(project)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition flex items-center gap-1.5"
                    >
                        <i className="fas fa-trash" /> Supprimer
                    </button>
                </div>
            </div>
        </div>
    )
}