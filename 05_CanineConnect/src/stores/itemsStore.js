// itemsStore
import { computed } from "vue";
import { defineStore } from "pinia";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import {
  collection,
  addDoc,
  query,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";
/* Definición de la tienda (store) de items */
export const useItemsStore = defineStore("itemsStore", () => {
  const db = useFirestore(); // Obtenemos una referencia a Firestore
  const storage = useFirebaseStorage(); // Obtenemos una referencia a Firebase Storage

  // Definimos una consulta para recuperar todos los documentos de la colección "items"
  const itemsQuery = query(collection(db, "items"));

  // Usamos `useCollection` para mantener una colección reactiva de items
  const itemsCollection = useCollection(itemsQuery);

  // Función para crear un nuevo item
  async function createItem(item) {
    try {
      await addDoc(collection(db, "items"), item); // Añadimos un nuevo documento (item) a la colección "items" en Firestore
    } catch (error) {
      console.error("Error al crear el item:", error); // Manejo de errores
    }
  }

  // Función para actualizar un item existente
  async function updateItem(docRef, item) {
    try {
      const docSnap = await getDoc(docRef); // Obtenemos los datos actuales del documento
      const oldData = docSnap.data(); // Almacenamos los datos actuales del documento

      const { image, url, ...values } = item; // Separar la imagen y la URL de los otros valores

      if (image.length) {
        if (oldData && oldData.image) {
          const oldImageRef = storageRef(storage, oldData.image); // Referencia a la imagen anterior en Firebase Storage
          await deleteObject(oldImageRef); // Eliminamos la imagen anterior de Firebase Storage
        }

        await updateDoc(docRef, {
          ...values,
          image: url.value, // Actualizamos el documento con la nueva imagen
        });
      } else {
        await updateDoc(docRef, values); // Actualizamos el documento sin cambiar la imagen
      }
    } catch (error) {
      console.error("Error al actualizar el item:", error); // Manejo de errores
    }
  }

  // Función para eliminar un item
  async function deleteItem(id) {
    if (confirm("Eliminar Producto")) {
      try {
        const docRef = doc(db, "items", id); // Creamos una referencia al documento que queremos eliminar
        const docSnap = await getDoc(docRef); // Obtenemos los datos actuales del documento
        const { image } = docSnap.data(); // Extraemos la URL de la imagen del documento
        const imageRef = storageRef(storage, image); // Creamos una referencia a la imagen en Firebase Storage

        await deleteDoc(docRef); // Eliminamos el documento de Firestore
        await deleteObject(imageRef); // Eliminamos la imagen de Firebase Storage
      } catch (error) {
        console.error("Error al eliminar el item:", error); // Manejo de errores
      }
    }
  }

  // Función para eliminar un item
  async function deleteItem(id) {
    if (confirm("Eliminar Producto")) {
      try {
        const docRef = doc(db, "items", id); // Creamos una referencia al documento que queremos eliminar
        const docSnap = await getDoc(docRef); // Obtenemos los datos actuales del documento
        const { image } = docSnap.data(); // Extraemos la URL de la imagen del documento
        const imageRef = storageRef(storage, image); // Creamos una referencia a la imagen en Firebase Storage

        await deleteDoc(docRef); // Eliminamos el documento de Firestore
        await deleteObject(imageRef); // Eliminamos la imagen de Firebase Storage
      } catch (error) {
        console.error("Error al eliminar el item:", error); // Manejo de errores
      }
    }
  }

  // Propiedad computada para verificar si no hay resultados
  const noResults = computed(() => itemsCollection.value.length === 0); // Computed property para verificar si no hay resultados

  return {
    createItem,
    updateItem,
    deleteItem,
    itemsCollection,
    noResults,
  };
});
