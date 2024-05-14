import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useErrorHandling } from "../composables/useErrorHandling";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const toast = inject("toast");
  const { errorMessage, handleErrorMessage } = useErrorHandling();

  // State
  const userData = ref(null);
  const isLoggedIn = ref(false);

  // Actions
  const register = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      handleAuthSuccess(user);
      handleToastSuccess("¡Registro exitoso!");
    } catch (error) {
      handleErrorMessage(error);
      handleToastError();
    }
  };

  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess(user);
      handleToastSuccess("¡Inicio de sesión exitoso!");
    } catch (error) {
      handleErrorMessage(error);
      handleToastError();
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      router.push({ name: "login" });
      isLoggedIn.value = false;
      handleToastSuccess("Se ha cerrado sesión correctamente.");
    } catch (error) {
      handleErrorMessage(error);
      handleToastError();
    }
  };

  // Helper functions
  const handleAuthSuccess = (user) => {
    userData.value = { email: user.email, uid: user.uid };
    router.push({ name: "home" });
    isLoggedIn.value = true;
  };

  const handleToastError = () => {
    toast.open({
      message: errorMessage.value,
      type: "error",
    });
  };
  
  const handleToastSuccess = (message) => {
    toast.open({
      message: `${message}`,
      type: "success",
    });
  };

  // Verificar el estado de autenticación al cargar el store
  auth.onAuthStateChanged((user) => {
    if (user) {
      userData.value = { email: user.email, uid: user.uid };
      isLoggedIn.value = true;
    } else {
      userData.value = null;
      isLoggedIn.value = false;
    }
  });

  return { userData, register, login, logoutUser, isLoggedIn };
});
