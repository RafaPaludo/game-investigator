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
            v-model="userStore.username"
            label="Nome"
          />
          
          <v-btn
            class="mt-2"
            type="submit"
            block
            :disabled="!userStore.username"
            @click="enterRoom"
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
// Imports
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useRoom } from '@/composables/room';
import { useUserStore } from '@/stores/userStore'
import type { SocketApiResponse } from '@/types/api';

// Data
const router = useRouter()
const route = useRoute()
const { getRoom } = useRoom()
const userStore = useUserStore();
const snackbar = ref(false);
const snackBarText = ref('');

// Functions
/**
 * Função para entrar na sala.
 */
 const enterRoom = () => {
  const roomCode = typeof(route.params.code) === 'string' ? route.params.code : '';

  getRoom(roomCode, (response: SocketApiResponse) => {
      if (response.status === "error") {
        snackbar.value = true;
        snackBarText.value = response.message || "Sala não encontrada."; // Exibir erro para o usuário
      } else {
        router.push({ name: 'room', params: { code: roomCode } });
      }
  });
}
</script>
