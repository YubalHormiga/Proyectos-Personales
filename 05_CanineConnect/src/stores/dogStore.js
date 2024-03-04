// store dogStore.js
import { ref } from "vue";
import { defineStore } from "pinia";

// Importar funciones y datos desde dogApi.js
import { fetchData, dogData, allDogs } from "../api/dogsApi.js";

export const UseDogsStore = defineStore("dogs", () => {
  // Definir referencias reactivas específicas para este módulo de la tienda
  const selectedBreed = ref("");
  const favorites = ref([]);

  // Función para iniciar la obtención de datos de perros
  const getData = async () => {
    try {
      await fetchData();
    } catch (error) {
      // Manejar errores en la obtención de datos
      console.error("Error al obtener datos de perros:", error);
      // Manejar el error de otra manera
      throw new Error("Error al obtener datos de perros");
    }
  };

  // Función para obtener los perros de la misma raza que la raza seleccionada
  const dogsSameBreed = () => {
    const breedValue = selectedBreed.value ? selectedBreed.value : null;

    if (breedValue) {
      // Filtrar los perros por la raza seleccionada
      return allDogs.value.filter(
        (dog) => dog.breed_group?.toLowerCase() === breedValue.toLowerCase()
      );
    } else {
      return [];
    }
  };

  // Función para añadir un perro a la lista de perros favoritos
  const addToFavorites = (id) => {
    // Verificar si el perro ya existe en la lista de favoritos
    const dogExists = favorites.value.find((dog) => dog.id === id);

    if (!dogExists) {
      // Si no existe, añadir el perro a la lista de favoritos
      const selectedFavorite = allDogs.value.find((dog) => dog.id === id);
      favorites.value.push(selectedFavorite);
    } else {
      // Si ya existe, mostrar un mensaje en la consola
      console.log("El perro ya está en la lista de favoritos.");
    }

    console.log(favorites.value);
  };

  return {
    dogData,
    selectedBreed,
    allDogs,
    dogsSameBreed,
    getData,
    addToFavorites,
    favorites,
  };
});
