// socketConfig.js
export default function configureSockets(io) {
    io.on('connection', (socket) => {
        console.log('Un usuario se ha conectado');

        socket.on('mensaje-chat', (mensaje) => {
            console.log(`Un usuario ha mandado un mensaje: ${mensaje}`);
            io.emit('mensaje-servidor', mensaje);
        });

        socket.on('disconnect', () => {
            console.log('Un usuario se ha desconectado');
        });
    });
}
