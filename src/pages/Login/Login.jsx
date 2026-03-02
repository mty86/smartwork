import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { validateEmail } from '../../utils/validation'
import Input from '../../components/Forms/Input'
import authService from '../../services/authService'
import { mockUsers } from '../../utils/mockUsers'
import { loadUsers, saveUsers } from '../../utils/storage'

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  // Inicializar usuarios mock en localStorage al cargar
  useEffect(() => {
    const initializeMockUsers = () => {
      const existingUsers = localStorage.getItem('smartworks_users')
      if (!existingUsers) {
        // convierte el objeto en un arreglo para facilitar manejo
        const arr = Object.values(mockUsers)
        localStorage.setItem('smartworks_users', JSON.stringify(arr))
      }
    }
    initializeMockUsers()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = 'El correo es requerido'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Correo inválido'
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setGeneralError('')

    try {
      // Verificar en usuarios mock primero (para desarrollo)
      const users = loadUsers()
      let authenticatedUser = users.find(
        u => u.email === formData.email && u.password === formData.password
      )

      // si la cuenta existe pero está pendiente o suspendida, no permitimos login
      if (authenticatedUser) {
        if (authenticatedUser.status === 'pending') {
          setGeneralError('Cuenta pendiente de aprobación por un administrador')
          setLoading(false)
          return
        }
        if (authenticatedUser.status === 'suspended' || authenticatedUser.isActive === false) {
          setGeneralError('Cuenta suspendida. Contacta al administrador')
          setLoading(false)
          return
        }
      }

      if (authenticatedUser) {
        const { password, ...userWithoutPassword } = authenticatedUser
        localStorage.setItem('authToken', `mock_token_${authenticatedUser.id}`)
        login(userWithoutPassword)
        
        // Redirigir según rol
        navigateByRole(userWithoutPassword.role)
      } else {
        // Intentar con API real
        try {
          const response = await authService.login(formData.email, formData.password)
          const userData = {
            id: response.data.user.id,
            email: response.data.user.email,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            role: response.data.user.role,
          }
          localStorage.setItem('authToken', response.data.token)
          login(userData)
          navigateByRole(userData.role)
        } catch (apiError) {
          setGeneralError('Correo o contraseña inválidos')
        }
      }
    } catch (error) {
      setGeneralError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  const navigateByRole = (role) => {
    // Ahora redirige a /dashboard que automáticamente redirige según el rol
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Principal */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">SmartWorks</h1>
            <p className="text-gray-600">Tu plataforma de servicios</p>
          </div>

          {generalError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              label="Correo Electrónico"
              placeholder="correo@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              type="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6 text-sm">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
              Regístrate aquí
            </Link>
          </p>
        </div>

        {/* Card de Información de Usuarios */}
        <div className="bg-white bg-opacity-95 rounded-xl shadow-lg p-6">
          <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase flex items-center gap-2">
            <span className="text-lg">📋</span> Usuarios Disponibles
          </h3>
          <div className="space-y-3">
            {loadUsers().map((user, idx) => (
              <div key={user.id || idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {user.role} {user.status === 'pending' ? '(pendiente)' : ''}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ email: user.email, password: user.password })
                    }}
                    className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded font-semibold transition-colors"
                  >
                    Usar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 italic">
            💡 Haz clic en "Usar" para cargar las credenciales automáticamente
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
