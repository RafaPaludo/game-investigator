<template>
  <v-container>
    <h1>P.I.</h1>
    <v-card>
      <v-card-title>Play</v-card-title>
      
      <v-avatar color="info">
        <v-icon icon="mdi-account-circle" />
      </v-avatar>

      <v-sheet
        class="mx-auto"
        width="300"
      >
        <v-form @submit.prevent>
          <v-text-field
            v-model="userStore.username"
            label="Nome"
          />
          
          <v-text-field
            v-model="roomCode"
            label="Sala"
          />

          <v-btn
            class="mt-2"
            type="submit"
            block
            :disabled="!roomCode"
            @click="enterRoom"
          >
            Entrar na Sala
          </v-btn>

          <v-btn
            class="mt-2"
            type="submit"
            block
            :disabled="!userStore.username"
            @click="createNewRoom"
          >
            Criar nova Sala
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
// Imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoom } from '@/composables/room';
import type { SocketApiResponse } from '@/types/api';
import { useUserStore } from '@/stores/userStore'

// Data
const router = useRouter()
const userStore = useUserStore();
const { getRoom, createRoom } = useRoom()
const roomCode = ref('');
const snackbar = ref(false);
const snackBarText = ref('');

// Functions
/**
 * Função para entrar na sala.
 */
const enterRoom = () => {
  getRoom(roomCode.value, (response: SocketApiResponse) => {
      if (response.status === "error") {
        snackbar.value = true;
        snackBarText.value = response.message || "Sala não encontrada."; // Exibir erro para o usuário
      } else {
        router.push({ name: 'room', params: { code: roomCode.value } });
      }
  });
}

/**
 * Função para criar uma nova sala.
 */
const createNewRoom = () => {
  createRoom(userStore.username, (response: SocketApiResponse) => {
    if (response.status === "success" && response.data.roomCode) {
      roomCode.value = response.data.roomCode;
      enterRoom();
    }
  });
}
</script>
