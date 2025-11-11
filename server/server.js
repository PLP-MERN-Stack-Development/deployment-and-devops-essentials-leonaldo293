// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import bugRoutes from './routes/bugRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000', // Use .env para produção
        methods: ['GET', 'POST']
    }
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// --- Dados do chat em memória ---
const chatUsers = {};
const chatMessages = {};
const chatTypingUsers = {};
const messageReactions = {};
const messageReadStatus = {};
const messageDeliveryStatus = {};

// --- Socket.io Namespace ---
const chatNamespace = io.of('/chat');

chatNamespace.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // JOIN USER
    socket.on('user_join', (username) => {
        chatUsers[socket.id] = { username, rooms: [] };
        chatNamespace.emit('user_joined', { username });
    });

    // JOIN ROOM
    socket.on('join_room', (roomName) => {
        socket.join(roomName);
        if (!chatUsers[socket.id].rooms.includes(roomName)) {
            chatUsers[socket.id].rooms.push(roomName);
        }
        if (!chatMessages[roomName]) chatMessages[roomName] = [];
        chatNamespace.to(roomName).emit('user_joined_room', { username: chatUsers[socket.id].username, room: roomName });
    });

    // SEND MESSAGE
    socket.on('send_message', (data) => {
        const senderUsername = chatUsers[socket.id] ? .username || 'Anonymous';
        const message = {
            id: Date.now(),
            sender: senderUsername,
            message: data.message,
            room: data.room || null,
            timestamp: new Date().toISOString()
        };
        const room = data.room || 'global';
        if (!chatMessages[room]) chatMessages[room] = [];
        chatMessages[room].push(message);
        if (chatMessages[room].length > 100) chatMessages[room].shift();
        if (data.room) chatNamespace.to(data.room).emit('receive_message', message);
        else chatNamespace.emit('receive_message', message);
    });

    // DISCONNECT
    socket.on('disconnect', () => {
        const user = chatUsers[socket.id];
        if (user) {
            user.rooms.forEach(room => {
                chatNamespace.to(room).emit('user_left_room', { username: user.username, room });
            });
            chatNamespace.emit('user_left', { username: user.username });
            delete chatUsers[socket.id];
        }
        Object.keys(chatTypingUsers).forEach(room => {
            if (chatTypingUsers[room]) delete chatTypingUsers[room][socket.id];
        });
        console.log(`User disconnected: ${socket.id}`);
    });
});

// --- Rotas REST ---
app.use('/api/bugs', bugRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Server is healthy' });
});

// Centralized error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Something went wrong!' });
});

// --- MongoDB Atlas Connection ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

export { app, server, io };