// useDog.js
import { api } from "../boot/axios";
import { ref } from "vue";

export default function useDog() {
  const datos = ref([]);
  const options = ref([]);
  const selectedBreed = ref("");
  const todosLosPerros = ref([]);
  const spinner = ref(false);
  const favoritos = ref([]);

  const fetchData = async () => {
    const key = import.meta.env.VITE_API_KEY;
    spinner.value = true;
    try {
      const { data } = await api.get("/breeds", {
        headers: {
          "x-api-key": key,
        },
      });
      todosLosPerros.value = data;
      datos.value = data;
      obterneRazas();
      spinner.value = false;
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
    console.log(datos.value);
  };

  const obtener = async () => {
    await fetchData();
  };

  const obterneRazas = () => {
    if (datos.value && datos.value.length > 0) {
      const razasUnicas = [
        ...new Set(datos.value.map((raza) => raza.breed_group)),
      ]
        .filter((raza) => raza !== undefined && raza !== "")
        .map((raza) => ({
          label: raza,
          value: raza,
        }));

      options.value = razasUnicas;
    }
  };
  const perrosMismaRaza = () => {
    const breedValue = selectedBreed.value ? selectedBreed.value.value : null;

    if (breedValue) {
      return todosLosPerros.value.filter(
        (dog) => dog.breed_group?.toLowerCase() === breedValue.toLowerCase()
      );
    } else {
      return [];
    }
  };

  const anadirFavoritos = (id) => {
    // Verificar si el perro ya está en la lista de favoritos
    const perroExiste = favoritos.value.find((perro) => perro.id === id);
    if (!perroExiste) {
      const favoritoSeleccionado = todosLosPerros.value.find(
        (perro) => perro.id === id
      );
      favoritos.value.push(favoritoSeleccionado);
    } else {
      // Si el perro ya está en la lista, puedes mostrar un mensaje o realizar otra acción si es necesario
      console.log("El perro ya está en la lista de favoritos.");
    }
    console.log(favoritos.value)
  };

  return {
    datos,
    options,
    selectedBreed,
    todosLosPerros,
    perrosMismaRaza,
    obtener,
    spinner,
    anadirFavoritos,
    favoritos
  };
}
