// useErrorHandling
import { ref } from "vue";

export const useErrorHandling = () => {
  const errorMessage = ref("");

  const handleErrorMessage = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage.value = "El correo electrónico proporcionado es inválido.";
        break;
      case "auth/user-disabled":
        errorMessage.value = "La cuenta de usuario ha sido deshabilitada.";
        break;
      case "auth/user-not-found":
        errorMessage.value = "No se encontró ninguna cuenta de usuario asociada a este correo electrónico.";
        break;
      case "auth/wrong-password":
        errorMessage.value = "La contraseña proporcionada es incorrecta.";
        break;
      case "auth/email-already-in-use":
        errorMessage.value = "El correo electrónico ya está en uso.";
        break;
      case "auth/weak-password":
        errorMessage.value = "La contraseña es débil.";
        break;
      case "auth/operation-not-allowed":
        errorMessage.value = "El inicio de sesión con correo electrónico y contraseña no está habilitado en este momento.";
        break;
      case "auth/invalid-credential":
        errorMessage.value = "Las credenciales proporcionadas son inválidas.";
        break;
      default:
        errorMessage.value = error.message;
    }
  };

  return { errorMessage, handleErrorMessage };
};
