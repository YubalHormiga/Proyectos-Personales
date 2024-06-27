// src/helpers/utils.js

export const limitCharacters = (data, field, maxLength) => {
    if (data[field].length > maxLength) {
      data[field] = data[field].substring(0, maxLength); // Limita los caracteres a la longitud máxima
    }
  };
  
  