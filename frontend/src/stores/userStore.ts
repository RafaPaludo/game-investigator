import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const username = ref('');
  const id = ref('');

  function setUsername(name: string) {
    username.value = name;
  }

  function setId(newId: string) {
    id.value = newId;
  }

  return { username, id, setUsername, setId };
})