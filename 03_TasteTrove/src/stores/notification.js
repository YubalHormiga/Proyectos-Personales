import { defineStore } from 'pinia'
import { ref, watch } from "vue";
export const useNotificationStore = defineStore('notification', () => {

  const show = ref(false);
  const message = ref("");

  watch(show, () => {
    if (show.value) {
      setTimeout(() => {
        show.value = false;
        message.value = ''
      }, 3000); // 3 segundos
    }
  })

  return {
    show,
    message,
  }
})

