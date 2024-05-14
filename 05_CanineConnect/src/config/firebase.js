import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBuhxpJ_RQVJ0H_3Zoj9OAWARfifDq5MxI",
    authDomain: "canineconnect-1ac8a.firebaseapp.com",
    projectId: "canineconnect-1ac8a",
    storageBucket: "canineconnect-1ac8a.appspot.com",
    messagingSenderId: "708751281535",
    appId: "1:708751281535:web:04dca3c3d0d6c81cc75e4a"
};

// Inicializar la aplicación Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Inicializar el objeto auth
export const auth = getAuth();
