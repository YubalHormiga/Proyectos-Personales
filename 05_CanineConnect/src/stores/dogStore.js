/* UseDogsStore*/
import { ref } from "vue";
import { defineStore } from "pinia";

export const UseDogsStore = defineStore("dogs", () => {
  const dogsData = ref([]);

  return {
    dogsData,
  };
});
