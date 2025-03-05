<template>
  <v-container>
    <h1>P.I.</h1>
    <v-card>
      <v-card-title>Você foi convidado</v-card-title>
      
      <v-avatar color="info">
        <v-icon icon="mdi-account-circle" />
      </v-avatar>

      <v-sheet
        class="mx-auto"
        width="300"
      >
        <v-form @submit.prevent>
          <v-text-field
            v-model="username"
            label="Nome"
          />
          
          <v-btn
            class="mt-2"
            type="submit"
            block
            @click="joinRoom"
          >
            Entrar na Sala
          </v-btn>
        </v-form>
      </v-sheet>
    </v-card>

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

<script lang="ts" setup>
interface socketResponse {
  success?: boolean;
  roomCode?: string;
  error?: string;
  message?: string;
}

// Imports
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useSocket } from '@/composables/socket'

// Data
const router = useRouter()
const route = useRoute()
const { socket } = useSocket()
const username = ref('');
const snackbar = ref(false);
const snackBarText = ref('');

// Functions
/**
 * Função para entrar na sala.
 */
const joinRoom = () => {
  socket.emit(
    'join-room',
    { roomCode: route.params.code, username: username.value },
    (response: socketResponse) => {
      if (response.error) {
        snackbar.value = true;
        snackBarText.value = response.message || "Sala não encontrada."; // Exibir erro para o usuário
      } else {
        router.push({ name: 'room', params: { code: route.params.code } });
      }
  });
}
</script>
