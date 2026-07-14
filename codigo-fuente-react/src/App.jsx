import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Weather from './components/Weather'
import Indicators from './components/Indicators'
import BitacoraForm from './components/BitacoraForm'
import BitacoraList from './components/BitacoraList'

function App() {
  const [bitacoras, setBitacoras] = useState(() => {
    const datosGuardados = localStorage.getItem('bitacoras')
    return datosGuardados ? JSON.parse(datosGuardados) : []
  })

  const [bitacoraEditando, setBitacoraEditando] = useState(null)
  const [mensajeExito, setMensajeExito] = useState('')

  useEffect(() => {
    localStorage.setItem('bitacoras', JSON.stringify(bitacoras))
  }, [bitacoras])

  useEffect(() => {
    if (!mensajeExito) return

    const timer = setTimeout(() => {
      setMensajeExito('')
    }, 3000)

    return () => clearTimeout(timer)
  }, [mensajeExito])

  function agregarBitacora(nuevaBitacora) {
    setBitacoras([...bitacoras, nuevaBitacora])
    setMensajeExito('Bitácora guardada correctamente.')
  }

  function eliminarBitacora(id) {
    const nuevasBitacoras = bitacoras.filter((bitacora) => bitacora.id !== id)
    setBitacoras(nuevasBitacoras)
    setMensajeExito('Bitácora eliminada correctamente.')
  }

  function editarBitacora(bitacora) {
    setBitacoraEditando(bitacora)
    setMensajeExito('')
  }

  function actualizarBitacora(bitacoraActualizada) {
    const nuevasBitacoras = bitacoras.map((bitacora) =>
      bitacora.id === bitacoraActualizada.id ? bitacoraActualizada : bitacora
    )

    setBitacoras(nuevasBitacoras)
    setBitacoraEditando(null)
    setMensajeExito('Bitácora actualizada correctamente.')
  }

  return (
    <div className="app-shell">
      <main id="panel" className="page embedded-page">
        <section className="hero embedded-hero">
          <div className="hero-content">
            <Header
              titulo="Información en vivo"
              descripcion="Consulta clima, indicadores económicos y registra visitas en tu bitácora de comentarios."
            />
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel-card">
            <Weather />
          </div>

          <div className="panel-card">
            <Indicators />
          </div>
        </section>

        <section id="bitacora" className="bitacora-section">
          <div className="panel-card">
            <BitacoraForm
              onAgregarBitacora={agregarBitacora}
              bitacoraEditando={bitacoraEditando}
              onActualizarBitacora={actualizarBitacora}
              mensajeExito={mensajeExito}
            />
          </div>

          <div className="panel-card">
            <BitacoraList
              bitacoras={bitacoras}
              onEliminarBitacora={eliminarBitacora}
              onEditarBitacora={editarBitacora}
            />
          </div>
        </section>
      </main>
    </div>
)
}

export default App