//store UseDog.js
import { ref } from "vue";
import { defineStore } from "pinia";

export const UseDogsStore = defineStore("dogs", () => {
  const dogData = ref([]);
  const breedoptions = ref([]);
  const selectedBreed = ref("");
  const allDogs = ref([]);
  const loadingspinner = ref(false);
  const favorites = ref([]);

  // Función asincrónica para obtener los datos de las razas de perros desde la API
  const fetchData = async () => {
    // Obtener la clave de la API desde las variables de entorno
    const key = import.meta.env.VITE_API_KEY;

    // Activar el spinner de carga
    loadingspinner.value = true;

    try {
      // Realizar la solicitud a la API para obtener datos de razas de perros
      const { data } = await api.get("/breeds", {
        headers: {
          "x-api-key": key,
        },
      });

      // Almacenar los datos de perros y todas las razas de perros obtenidas
      allDogs.value = data;
      dogData.value = data;

      // Obtener y actualizar las opciones de razas de perros
      getBreeds();

      // Desactivar el spinner de carga
      loadingspinner.value = false;
    } catch (error) {
      // Manejar errores en la obtención de datos
      console.error("Error al obtener datos de perros:", error);
    }

    // Imprimir en la consola los datos de perros obtenidos
    console.log(dogData.value);
  };

  // Función para iniciar la obtención de datos de perros
  const getData = async () => {
    await fetchData();
  };

  // Función para obtener las razas únicas de perros y actualizar las opciones
  const getBreeds = () => {
    if (dogData.value && dogData.value.length > 0) {
      // Filtrar y mapear para obtener razas únicas como opciones
      const razasUnicas = [
        ...new Set(dogData.value.map((raza) => raza.breed_group)),
      ]
        .filter((raza) => raza !== undefined && raza !== "")
        .map((raza) => ({
          label: raza,
          value: raza,
        }));

      // Actualizar las opciones de razas de perros
      breedoptions.value = razasUnicas;
    }
  };

  // Función para obtener los perros de la misma raza que la raza seleccionada
  const dogsSameBreed = () => {
    console.log('hola')
    const breedValue = selectedBreed.value ? selectedBreed.value.value : null;
    console.log(breedValue);
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
    breedoptions,
    selectedBreed,
    allDogs,
    dogsSameBreed,
    getData,
    loadingspinner,
    addToFavorites,
    favorites,
  };
});
