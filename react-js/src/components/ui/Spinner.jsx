export default function Spinner({ text = 'Chargement…' }) {
    return (
        <div className="loading">
            <div className="spinner" />
            <span>{text}</span>
        </div>
    )
}