import RoomService from "../services/RoomService.js";
import Player from "../classes/Player.js";

export default function socketManager(io) {
  io.on("connection", (socket) => {
    console.log("Novo jogador conectado:", socket.id);

    // Room
    socket.on("create-room", ( { username }, callback) => {
      const player = new Player(socket.id, username);
      const room = RoomService.createRoom(player);
      
      callback({ status: "success", data: { roomCode: room.code } });
    });

    socket.on("join-room", ({ roomCode, username }, callback) => {
      const room = RoomService.getRoom(roomCode);

      if (!room) return callback({ status: "error", message: "Sala não encontrada" });

      const player = new Player(socket.id, username);
      const added = room.addPlayer(player);

      if (added) {
        socket.join(roomCode);
        io.to(roomCode).emit("update-room", room); // Notifica a sala inteira

        return callback({ status: "success" });
      }

      callback({ status: "error", message: "Sala cheia" });
    });

    socket.on("leave-room", ({ roomCode }) => {
      const room = RoomService.getRoom(roomCode);

      if (room) {
        room.removePlayer(socket.id);
        io.to(roomCode).emit("update-room", room); // Notifica a sala inteira
      }
    });

    socket.on("get-room", ({ roomCode }, callback) => {
      const room = RoomService.getRoom(roomCode);

      if (room) {
        callback({ status: "success", data: { roomCode: room.code } });
      }
      callback({ status: "error", message: "Sala não encontrada." });
    });

    // Game
    socket.on("start-game", ({ roomCode }) => {
      
    });

    // Disconect
    socket.on("disconnect", () => {
      console.log("Jogador desconectado:", socket.id);
    });
  });
}
