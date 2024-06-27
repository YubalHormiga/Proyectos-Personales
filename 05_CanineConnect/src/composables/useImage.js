// useImage

import { ref, computed } from "vue";
import { useFirebaseStorage } from "vuefire"; // Importamos vuefire para trabajar con Firebase Storage
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"; // Importamos funciones de Firebase Storage
import { uid } from "uid"; // Importamos uid para generar identificadores únicos

const spinner = ref(false); // Definimos una referencia reactiva para el spinner

export default function useImage(directory) {
  const url = ref(""); // Definimos una referencia reactiva para la URL de la imagen
  const storage = useFirebaseStorage(); // Obtenemos una referencia a Firebase Storage

  const onFileChange = (e) => {
    const file = e.target.files[0]; // Obtenemos el primer archivo seleccionado
    const filename = uid() + ".jpg"; // Generamos un nombre de archivo único
    const sRef = storageRef(storage, directory + filename); // Creamos una referencia de almacenamiento en Firebase Storage

    // Subir el archivo
    const uploadTask = uploadBytesResumable(sRef, file); // Iniciamos la subida del archivo
    spinner.value = true; // Activamos el spinner durante la subida

    uploadTask.on(
      "state_changed",
      () => {}, // Podemos agregar un manejador para el progreso si lo deseamos
      (error) => {
        console.log(error); // Registramos el error en la consola
        spinner.value = false; // Apagamos el spinner en caso de error
      },
      () => {
        // La imagen ya se subió
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          url.value = downloadURL; // Asignamos la URL de descarga a la referencia reactiva
          spinner.value = false; // Apagamos el spinner cuando la subida finaliza
        });
      }
    );
  };

  const isImageUploaded = computed(() => {
    return url.value ? url.value : null; // Computed property que indica si la imagen se ha subido
  });

  return {
    url, // URL de la imagen subida
    onFileChange, // Función para manejar el cambio de archivo
    isImageUploaded, // Computed property que indica si la imagen se ha subido
    spinner, // Estado del spinner
  };
}
