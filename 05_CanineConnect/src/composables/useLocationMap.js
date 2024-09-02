// useLocationMap ok
import { ref } from "vue";

export default function useLocationMap() {
  const zoom = ref(17);
  const center = ref([41.4087724, 2.2018116]);
  const userLocation = ref(null);

  const pin = (e) => {
    const { lat, lng } = e.target.getLatLng();
    center.value = [lat, lng];
  };

  const updateLocation = (position) => {
    userLocation.value = [position.coords.latitude, position.coords.longitude];
    center.value = userLocation.value;
  };

  const handleError = (error) => {
    console.error("Error al obtener la ubicación:", error.message);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation, handleError);
    } else {
      console.error("Tu navegador no soporta geolocalización.");
    }
  };

  return {
    zoom,
    center,
    pin,
    getUserLocation,
  };
}

