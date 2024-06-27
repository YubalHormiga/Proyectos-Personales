// authStore
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { useFirebaseAuth, useFirestore } from "vuefire";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useErrorHandling } from "../composables/useErrorHandling";

export const useAuthStore = defineStore("auth", () => {
  const auth = useFirebaseAuth(); // Usar VueFireAuth para obtener la referencia de auth
  const db = useFirestore();
  const router = useRouter();
  const toast = inject("toast");
  const { errorMessage, handleErrorMessage } = useErrorHandling();

  // State
  const userData = ref(null);
  const isLoggedIn = ref(false);
  const isAdmin = ref(false);

  // Actions
  const register = async (email, password, displayName) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: displayName,
      });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName,
        isAdmin: false,
      });
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
  const handleAuthSuccess = async (user) => {
    userData.value = {
      email: user.email,
      uid: user.uid,
      displayName: user.displayName || "",
    };
    router.push({ name: "home" });
    isLoggedIn.value = true;

    const userRef = doc(db, "users", user.uid);
    const snapShot = await getDoc(userRef);
    if (snapShot.exists()) {
      const userData = snapShot.data();
      isAdmin.value = userData.isAdmin || false;
    } else {
      isAdmin.value = false;
    }
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
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      userData.value = {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName || "",
      };
      isLoggedIn.value = true;

      const userRef = doc(db, "users", user.uid);
      const snapShot = await getDoc(userRef);
      if (snapShot.exists()) {
        const userData = snapShot.data();
        isAdmin.value = userData.isAdmin || false;
      } else {
        isAdmin.value = false;
      }
    } else {
      userData.value = null;
      isLoggedIn.value = false;
      isAdmin.value = false;
    }
  });

  return { userData, register, login, logoutUser, isLoggedIn, isAdmin };
});
