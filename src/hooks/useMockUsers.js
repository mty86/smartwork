/**
 * Hook para cargar y gestionar usuarios de prueba en modo desarrollo
 */
import { useEffect } from 'react'
import { mockUsers } from '../utils/mockUsers'

export const useMockUsers = () => {
  useEffect(() => {
    // Solo en desarrollo, inyectar usuarios mock en la consola
    if (import.meta.env.DEV) {
      window.__mockUsers = mockUsers
      console.log('🧪 Mock Users disponibles en window.__mockUsers')
      console.log('Usuarios de prueba:')
      Object.entries(mockUsers).forEach(([key, user]) => {
        console.log(`  ${key}: ${user.email} / ${user.password}`)
      })
    }
  }, [])

  /**
   * Simular login con usuario mock
   */
  const loginWithMock = (userKey) => {
    const user = mockUsers[userKey]
    if (!user) {
      console.error(`Usuario mock "${userKey}" no encontrado`)
      return null
    }
    const { password, ...userWithoutPassword } = user
    return {
      token: `mock_token_${user.id}`,
      user: userWithoutPassword,
    }
  }

  /**
   * Obtener todos los usuarios mock disponibles
   */
  const getAllMockUsers = () => {
    return Object.entries(mockUsers).map(([key, user]) => ({
      key,
      email: user.email,
      password: user.password,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    }))
  }

  return {
    mockUsers,
    loginWithMock,
    getAllMockUsers,
  }
}

export default useMockUsers
