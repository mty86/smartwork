/**
 * Funciones de validación
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 8
}

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[0-9]{10,}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validateCedula = (cedula) => {
  return cedula.trim().length >= 5
}

export const validateForm = (fields) => {
  const errors = {}

  for (const [key, value] of Object.entries(fields)) {
    if (!value || value.trim() === '') {
      errors[key] = `El campo ${key} es requerido`
    }
  }

  return errors
}
