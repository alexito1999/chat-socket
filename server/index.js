import express from 'express';

import logger from 'morgan';

import { Server } from 'socket.io';
import { createServer } from 'node:http';
// Importar módulos necesarios

// Importa utilidades para manejar rutas y archivos
import path from 'path';
// Importa funciones para obtener la ruta del archivo actual en módulos ES
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import configureSockets from './socketConfig.js';


// Obtiene el nombre del archivo actual y su directorio (equivalente a __dirname en CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT ?? 3000;

// Crea una instancia de Express
const app = express();
// Importa el módulo http y Socket.IO
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

// Configura Socket.IO
const socketConfig = configureSockets(io);

// Crear servidor HTTP

app.use(logger('dev'));

// Sirve archivos estáticos desde la carpeta client
app.use(express.static(path.join(__dirname, '..', 'client')));


// Maneja la ruta raíz para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
})

// Maneja la ruta /socket.io para servir el cliente de Socket.IO
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
