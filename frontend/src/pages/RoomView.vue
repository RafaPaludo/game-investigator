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
            Jogadores 1 / 5
          </v-card-title>
    
          <v-card-text>
            {{ players }}
            Jogador 1
            Jogador 2
            Jogador 3
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col
        cols="12"
        sm="9"
      >
        <v-sheet class="ma-2 pa-2">
          Configs
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSocket } from '@/composables/socket'
import { useRouter, useRoute } from 'vue-router'
interface socketResponse {
  success?: boolean;
  roomCode?: string;
  error?: string;
  message?: string;
}

// Data
const { socket } = useSocket()
const router = useRouter()
const route = useRoute()
const players = ref([])

// Props
const props = defineProps({
  code: { type: String, required: true }
})

// Functions
const goBack = () => {
  socket.emit("leave-room", { roomCode: props.code });
  router.push("/");
}

onMounted(() => {
  if (!socket.id) {
    return router.push({ name: 'guest', params: { code: route.params.code } });
  }

  socket.on("update-room", (data) => {
    console.log(data);
    players.value = data.players
  });

  socket.emit("join-room", { roomCode: props.code }, (response: socketResponse) => {
    if (response.error) {
      console.log("Erro")
    } else {
      console.log("Sucesso")
    }
  });
});

onUnmounted(() => {
  socket.emit("leave-room", { roomCode: props.code });
});
</script>