// useLocationMap ok
import { ref } from "vue";

export default function useLocationMap() {
  const zoom = ref(17);
  const center = ref([41.4087724, 2.2018116]);
  const userLocation = ref(null);
  function pin(e) {
    const marker = e.target.getLatLng(); // Esta funcion es una de las leaflet par obtener l as cordenadas
    center.value = [marker.lat, marker.lng];
  }

  function getUserLocation() {
    if (navigator.geolocation) {
      // Si el navegador soporta geolocalización
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Callback cuando se obtiene la ubicación del usuario
          userLocation.value = [
            position.coords.latitude,
            position.coords.longitude,
          ]; // Actualiza la ubicación del usuario
          center.value = userLocation.value; // Actualiza el centro del mapa con la ubicación del usuario
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error.message); // Manejo de errores
        }
      );
    } else {
      console.error("Tu navegador no soporta geolocalización.");
    }
  }
  return {
    zoom,
    center,
    pin,
    getUserLocation,
  };
}
