import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { validateEmail, validatePassword, validatePhone } from '../../utils/validation'
import { PROFESSIONAL_CATEGORIES, TRADE_CATEGORIES, USER_ROLES } from '../../utils/constants'
import Input from '../../components/Forms/Input'
import authService from '../../services/authService'

export const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [userType, setUserType] = useState(null)
  const [providerType, setProviderType] = useState(null)
  const [professionCategories, setProfessionCategories] = useState([])
  const [tradeCategories, setTradeCategories] = useState([])
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    businessName: '',
    cedula: '',
    specialty: '',
    trade: '',
    category: '',
    address: '',
    businessHours: '',
    hasPhysicalLocation: null,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  useEffect(() => {
    // Cargar categorías locales (esto se puede mantener así por ahora)
    setProfessionCategories(PROFESSIONAL_CATEGORIES)
    setTradeCategories(TRADE_CATEGORIES)
  }, [])

  const handleUserTypeSelect = (type) => {
    setUserType(type)
    setErrors({})
    setGeneralError('')
  }

  const handleProviderTypeSelect = (type) => {
    setProviderType(type)
    setFormData(prev => ({ ...prev, category: '' }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Common validations
    if (!formData.email) {
      newErrors.email = 'El correo es requerido'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ingresa un correo válido'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Mínimo 8 caracteres'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    if (userType === 'client') {
      if (!formData.firstName) newErrors.firstName = 'El nombre es requerido'
      if (!formData.lastName) newErrors.lastName = 'El apellido es requerido'
    }

    if (userType === 'provider') {
      if (!formData.firstName) newErrors.firstName = 'El nombre es requerido'
      if (!formData.lastName) newErrors.lastName = 'El apellido es requerido'
      if (!formData.phone) newErrors.phone = 'El teléfono es requerido'

      if (providerType === 'professional') {
        if (!formData.cedula) newErrors.cedula = 'La cédula es requerida'
        if (!formData.specialty) newErrors.specialty = 'La especialidad es requerida'
      }

      if (providerType === 'trade') {
        if (!formData.trade) newErrors.trade = 'El oficio es requerido'
      }

      if (providerType === 'business') {
        if (!formData.businessName) newErrors.businessName = 'El nombre del negocio es requerido'
        if (formData.hasPhysicalLocation === null) newErrors.hasPhysicalLocation = 'Indicar si tienen local físico'
        if (formData.hasPhysicalLocation === false) {
          // Redirect to professional/trade registration
          setProviderType(null)
          alert('Por favor, regístrate como Profesional u Oficio')
          return newErrors
        }
        if (!formData.address) newErrors.address = 'La dirección es requerida'
        if (!formData.businessHours) newErrors.businessHours = 'Los horarios son requeridos'
      }
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
      // Preparar datos para registro
      const registerData = {
        email: formData.email,
        password: formData.password,
        nombre: `${formData.firstName} ${formData.lastName}`,
        rol: 'usuario' // Por defecto en la API, pero se puede extender
      }

      // Registrar en el backend
      const response = await authService.register(registerData)
      
      // Mostrar mensaje de éxito
      alert('¡Registro exitoso! Por favor inicia sesión.')
      navigate('/login')

    } catch (error) {
      console.error('Error de registro:', error)
      if (error.response?.status === 400) {
        setGeneralError(error.response.data.error || 'El email ya está registrado')
      } else if (error.response?.data?.error) {
        setGeneralError(error.response.data.error)
      } else {
        setGeneralError('Error al conectar con el servidor. Verifica que esté ejecutándose.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Step 1: Select User Type
  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Crear una Cuenta
          </h1>
          <p className="text-center text-gray-600 mb-8">
            ¿Qué tipo de usuario eres?
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => handleUserTypeSelect('client')}
              className="border-2 border-blue-600 p-6 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="text-4xl mb-2">👤</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Cliente
              </h3>
              <p className="text-gray-600">
                Busca y conecta con profesionales
              </p>
            </button>

            <button
              onClick={() => handleUserTypeSelect('provider')}
              className="border-2 border-blue-600 p-6 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="text-4xl mb-2">💼</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Proveedor
              </h3>
              <p className="text-gray-600">
                Promociona tus servicios
              </p>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Select Provider Type
  if (userType === 'provider' && !providerType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Tipo de Proveedor
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Selecciona tu tipo de proveedor
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => handleProviderTypeSelect('professional')}
              className="border-2 border-blue-600 p-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="text-3xl mb-2">👨‍⚕️</div>
              <h3 className="font-semibold text-gray-800">Profesional</h3>
            </button>

            <button
              onClick={() => handleProviderTypeSelect('trade')}
              className="border-2 border-blue-600 p-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="text-3xl mb-2">🔧</div>
              <h3 className="font-semibold text-gray-800">Oficio</h3>
            </button>

            <button
              onClick={() => handleProviderTypeSelect('business')}
              className="border-2 border-blue-600 p-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="text-3xl mb-2">🏢</div>
              <h3 className="font-semibold text-gray-800">Negocio</h3>
            </button>
          </div>

          <button
            onClick={() => setUserType(null)}
            className="w-full text-gray-600 hover:text-gray-800 py-2"
          >
            ← Volver
          </button>
        </div>
      </div>
    )
  }

  // Step 3: Fill Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Registrarse
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Completa tu información
        </p>

        {generalError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Common Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              type="email"
              label="Correo Electrónico"
              placeholder="tu@email.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            {userType === 'provider' && providerType !== 'business' && (
              <Input
                type="tel"
                label="Teléfono"
                placeholder="Ej: 1234567890"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Nombre"
              placeholder="Tu nombre"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
            />

            <Input
              type="text"
              label="Apellido"
              placeholder="Tu apellido"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              type="password"
              label="Contraseña"
              placeholder="Mínimo 8 caracteres"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Input
              type="password"
              label="Confirmar Contraseña"
              placeholder="Confirma tu contraseña"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
          </div>

          {/* Professional Fields */}
          {providerType === 'professional' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Especialidad
                </label>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.specialty ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Selecciona una especialidad</option>
                  {professionCategories.map(cat => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
              </div>

              <Input
                type="text"
                label="Cédula Profesional"
                placeholder="Ej: 123456789"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                error={errors.cedula}
                required
              />

              <Input
                type="tel"
                label="Teléfono"
                placeholder="Ej: 1234567890"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />
            </>
          )}

          {/* Trade Fields */}
          {providerType === 'trade' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Oficio
                </label>
                <select
                  name="trade"
                  value={formData.trade}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.trade ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Selecciona un oficio</option>
                  {tradeCategories.map(cat => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.trade && <p className="text-red-500 text-sm mt-1">{errors.trade}</p>}
              </div>
            </>
          )}

          {/* Business Fields */}
          {providerType === 'business' && (
            <>
              <Input
                type="text"
                label="Nombre del Negocio"
                placeholder="Nombre de tu negocio"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                error={errors.businessName}
                required
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Tienes local físico con horarios fijos?
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, hasPhysicalLocation: true }))}
                    className={`w-full p-3 rounded border-2 transition-colors ${
                      formData.hasPhysicalLocation === true
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300'
                    }`}
                  >
                    Sí, tengo local físico
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange({ target: { name: 'hasPhysicalLocation', value: false, type: 'checkbox', checked: true } })}
                    className={`w-full p-3 rounded border-2 transition-colors ${
                      formData.hasPhysicalLocation === false
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-300'
                    }`}
                  >
                    No, prefiero registrarme como Profesional u Oficio
                  </button>
                </div>
                {errors.hasPhysicalLocation && <p className="text-red-500 text-sm mt-1">{errors.hasPhysicalLocation}</p>}
              </div>

              {formData.hasPhysicalLocation === true && (
                <>
                  <Input
                    type="text"
                    label="Dirección"
                    placeholder="Dirección completa"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    required
                  />

                  <Input
                    type="text"
                    label="Horarios (Ej: Lun-Vie 9AM-6PM)"
                    placeholder="Horarios y días de atención"
                    name="businessHours"
                    value={formData.businessHours}
                    onChange={handleChange}
                    error={errors.businessHours}
                    required
                  />

                  <Input
                    type="tel"
                    label="Teléfono"
                    placeholder="Ej: 1234567890"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    required
                  />
                </>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
