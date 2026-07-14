import { useEffect, useMemo, useState } from 'react'

function Weather() {
  const [clima, setClima] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-20.2208&longitude=-70.1431&current=temperature_2m,wind_speed_10m'
    )
      .then((response) => response.json())
      .then((data) => {
        setClima(data.current)
        setCargando(false)
      })
      .catch(() => {
        setError('No se pudo cargar el clima.')
        setCargando(false)
      })
  }, [])

  const climaVisual = useMemo(() => {
    if (!clima) return null

    const temperatura = clima.temperature_2m
    const viento = clima.wind_speed_10m

    if (viento >= 25) {
      return {
        titulo: 'Viento fuerte',
        descripcion: 'Se siente una jornada movida en Iquique.',
        icono: 'viento'
      }
    }

    if (temperatura >= 24) {
      return {
        titulo: 'Clima cálido',
        descripcion: 'Buen momento para una jornada despejada y luminosa.',
        icono: 'sol'
      }
    }

    if (temperatura >= 18) {
      return {
        titulo: 'Clima templado',
        descripcion: 'Temperatura agradable con condiciones bastante estables.',
        icono: 'nube-sol'
      }
    }

    return {
      titulo: 'Clima fresco',
      descripcion: 'Conviene una jornada más abrigada y tranquila.',
      icono: 'nube'
    }
  }, [clima])

  function renderWeatherIcon(tipo) {
    if (tipo === 'sol') {
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="12" />
          <path d="M32 8v8M32 48v8M8 32h8M48 32h8M15 15l6 6M43 43l6 6M49 15l-6 6M21 43l-6 6" />
        </svg>
      )
    }

    if (tipo === 'viento') {
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M10 24h28c6 0 10-3 10-8s-4-8-8-8c-4 0-7 2-8 6" />
          <path d="M8 34h38c7 0 12 4 12 10s-5 10-10 10c-5 0-8-3-9-7" />
          <path d="M12 44h24" />
        </svg>
      )
    }

    if (tipo === 'nube-sol') {
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="24" cy="24" r="9" />
          <path d="M24 8v5M24 35v5M8 24h5M35 24h5M13 13l4 4M31 31l4 4" />
          <path d="M22 46h24a10 10 0 0 0 0-20 14 14 0 0 0-26-3A9 9 0 0 0 22 46Z" />
        </svg>
      )
    }

    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M22 46h24a10 10 0 0 0 0-20 14 14 0 0 0-26-3A9 9 0 0 0 22 46Z" />
      </svg>
    )
  }

  return (
    <div className="weather-widget">
      <div className="section-heading">
        <p className="section-eyebrow">Clima actual</p>
        <h2>Clima en Iquique</h2>
      </div>

      {cargando && <p className="weather-status">Cargando clima...</p>}
      {error && <p className="form-error">{error}</p>}

      {clima && climaVisual && (
        <div className="weather-card-inner">
          <div className="weather-hero">
            <div className="weather-icon">{renderWeatherIcon(climaVisual.icono)}</div>

            <div className="weather-summary">
              <h3>{climaVisual.titulo}</h3>
              <p>{climaVisual.descripcion}</p>
            </div>
          </div>

          <div className="weather-stats">
            <div className="weather-stat">
              <span className="weather-label">Temperatura</span>
              <strong>{clima.temperature_2m} °C</strong>
            </div>

            <div className="weather-stat">
              <span className="weather-label">Viento</span>
              <strong>{clima.wind_speed_10m} km/h</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Weather