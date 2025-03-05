import { Server } from 'socket.io';
import socketManager from "./socket/socketManager.js";

const io = new Server({
  cors: {
    origin: ['http://localhost:3001'],
  }
});

socketManager(io);

io.listen(3000);