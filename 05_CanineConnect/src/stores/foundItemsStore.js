import { defineStore } from "pinia";
import { useFirestore } from "vuefire";
import { collection, addDoc } from "firebase/firestore";

export const useFoundItemsStore = defineStore("foundItems", () => {
  const db = useFirestore();

  async function foundProduct(item) {
    await addDoc(collection(db, "itemFound"), item);
  }

  return {
    foundProduct,
  };
});
