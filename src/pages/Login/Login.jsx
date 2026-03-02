import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { validateEmail } from '../../utils/validation'
import Input from '../../components/Forms/Input'
import authService from '../../services/authService'

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

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
      // Conectar con API backend
      const response = await authService.login(formData.email, formData.password)
      
      const userData = {
        id: response.data.usuario.id,
        email: response.data.usuario.email,
        nombre: response.data.usuario.nombre,
        rol: response.data.usuario.rol,
      }
      
      // Guardar token y usuario
      login(userData, response.data.token)
      
      // Redirigir según rol
      navigateByRole(userData.rol)
    } catch (error) {
      console.error('Error de login:', error)
      if (error.response?.status === 401) {
        setGeneralError('Correo o contraseña incorrectos')
      } else {
        setGeneralError('Error al conectar con el servidor. Verifica que esté ejecutándose.')
      }
    } finally {
      setLoading(false)
    }
  }

  const navigateByRole = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/dashboard')
    }
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
      </div>
    </div>
  )
}

export default Login
