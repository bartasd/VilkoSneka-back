import { Server } from 'socket.io';

let io: Server;

export const initSocketIo = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (message) => {
      console.log(message);
      socket.emit('message', `${message} from server...`);
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
