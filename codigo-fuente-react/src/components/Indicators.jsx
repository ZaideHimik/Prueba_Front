import { useEffect, useState } from 'react'
import axios from 'axios'

function Indicators() {
  const [indicadores, setIndicadores] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get('https://mindicador.cl/api')
      .then((response) => {
        setIndicadores(response.data)
        setCargando(false)
      })
      .catch(() => {
        setError('No se pudieron cargar los indicadores.')
        setCargando(false)
      })
  }, [])

  function formatearValor(valor) {
    return new Intl.NumberFormat('es-CL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(valor)
  }

  const items = indicadores
    ? [
        { nombre: 'UF', valor: indicadores.uf.valor, color: 'violet' },
        { nombre: 'UTM', valor: indicadores.utm.valor, color: 'blue' },
        { nombre: 'Dólar', valor: indicadores.dolar.valor, color: 'green' },
        { nombre: 'Euro', valor: indicadores.euro.valor, color: 'orange' }
      ]
    : []

  return (
    <div className="indicators-widget">
      <div className="section-heading">
        <p className="section-eyebrow">Mercado chileno</p>
        <h2>Indicadores económicos</h2>
      </div>

      {cargando && <p className="weather-status">Cargando indicadores...</p>}
      {error && <p className="form-error">{error}</p>}

      {indicadores && (
        <div className="indicators-grid">
          {items.map((item) => (
            <article key={item.nombre} className={`indicator-card indicator-${item.color}`}>
              <span className="indicator-name">{item.nombre}</span>
              <strong className="indicator-value">${formatearValor(item.valor)}</strong>
              <p className="indicator-caption">Valor de referencia actualizado desde la API.</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Indicators