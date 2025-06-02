const socket = io(); // Esto conecta automáticamente al servidor actual
2
// Ejemplo: puedes escuchar eventos
socket.on('connect', () => {
    console.log('Conectado al servidor de sockets');
});

// Escuchar mensajes enviados por otros usuarios y mostrarlos en el chat
socket.on('mensaje-servidor', (mensaje) => {
    generarMensajes(mensaje);
    console.log('Mensaje recibido del servidor:', mensaje);
});

const form = document.getElementById('messageForm');
const input = document.getElementById('messageInput');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    if (input.value) {
        // Envía el mensaje al servidor
        socket.emit('mensaje-chat', input.value);
        console.log('Mensaje enviado:', input.value);
        input.value = ''; // Limpia el campo de entrada
    }
});

function estructuraMensaje(mensaje) {
    const mensajesContainer = document.createElement('article');
    mensajesContainer.setAttribute('class', 'chatContainer');
    const mensajeElement = document.createElement('div');
    mensajeElement.textContent = mensaje;
    mensajeElement.setAttribute('class', 'messages');
    mensajesContainer.appendChild(mensajeElement);
    return mensajesContainer;
}

function generarMensajes(mensaje) {
    const chatSection = document.getElementById('chatSection');
    const mensajesContainer = estructuraMensaje(mensaje);
    chatSection.appendChild(mensajesContainer);

}