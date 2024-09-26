import app from "./app";
import dotenv from "dotenv";
import http from "http";
import { Server, Socket } from "socket.io";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const PORT = process.env.PORT || 57002;
const allowedOrigins = ['http://localhost:5173', 'http://localhost:8081'];

// Appliquer helmet pour la sécurité HTTP
// app.use(helmet());

// // Limiter les requêtes
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limite chaque IP à 100 requêtes par fenêtre
// });
// app.use(limiter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});
const connectedUsers = new Set<string>();
// const IGNORED_URL = 'http://localhost:5173'; 

const updateUserCount = () => {
  io.emit('userCountUpdate', connectedUsers.size);
};
// Écoute des connexions Socket.IO
io.on('connection', (socket: Socket) => {

  const clientId = socket.id
  console.log('🔥 ====> ClientId:', 
    typeof clientId === 'string' ? clientId :
    Array.isArray(clientId) ? clientId[0] :
    clientId === undefined ? 'undefined' :
    JSON.stringify(clientId));

  const referer = socket.handshake.headers.referer as string;
  // if (referer && referer.includes(IGNORED_URL)) {
  //   console.log(`Ignoring connection from: ${referer}`);
  //   return; // Ne pas compter cette connexion
  // }
  if (!connectedUsers.has(clientId as string)) {
    connectedUsers.add(clientId as string);
    console.log(`User connected: ${clientId}. Total: ${connectedUsers.size}`);
    updateUserCount();
  } else {
    console.log(`Existing user reconnected: ${clientId}. Total: ${connectedUsers.size}`);
  }
  

  console.log(`Nouvelle connexion: ${socket.id}. Total: ${connectedUsers}`);

  socket.on('disconnect', () => {
    if (connectedUsers.has(clientId as string)) {
      connectedUsers.delete(clientId as string);
      console.log(`User disconnected: ${clientId}. Total: ${connectedUsers.size}`);
      updateUserCount();
    }
  });

  // Limiter les événements par socket
  const socketLimiter = new Map();
  socket.use(([event, ...args], next) => {
    if (!socketLimiter.has(event)) {
      socketLimiter.set(event, 0);
    }
    const count = socketLimiter.get(event);
    if (count > 10) {
      return next(new Error('Trop de requêtes'));
    }
    socketLimiter.set(event, count + 1);
    setTimeout(() => socketLimiter.set(event, count - 1), 1000);
    next();
  });
});

server.listen(PORT, () => {
  console.log(`Serveur HTTP sécurisé en cours d'exécution sur le port ${PORT}`);
});

export { io };
