/**
 * Modal.jsx
 * Modale de confirmation réutilisable.
 * Usage: <Modal title="..." message="..." onConfirm={fn} onCancel={fn} danger />
 */

export default function Modal({ title, message, onConfirm, onCancel, danger = false, confirmLabel = 'Confirmer' }) {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-icon">
                    <i className={`fas ${danger ? 'fa-trash' : 'fa-question-circle'}`} />
                </div>
                <h3 className="modal-title">{title}</h3>
                <p className="modal-text">{message}</p>
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Annuler
                    </button>
                    <button
                        className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`}
                        onClick={onConfirm}
                    >
                        <i className={`fas ${danger ? 'fa-trash' : 'fa-check'}`} /> {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}