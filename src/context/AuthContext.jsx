import { createContext, useState, useCallback, useEffect } from 'react'

/**
 * AuthContext - Contexto global para autenticación y gestión del usuario
 * Maneja el estado de sesión, JWT, roles y datos del usuario autenticado
 * Conectado con backend Node.js
 */
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null) // 'usuario', 'admin'
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verificar si hay sesión activa al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('authToken')
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setUserRole(userData.rol || userData.role)
        setToken(storedToken)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error loading stored user:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback((userData, authToken) => {
    setUser(userData)
    setUserRole(userData.rol || userData.role)
    setToken(authToken)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('authToken', authToken)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setUserRole(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
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
    token,
    loading,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
