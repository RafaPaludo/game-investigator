import { useSocket } from '@/composables/socket';
import type { SocketApiResponse } from '@/types/api';
import type { Room } from '@/types/room';

export function useRoom() {
  const { socket } = useSocket()

  const getRoom = (roomCode: string, callback: (res: SocketApiResponse) => void) => {
    socket.emit('get-room', { roomCode }, callback);
  }

  const createRoom = (username: string, callback: (res: SocketApiResponse) => void) => {
    socket.emit('create-room', { username }, callback);
  };

  const joinRoom = (roomCode: string, username: string, callback: (res: SocketApiResponse) => void) => {
    socket.emit('join-room', { roomCode, username }, callback);
  }

  const updateRoom = (callback: (res: Room) => void) => {
    socket.on("update-room", callback);
  };

  return {
    getRoom,
    createRoom,
    joinRoom,
    updateRoom
  }
}
