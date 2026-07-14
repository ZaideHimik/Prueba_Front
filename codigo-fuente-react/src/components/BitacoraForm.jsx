import { useEffect, useState } from 'react'

function BitacoraForm({
  onAgregarBitacora,
  bitacoraEditando,
  onActualizarBitacora,
  mensajeExito
}) {
  const [fecha, setFecha] = useState('')
  const [nickname, setNickname] = useState('')
  const [comentario, setComentario] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (bitacoraEditando) {
      setFecha(bitacoraEditando.fecha)
      setNickname(bitacoraEditando.nickname)
      setComentario(bitacoraEditando.comentario)
    }
  }, [bitacoraEditando])

  function manejarSubmit(e) {
    e.preventDefault()

    if (!fecha || !nickname || !comentario) {
      setError('Todos los campos son obligatorios.')
      return
    }

    if (nickname.trim().length < 3) {
      setError('El nickname debe tener al menos 3 caracteres.')
      return
    }

    if (comentario.trim().length < 5) {
      setError('El comentario debe tener al menos 5 caracteres.')
      return
    }

    if (bitacoraEditando) {
      const bitacoraActualizada = {
        id: bitacoraEditando.id,
        fecha,
        nickname,
        comentario
      }

      onActualizarBitacora(bitacoraActualizada)
    } else {
      const nuevaBitacora = {
        id: Date.now(),
        fecha,
        nickname,
        comentario
      }

      onAgregarBitacora(nuevaBitacora)
    }

    setFecha('')
    setNickname('')
    setComentario('')
    setError('')
  }

  return (
    <div className="bitacora-form-wrap">
      <div className="section-heading">
        <p className="section-eyebrow">Gestión de visitas</p>
        <h2>Registrar bitácora</h2>
        <p className="section-copy">
          Guarda una visita con fecha, nickname y comentario para llevar un historial rápido.
        </p>
      </div>

      <form className="bitacora-form" onSubmit={manejarSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="fecha">Fecha de visita</label>
            <input
              id="fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="nickname">Nickname</label>
            <input
              id="nickname"
              type="text"
              placeholder="Ej: ZaideHimik"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="comentario">Comentario</label>
          <textarea
            id="comentario"
            placeholder="Escribe una nota breve sobre la visita..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>

        {error && <p className="form-error">{error}</p>}
        {mensajeExito && <p className="form-success">{mensajeExito}</p>}

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            {bitacoraEditando ? 'Actualizar bitácora' : 'Guardar bitácora'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BitacoraForm