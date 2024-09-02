//useInspiringStore

import { query } from "firebase/database";
import { addDoc, collection } from "firebase/firestore";
import { defineStore } from "pinia";
import { useCollection, useFirestore } from "vuefire";

export const useStoryStore = defineStore("inspiring", () => {
  //Obtenemos referencia
  const db = useFirestore();

  // Definimos una consulta para recuperar todos los documentos de la colección "items"
  const storiesQuery = query(collection(db, "storys"));

  // Usamos `useCollection` para mantener una colección reactiva de items
  const storiesCollection = useCollection(storiesQuery);

  //Función para crear una hisoria
  async function createStory(story) {
    try {
      await addDoc(collection(db, "storys"), story);
    } catch (error) {
      console.log(error);
    }
  }

  return { createStory, storiesCollection };
});
