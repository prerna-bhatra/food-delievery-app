// backend/socket.js
const socketIo = require('socket.io');
const axios = require('axios');

const socketHandler = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('sendMessage', async (message) => {
            try {
                const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
                    sender: 'user',
                    message: message
                });
                socket.emit('botReply', response.data);
            } catch (error) {
                console.error('Error sending message to Rasa:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = socketHandler;
