import { defineStore} from "pinia";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import {
  collection,
  addDoc,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { computed } from "vue";

export const useItemsStore = defineStore("items", () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();
  //Creamos la collecion
  async function createItem(item) {
    await addDoc(collection(db, "items"), item);
  }

  //Recuperamos los items
  const q = query(collection(db, "items"));
  const itemsCollection = useCollection(q);

  //Actualizamos
  async function updateItem(docRef, item) {
    // Obtener datos actuales del documento
    const docSnap = await getDoc(docRef);
    const oldData = docSnap.data();

    // Datos a actualizar
    const { image, url, ...values } = item;

    // Si hay una nueva imagen, eliminar la anterior
    if (image.length) {
      // Eliminar la imagen anterior de Firebase Storage
      if (oldData && oldData.image) {
        const oldImageRef = storageRef(storage, oldData.image);
        await deleteObject(oldImageRef);
      }

      // Actualizar el documento con la nueva imagen
      await updateDoc(docRef, {
        ...values,
        image: url.value,
      });
    } else {
      // Actualizar el documento sin cambiar la imagen
      await updateDoc(docRef, values);
    }
  }

  // Elimiamos items
  async function deleteProduct(id) {
    if (confirm("Eliminar Producto")) {
      const docRef = doc(db, "items", id);
      const docSnap = await getDoc(docRef);
      const { image } = docSnap.data();
      const imageRef = storageRef(storage, image);

      deleteDoc(docRef);
      deleteObject(imageRef);
    }
  }

  const noResults = computed(()=> itemsCollection.value.length === 0)
  return {
    createItem,
    updateItem,
    deleteProduct,
    itemsCollection,
    noResults
  };
});
