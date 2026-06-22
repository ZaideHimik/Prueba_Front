// Se ejecuta cuando el HTML ya está cargado
document.addEventListener('DOMContentLoaded', function () {
    actualizarMensajeBienvenida();
    inicializarCambioTema();
});

// Inicializa el botón que cambia el tema claro/oscuro
function inicializarCambioTema() {
    const botonTema = document.getElementById('boton-tema');
    if (!botonTema) return;

    botonTema.addEventListener('click', function () {
        toggleTema(botonTema);
    });
}

// Alterna la clase en <body> y el texto del botón
function toggleTema(botonTema) {
    document.body.classList.toggle('tema-claro');

    const usandoTemaClaro = document.body.classList.contains('tema-claro');

    if (usandoTemaClaro) {
        botonTema.textContent = 'Cambiar a tema oscuro';
    } else {
        botonTema.textContent = 'Cambiar a tema claro';
    }
}
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
