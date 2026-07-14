function BitacoraList({ bitacoras, onEliminarBitacora, onEditarBitacora }) {
  return (
    <div className="bitacora-list-wrap">
      <div className="section-heading">
        <p className="section-eyebrow">Historial guardado</p>
        <h2>Listado de bitácoras</h2>
        <p className="section-copy">
          Revisa, edita o elimina los registros que hayas creado en tu panel.
        </p>
      </div>

      {bitacoras.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-title">No hay bitácoras registradas.</p>
          <p className="empty-state-text">
            Cuando guardes una visita, aparecerá aquí con sus datos.
          </p>
        </div>
      ) : (
        <div className="bitacora-grid">
          {bitacoras.map((bitacora) => (
            <article key={bitacora.id} className="bitacora-card">
              <div className="bitacora-card-top">
                <span className="bitacora-badge">{bitacora.fecha}</span>
              </div>

              <h3 className="bitacora-nickname">{bitacora.nickname}</h3>

              <div className="bitacora-meta">
                <p>
                  <strong>Fecha:</strong> {bitacora.fecha}
                </p>
                <p>
                  <strong>Comentario:</strong>
                </p>
                <p className="bitacora-comment">{bitacora.comentario}</p>
              </div>

              <div className="bitacora-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => onEditarBitacora(bitacora)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="danger-btn"
                  onClick={() => onEliminarBitacora(bitacora.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default BitacoraList