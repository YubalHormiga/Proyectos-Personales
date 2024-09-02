// useErrorHandling
import { ref } from "vue";

export const useErrorHandling = () => {
  const errorMessage = ref("");

  const errorMessages = {
    "auth/invalid-email": "El correo electrónico proporcionado es inválido.",
    "auth/user-disabled": "La cuenta de usuario ha sido deshabilitada.",
    "auth/user-not-found":
      "No se encontró ninguna cuenta de usuario asociada a este correo electrónico.",
    "auth/wrong-password": "La contraseña proporcionada es incorrecta.",
    "auth/email-already-in-use": "El correo electrónico ya está en uso.",
    "auth/weak-password": "La contraseña es débil.",
    "auth/operation-not-allowed":
      "El inicio de sesión con correo electrónico y contraseña no está habilitado en este momento.",
    "auth/invalid-credential": "Las credenciales proporcionadas son inválidas.",
  };

  const handleErrorMessage = (error) => {
    errorMessage.value = errorMessages[error.code] || error.message;
  };

  return { errorMessage, handleErrorMessage };
};
