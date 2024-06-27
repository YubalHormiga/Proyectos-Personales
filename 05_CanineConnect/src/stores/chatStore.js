// chatStore 
import { computed } from "vue";
import { defineStore } from "pinia";
import { useCollection, useFirestore } from "vuefire";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  query,
  limit,
  orderBy,
  Timestamp,
} from "firebase/firestore";

export const useChatStore = defineStore("chatStore", () => {
  const db = useFirestore();

  // Define una consulta para recuperar todos los documentos de la colección "messages"
  const chatsQuery = query(collection(db, "messages"), orderBy("timestamp"));

  // Usa `useCollection` para mantener una colección reactiva de mensajes con una clave SSR manual
  const { data: messagesCollection } = useCollection(chatsQuery, {
    ssrKey: "chat-messages",
  });

  // Función para enviar un nuevo mensaje
  const sendMessage = async (message, displayName, uid) => {
    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        displayName: displayName, // Incluye el nombre del usuario
        uid: uid,
        timestamp: Timestamp.fromDate(new Date()), // Agrega el timestamp aquí
      });
    } catch (error) {
      console.error("Error al agregar documento: ", error);
    }
  };

  const deleteMessage = async (id) => {
    if (confirm("Eliminar mensaje")) {
      try {
        const docRef = doc(db, "messages", id);
        await deleteDoc(docRef);
      } catch (error) {
        console.log("Error al eliminar el item:", error);
      }
    }
  };
  // Propiedad computada para verificar si no hay mensajes
  const noResults = computed(() => {
    return messagesCollection.value.length === 0;
  });

  return { sendMessage, messagesCollection, noResults, deleteMessage };
});
