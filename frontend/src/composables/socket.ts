import { io } from "socket.io-client";
import { ref } from "vue";

const socket = io("http://localhost:3000", {
  autoConnect: false, // Conexão manual
  reconnection: true, // Permite reconectar automaticamente
  reconnectionAttempts: 5, // Tenta reconectar até 5 vezes
  reconnectionDelay: 3000 // Espera 3s entre as tentativas
});

const isConnected = ref(false);

export function useSocket() {
  const connect = () => {
    if (!isConnected.value) {
      socket.connect();
      isConnected.value = true;

      socket.on("connect", () => {
        console.log("Socket conectado:", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("Socket desconectado.");
        isConnected.value = false;
      });
    }
  };

  const disconnect = () => {
    if (isConnected.value) {
      socket.disconnect();
      isConnected.value = false;
    }
  };

  return {
    socket,
    connect,
    disconnect
  };
}
