import { Server } from 'socket.io';
import { MessageService } from './message/message.service';

let io: Server;

export const initSocketIo = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    //console.log('a user connected');
    const jwt = socket.handshake.auth.token;
    // kazkaip susitvarkyti, kad nevykdytu, kai nera prisiloginta....
    const userData = jwt ? JSON.parse(atob(jwt.split('.')[1])) : null;
    const user = jwt ? userData.username : null;

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (message) => {
      // Broadcast to all other clients except the sender
      socket.broadcast.emit('message', {
        user: user,
        message: message,
        date: Date.now(),
      });

      // Emit back to the sender
      socket.emit('message', {
        user: user,
        message: message,
        date: Date.now(),
      });
    });
  });

  return io;
};

export const getSocketIo = (): Server => {
  if (!io) {
    throw new Error('Socket.io instance not initialized');
  }
  return io;
};
