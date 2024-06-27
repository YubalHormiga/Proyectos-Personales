import { defineStore } from "pinia";
import { useCollection, useFirestore, useFirebaseStorage } from "vuefire";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  query,
  updateDoc,
} from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";


export const useLostDogsStore = defineStore("lostDogs", () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();

  const lostDogstQuery = query(collection(db, "lostDogs"));
  const lostDogsCollection = useCollection(lostDogstQuery);

  const addLostDog = async (dog) => {
    try {
      await addDoc(collection(db, "lostDogs"), dog);
      console.log(dog);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para actualizar una mascota existente
  async function updateLostDog(docRef, dog) {
    try {
      const docSnap = await getDoc(docRef); // Obtenemos los datos actuales del documento
      const oldData = docSnap.data(); // Almacenamos los datos actuales del documento

      const { image, url, ...values } = dog; // Separar la imagen y la URL de los otros valores

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


  const deleteLostDog = async (id) => {
    try {
      const docRef = doc(db, "lostDogs", id);

      const docSnap = await getDoc(docRef); // Obtenemos los datos actuales del documento
      const { image } = docSnap.data(); // Extraemos la URL de la imagen del documento
      const imageRef = storageRef(storage, image); // Creamos una referencia a la imagen en Firebase Storage

      await deleteDoc(docRef);
      await deleteObject(imageRef);
    } catch (error) {
      console.log(error);
    }
  };

  return { addLostDog, lostDogsCollection,updateLostDog, deleteLostDog };
});
