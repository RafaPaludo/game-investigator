import Room from "../classes/Room.js";
import { generateShortRoomCode } from "../utils/generateShortRoomCode.js";

class RoomService {
  constructor() {
    this.rooms = new Map(); // Mapeia códigos de salas para objetos Room
  }

  createRoom(owner) {
    const code = generateShortRoomCode();
    const newRoom = new Room(code, owner);
    this.rooms.set(code, newRoom);
    return newRoom;
  }

  getRoom(code) {
    return this.rooms.get(code) || null;
  }

  removeRoom(code) {
    this.rooms.delete(code);
  }
}

export default new RoomService();
