// usePagination.js
import { ref, computed, watch } from "vue";
import { UseDogsStore } from "../stores/dogStore.js";

// Importar el módulo de la tienda de perros
const dogs = UseDogsStore();
const dogsToShow = ref([]);
const itemsPerPage = 10;
const currentPage = ref(1);

export default function usePagination() {
  // Actualizar la lista de perros a mostrar en función de la paginación
  const updateDogsToShow = (page) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const dogsShown = dogs.selectedBreed.value
      ? dogs.dogsSameBreed()
      : dogs.dogData;

    const totalItems = dogsShown.length;

    if (startIdx >= totalItems) {
      currentPage.value = 1;
      return;
    }

    dogsToShow.value = dogsShown.slice(startIdx, endIdx);
  };

  // Calcular el número total de páginas en función de los perros a mostrar
  const totalPages = computed(() => {
    const dogsShown = dogs.selectedBreed.value
      ? dogs.dogsSameBreed()
      : dogs.dogData;

    return Math.ceil(dogsShown.length / itemsPerPage);
  });

  return {
    dogsToShow,
    updateDogsToShow,
    itemsPerPage,
    currentPage,
    totalPages,
  };
}
