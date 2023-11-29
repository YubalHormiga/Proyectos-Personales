import { ref } from 'vue';
import { defineStore } from 'pinia';
import { parse, formatISO } from 'date-fns'


export const useDateStore = defineStore('date', () => {
  const formattedDate = ref('');
  
  function updateFormattedDate(newFormattedDate) {
    formattedDate.value = newFormattedDate;
  }
  
  
  function convertToISO(strDate){
      const newDate = parse(strDate, 'dd/MM/yyyy', new Date())
      return formatISO(newDate)
  }
  return {
    formattedDate,
    updateFormattedDate,
    convertToISO
  };
});
