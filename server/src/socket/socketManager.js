import RoomService from "../services/RoomService.js";
import Player from "../classes/Player.js";

export default function socketManager(io) {
  io.on("connection", (socket) => {
    console.log("Novo jogador conectado:", socket.id);

    socket.on("create-room", ( { username }, callback) => {
      const player = new Player(socket.id, username);
      const room = RoomService.createRoom(player);
      
      callback({ success: true, roomCode: room.code });
    });

    socket.on("join-room", ({ roomCode, username }, callback) => {
      const room = RoomService.getRoom(roomCode);

      if (!room) return callback({ error: true, message: "Sala não encontrada" });

      const player = new Player(socket.id, username);
      const added = room.addPlayer(player);

      if (added) {
        socket.join(roomCode);
        io.to(roomCode).emit("update-room", { players: room.players }); // Notifica a sala inteira

        return callback({ success: true });
      }

      callback({ error: true, message: "Sala cheia" });
    });

    socket.on("leave-room", ({ roomCode }) => {
      const room = RoomService.getRoom(roomCode);

      if (room) {
        room.removePlayer(socket.id);
        io.to(roomCode).emit("update-room", { players: room.players });
      }
    });

    socket.on("get-room", ({ roomCode }, callback) => {
      const room = RoomService.getRoom(roomCode);

      if (room) {
        callback({ success: true, roomCode: room.code });
      }
      callback({ error: true, message: "Sala não encontrada." });
    });

    socket.on("disconnect", () => {
      console.log("Jogador desconectado:", socket.id);
    });
  });
}
