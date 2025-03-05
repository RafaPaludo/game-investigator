<template>
  <v-container>
    <v-row no-gutters>
      <v-btn @click="goBack">Voltar</v-btn>
    </v-row>

    <v-row no-gutters>
      <h2>Game room {{ props.code }}</h2>
    </v-row>

    <v-row no-gutters>
      <v-col
        cols="12"
        sm="3"
      >
        <v-card>
          <v-card-title>
            Jogadores {{ players.length }} / 5
          </v-card-title>
    
          <v-card-text
            v-for="player in players"
            :key="player.id"
          >
            {{ player.username }}
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col
        cols="12"
        sm="9"
      >
        <v-sheet class="ma-2 pa-2">
          <v-btn @click="initGame">Iniciar</v-btn>
        </v-sheet>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar"
    >
      {{ snackBarText }}

      <template #actions>
        <v-btn
          color="red"
          variant="text"
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSocket } from '@/composables/socket'
import { useRouter, useRoute } from 'vue-router'
import { useRoom } from '@/composables/room';
import { useGame } from '@/composables/game';
import { useUserStore } from '@/stores/userStore';
import type { SocketApiResponse } from '@/types/api';
import type { Room } from '@/types/room';
import type { Player } from '@/types/player';

// Data
const { socket } = useSocket()
const { joinRoom, updateRoom } = useRoom()
const { startGame } = useGame();
const userStore = useUserStore();
const router = useRouter()
const route = useRoute()
const players = ref<Player[]>([]);
const snackbar = ref(false);
const snackBarText = ref('');

// Props
const props = defineProps({
  code: { type: String, required: true }
})

// Computed

// Functions
const goBack = () => {
  socket.emit("leave-room", { roomCode: props.code });
  router.push("/");
}

const initGame = () => {
  startGame(props.code, (response: SocketApiResponse) => {
    if (response.status === 'error') {
      snackbar.value = true;
      snackBarText.value = response.message || "Houve algum problema ao entrar iniciar o jogo!"; // Exibir erro para o usuário
    }

    router.push({ name: 'game', params: { code: props.code } });
  });
};

onMounted(() => {
  if (!socket.id) {
    return router.push({ name: 'guest', params: { code: route.params.code } });
  }

  updateRoom((room: Room) => players.value = room?.players || []);

  joinRoom(props.code, userStore.username, (response: SocketApiResponse) => {
    if (response.status === 'error') {
      snackbar.value = true;
      snackBarText.value = response.message || "Houve algum problema ao entrar na sala!"; // Exibir erro para o usuário
    }
  });
});

onUnmounted(() => {
  socket.emit("leave-room", { roomCode: props.code });
});
</script>