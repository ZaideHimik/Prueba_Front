// Se ejecuta cuando el HTML ya está cargado
document.addEventListener('DOMContentLoaded', function () {
    actualizarMensajeBienvenida();
});

// Calcula según la hora si es mañana, tarde o noche
function obtenerSaludoSegunHora() {
    const ahora = new Date();
    const hora = ahora.getHours(); // 0-23

    if (hora >= 6 && hora < 12) {
        return 'Buenos días, gamer 👾';
    } else if (hora >= 12 && hora < 20) {
        return 'Buenas tardes, gamer 🎮';
    } else {
        return 'Buenas noches, gamer 🌙';
    }
}

// Inserta el saludo en el párrafo con id "mensaje-bienvenida"
function actualizarMensajeBienvenida() {
    const parrafoBienvenida = document.getElementById('mensaje-bienvenida');
    if (!parrafoBienvenida) return; // por seguridad

    const saludo = obtenerSaludoSegunHora();
    parrafoBienvenida.textContent = saludo;
}
