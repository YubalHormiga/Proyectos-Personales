import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useDateStore = defineStore('date', () => {
  const formattedDate = ref('');

  function updateFormattedDate(newFormattedDate) {
    formattedDate.value = newFormattedDate;
  }

  return {
    formattedDate,
    updateFormattedDate,
  };
});
