import { useSocket } from '@/composables/socket';
import type { SocketApiResponse } from '@/types/api';

export function useGame() {
  const { socket } = useSocket()

  const startGame = (roomCode: string, callback: (res: SocketApiResponse) => void) => {
    socket.emit('start-game', { roomCode }, callback);
  };

  return {
    startGame
  }
}
