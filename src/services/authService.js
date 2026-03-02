import apiClient from './apiClient'

/**
 * Servicio de autenticación
 */
export const authService = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  register: (userData) =>
    apiClient.post('/auth/register', userData),

  logout: () =>
    apiClient.post('/auth/logout'),

  verifyToken: () =>
    apiClient.post('/auth/verify'),

  refreshToken: () =>
    apiClient.post('/auth/refresh'),

  updateProfile: (userId, data) =>
    apiClient.put(`/auth/profile/${userId}`, data),
}

export default authService
