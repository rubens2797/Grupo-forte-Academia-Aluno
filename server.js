const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Cria o app express
const app = express();
const server = http.createServer(app);

// Configura o Socket.io
const io = new Server(server);

// Serve arquivos estáticos (como seu HTML)
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    // Evento para escutar mensagens enviadas pelo cliente
    socket.on('chat message', (msg) => {
        console.log('Mensagem: ' + msg);

        // Envia a mensagem para todos os usuários conectados
        io.emit('chat message', msg);
    });

    // Quando o usuário desconecta
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

// Inicia o servidor
server.listen(3000, () => {
    console.log('Servidor ouvindo na porta 3000');
});
