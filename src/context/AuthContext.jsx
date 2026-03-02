import { createContext, useState, useCallback, useEffect } from 'react'

/**
 * AuthContext - Contexto global para autenticación y gestión del usuario
 * Maneja el estado de sesión, roles y datos del usuario autenticado
 */
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null) // 'client', 'professional', 'trade', 'business', 'admin'
  const [loading, setLoading] = useState(true)

  // Verificar si hay sesión activa al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setUserRole(userData.role)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error loading stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback((userData) => {
    setUser(userData)
    setUserRole(userData.role)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setUserRole(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }, [])

  const updateUser = useCallback((updatedData) => {
    const newUserData = { ...user, ...updatedData }
    setUser(newUserData)
    localStorage.setItem('user', JSON.stringify(newUserData))
  }, [user])

  const value = {
    isAuthenticated,
    user,
    userRole,
    loading,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
