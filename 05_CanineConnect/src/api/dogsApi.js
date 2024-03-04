// En api/dogApi.js
import { ref } from "vue";
import  api  from "../lib/axios.js";

const dogData = ref([]);
const breedoptions = ref([]);
const allDogs = ref([]);
const loadingspinner = ref(false);

const fetchData = async () => {
  loadingspinner.value = true;
  try {
    const data = await fetchDogData();
    console.log(data)
    updateDogDataAndBreeds(data);
    loadingspinner.value = false;
  } catch (error) {
    handleFetchError(error);
  }
};

const fetchDogData = async () => {
  const key = import.meta.env.VITE_API_KEY;
  const { data } = await api.get("/breeds", {
    headers: {
      "x-api-key": key,
    },
  });
  return data;
};

const updateDogDataAndBreeds = (data) => {
  allDogs.value = data;
  dogData.value = data;
  updateBreedsOptions();
};

const updateBreedsOptions = () => {
  if (dogData.value && dogData.value.length > 0) {
    const uniqueBreeds = getUniqueBreeds();
    breedoptions.value = uniqueBreeds;
  }
};

const getUniqueBreeds = () => {
  return [...new Set(dogData.value.map((raza) => raza.breed_group))]
    .filter((raza) => raza !== undefined && raza !== "")
    .map((raza) => ({
      label: raza,
      value: raza,
    }));
};

const handleFetchError = (error) => {
  console.error("Error al obtener datos de perros:", error);
  // Puedes lanzar una excepción aquí o manejar el error de otra manera
  throw new Error("Error al obtener datos de perros");
};

export { fetchData, dogData, allDogs, breedoptions };
