import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { FiEdit2, FiSave, FiLogOut, FiStar, FiTrendingUp, FiMessageSquare, FiCalendar } from 'react-icons/fi'
import SubscriptionBanner from '../../components/SubscriptionBanner/SubscriptionBanner'

export const DashboardProfessional = () => {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    specialty: user?.specialty || '',
    description: user?.description || '',
    phone: user?.phone || '',
    city: user?.city || '',
    rate: user?.rate || '',
  })

  const stats = [
    { label: 'Rating', value: user?.rating || 4.8, icon: <FiStar className="text-yellow-500" />, color: 'blue' },
    { label: 'Reseñas', value: user?.reviews || 42, icon: <FiMessageSquare className="text-green-500" />, color: 'green' },
    { label: 'Experiencia', value: `${user?.experience || 5} años`, icon: <FiTrendingUp className="text-purple-500" />, color: 'purple' },
    { label: 'Tarifa/hora', value: `$${user?.rate || 85}`, icon: <FiCalendar className="text-red-500" />, color: 'red' },
  ]

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    updateUser(editData)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-3xl font-bold">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user?.firstName} {user?.lastName}</h1>
                <p className="text-blue-200">{user?.specialty || 'Profesional'}</p>
                <p className="text-blue-200 text-sm">📍 {user?.city}</p>
              </div>
            </div>
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FiLogOut /> Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <SubscriptionBanner user={user} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className="text-4xl opacity-50">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              {['overview', 'profile', 'services', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Bienvenido a tu portal</h3>
                  <p className="text-gray-700">
                    Desde aquí puedes gestionar tu perfil, ver tus servicios, reseñas y estadísticas. 
                    Mantén tu información actualizada para atraer más clientes.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Próximas Citas</p>
                    <p className="text-3xl font-bold text-green-600">3</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Mensajes</p>
                    <p className="text-3xl font-bold text-yellow-600">5</p>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Tu Perfil</h3>
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isEditing
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {isEditing ? (
                      <><FiSave /> Guardar</>
                    ) : (
                      <><FiEdit2 /> Editar</>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editData.firstName}
                      onChange={handleEditChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editData.lastName}
                      onChange={handleEditChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
                    <input
                      type="text"
                      name="specialty"
                      value={editData.specialty}
                      onChange={handleEditChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tarifa por hora ($)</label>
                    <input
                      type="number"
                      name="rate"
                      value={editData.rate}
                      onChange={handleEditChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleEditChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                    <input
                      type="text"
                      name="city"
                      value={editData.city}
                      onChange={handleEditChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                    <textarea
                      name="description"
                      value={editData.description}
                      onChange={handleEditChange}
                      disabled={!isEditing}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-6">
                  + Agregar Servicio
                </button>
                <p className="text-gray-500 text-center py-8">No hay servicios registrados aún</p>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg mb-6">
                  <p className="text-gray-600 text-sm mb-2">Tu calificación promedio</p>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-blue-600">{user?.rating}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-2xl">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">Basado en {user?.reviews} reseñas</p>
                </div>
                <p className="text-gray-500 text-center py-8">No hay reseñas para mostrar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardProfessional
