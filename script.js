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
    } else if (hora >= 12 && hora < 18) {
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

// ==============================
// VALIDACIÓN FORMULARIO SUSCRIPCIÓN
// ==============================

document.addEventListener('DOMContentLoaded', function () {
    actualizarMensajeBienvenida();
    inicializarCambioTema();
    inicializarFormularioSuscripcion(); // <-- añadimos esta línea
});

// Inicializa la lógica del formulario
function inicializarFormularioSuscripcion() {
    const form = document.getElementById('form-suscripcion');
    if (!form) return;

    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const inputEdad = document.getElementById('edad');
    const inputTerminos = document.getElementById('terminos');
    const btnSuscribir = document.getElementById('btn-suscribir');

    const errorNombre = document.getElementById('error-nombre');
    const errorEmail = document.getElementById('error-email');
    const errorEdad = document.getElementById('error-edad');
    const errorTerminos = document.getElementById('error-terminos');

    // Función que valida todo el formulario
    function validarFormulario() {
        let esValido = true;

        // Validar nombre
        if (!inputNombre.value.trim()) {
            errorNombre.textContent = 'Por favor ingresa tu nombre.';
            inputNombre.classList.add('input-error');
            esValido = false;
        } else {
            errorNombre.textContent = '';
            inputNombre.classList.remove('input-error');
        }

        // Validar email con expresión regular simple
        const emailValor = inputEmail.value.trim();
        const patronEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

        if (!emailValor) {
            errorEmail.textContent = 'El correo es obligatorio.';
            inputEmail.classList.add('input-error');
            esValido = false;
        } else if (!patronEmail.test(emailValor)) {
            errorEmail.textContent = 'Ingresa un correo válido.';
            inputEmail.classList.add('input-error');
            esValido = false;
        } else {
            errorEmail.textContent = '';
            inputEmail.classList.remove('input-error');
        }

        // Validar edad
        const edadNumero = Number(inputEdad.value);

        if (!inputEdad.value) {
            errorEdad.textContent = 'Ingresa tu edad.';
            inputEdad.classList.add('input-error');
            esValido = false;
        } else if (isNaN(edadNumero) || edadNumero < 18) {
            errorEdad.textContent = 'Debes ser mayor de 18 años.';
            inputEdad.classList.add('input-error');
            esValido = false;
        } else {
            errorEdad.textContent = '';
            inputEdad.classList.remove('input-error');
        }

        // Validar términos
        if (!inputTerminos.checked) {
            errorTerminos.textContent = 'Debes aceptar los términos.';
            esValido = false;
        } else {
            errorTerminos.textContent = '';
        }

        // Habilitar o deshabilitar botón
        btnSuscribir.disabled = !esValido;
    }

    // Escuchamos cambios en los campos
    inputNombre.addEventListener('input', validarFormulario);
    inputEmail.addEventListener('input', validarFormulario);
    inputEdad.addEventListener('input', validarFormulario);
    inputTerminos.addEventListener('change', validarFormulario);

    // Evitar envío real del formulario y mostrar mensaje
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        validarFormulario();

        if (!btnSuscribir.disabled) {
            alert('¡Gracias por suscribirte a ClaveGamer!');
            form.reset();
            btnSuscribir.disabled = true;
        }
    });
}
