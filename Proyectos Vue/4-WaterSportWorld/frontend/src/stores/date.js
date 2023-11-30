import { ref } from 'vue';
import { defineStore } from 'pinia';
import { parse, formatISO, parseISO, format } from 'date-fns'
import es from 'date-fns/locale/es'


export const useDateStore = defineStore('date', () => {
  const formattedDate = ref('');

  function updateFormattedDate(newFormattedDate) {
    formattedDate.value = newFormattedDate;
  }


  function convertToISO(strDate) {
    const newDate = parse(strDate, 'dd/MM/yyyy', new Date())
    return formatISO(newDate)
  }
  function displayDate(date) {
    const newDate = parseISO(date)
    const formattedDate = format(newDate, 'PPPP',{locale:es})
    return formattedDate
}
  return {
    formattedDate,
    updateFormattedDate,
    convertToISO,
    displayDate
  };
});
