const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Manejar la conexión de un cliente
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Manejar el evento 'enviarDatos' recibido del cliente
  socket.on('enviarDatos', (data) => {
    console.log('Datos recibidos del cliente:', data);
    // Enviar los datos recibidos a todos los clientes conectados
    io.emit('datosRecibidos', data);
  });

  // Manejar la desconexión de un cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
