/* useDogBreedsStore */
import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchData } from "@/api/DogsAPI.js"; 

export const useDogBreedsStore  = defineStore("dogs", () => {
  const dogBreedsData = ref([]);

  const fetchDogBreedsData = async () => {
    dogBreedsData.value = await fetchData();
  };

  return {
    dogBreedsData,
    fetchDogBreedsData,
  };
});

