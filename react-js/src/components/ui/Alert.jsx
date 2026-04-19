export default function Alert({ type = 'error', children }) {
    const icons = { error: 'fa-exclamation-circle', success: 'fa-check-circle', info: 'fa-info-circle' }
    return (
        <div className={`alert alert-${type}`}>
            <i className={`fas ${icons[type]}`} />
            {children}
        </div>
    )
}