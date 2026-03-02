import apiClient from './apiClient'

/**
 * Servicio de proveedores
 */
export const providerService = {
  // Obtener todos los proveedores
  getAllProviders: (page = 1, limit = 10) =>
    apiClient.get('/providers', { params: { page, limit } }),

  // Obtener proveedores por tipo
  getProvidersByType: (type, page = 1, limit = 10) =>
    apiClient.get(`/providers/type/${type}`, { params: { page, limit } }),

  // Obtener proveedores por categoría
  getProvidersByCategory: (category, page = 1, limit = 10) =>
    apiClient.get(`/providers/category/${category}`, { params: { page, limit } }),

  // Obtener detalle de un proveedor
  getProviderDetails: (providerId) =>
    apiClient.get(`/providers/${providerId}`),

  // Obtener reseñas de un proveedor
  getProviderReviews: (providerId, page = 1, limit = 10) =>
    apiClient.get(`/providers/${providerId}/reviews`, { params: { page, limit } }),

  // Crear reseña
  createReview: (providerId, reviewData) =>
    apiClient.post(`/providers/${providerId}/reviews`, reviewData),

  // Actualizar perfil del proveedor
  updateProviderProfile: (providerId, data) =>
    apiClient.put(`/providers/${providerId}`, data),

  // Subir imagen
  uploadImage: (providerId, file) => {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.post(`/providers/${providerId}/upload-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  // Obtener categorías
  getCategories: () =>
    apiClient.get('/providers/categories'),

  // Buscar proveedores
  searchProviders: (query) =>
    apiClient.get('/providers/search', { params: { q: query } }),
}

export default providerService
