import apiClient from './apiClient'

/**
 * Servicio de gestión de usuarios
 * CRUD completo para administradores
 */
export const userService = {
  // Obtener todos los usuarios (solo admin)
  getAllUsers: () =>
    apiClient.get('/users'),

  // Obtener usuario por ID
  getUserById: (userId) =>
    apiClient.get(`/users/${userId}`),

  // Crear nuevo usuario
  createUser: (userData) =>
    apiClient.post('/auth/register', userData),

  // Actualizar usuario
  updateUser: (userId, userData) =>
    apiClient.put(`/users/${userId}`, userData),

  // Cambiar contraseña
  changePassword: (userId, passwords) =>
    apiClient.put(`/users/${userId}/password`, passwords),

  // Eliminar usuario (solo admin)
  deleteUser: (userId) =>
    apiClient.delete(`/users/${userId}`),
}

export default userService
