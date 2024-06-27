// authSchema 
export const authSchema = {
  // Validación de correo electrónico
  email(value) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(value)) {
      return "Email no válido";
    }
    return true;
  },
  // Validación de contraseña
  password(value) {
    if (!value) {
      return "El Password es Obligatorio";
    }
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!regexPassword.test(value)) {
      return "La contraseña no cumple con los criterios de seguridad";
    }
    return true;
  },
};
