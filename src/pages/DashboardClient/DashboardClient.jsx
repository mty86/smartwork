import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { FiEdit2, FiSave, FiLogOut, FiSearch, FiStar, FiMessageSquare, FiClock } from 'react-icons/fi'
import SubscriptionBanner from '../../components/SubscriptionBanner/SubscriptionBanner'

export const DashboardClient = () => {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    city: user?.city || '',
  })

  const stats = [
    { label: 'Solicitudes', value: 5, icon: <FiSearch className="text-blue-500" /> },
    { label: 'Favoritos', value: 12, icon: <FiStar className="text-yellow-500" /> },
    { label: 'Reseñas Hechas', value: 8, icon: <FiMessageSquare className="text-green-500" /> },
    { label: 'Horas Ahorradas', value: 24, icon: <FiClock className="text-purple-500" /> },
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
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-3xl font-bold">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user?.firstName} {user?.lastName}</h1>
                <p className="text-orange-200">Cliente SmartWorks</p>
                {user?.city && <p className="text-orange-200 text-sm">📍 {user?.city}</p>}
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
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-emerald-600"
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
              {['overview', 'profile', 'requests', 'favorites'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                    activeTab === tab
                      ? 'text-emerald-700 border-b-2 border-emerald-700 bg-emerald-50'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab === 'overview' && 'Resumen'}
                  {tab === 'profile' && 'Perfil'}
                  {tab === 'requests' && 'Mis Solicitudes'}
                  {tab === 'favorites' && 'Favoritos'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-emerald-50 rounded-lg p-6 border-l-4 border-emerald-600">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Bienvenido a tu panel de cliente</h3>
                  <p className="text-gray-700">
                    Busca profesionales, comparte tus necesidades y conecta con expertos de tu área. 
                    Accede a reseñas, presupuestos y mucho más.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-6 rounded-lg text-left transition-all">
                    <p className="text-2xl mb-2">🔍</p>
                    <p className="font-semibold text-gray-800">Buscar Profesionales</p>
                    <p className="text-sm text-gray-600 mt-1">Encuentra expertos en tu área</p>
                  </button>
                  <button className="bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 p-6 rounded-lg text-left transition-all">
                    <p className="text-2xl mb-2">💬</p>
                    <p className="font-semibold text-gray-800">Enviar Solicitud</p>
                    <p className="text-sm text-gray-600 mt-1">Comparte tu proyecto</p>
                  </button>
                  <button className="bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 p-6 rounded-lg text-left transition-all">
                    <p className="text-2xl mb-2">⭐</p>
                    <p className="font-semibold text-gray-800">Mis Favoritos</p>
                    <p className="text-sm text-gray-600 mt-1">Accede a tus favoritos</p>
                  </button>
                  <button className="bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 p-6 rounded-lg text-left transition-all">
                    <p className="text-2xl mb-2">📋</p>
                    <p className="font-semibold text-gray-800">Mi Historial</p>
                    <p className="text-sm text-gray-600 mt-1">Ve tus trabajos pasados</p>
                  </button>
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
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
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
                </div>
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <div className="space-y-4">
                <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-lg font-semibold mb-6">
                  + Nueva Solicitud
                </button>
                <p className="text-gray-500 text-center py-8">No hay solicitudes registradas</p>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="space-y-4">
                <p className="text-gray-500 text-center py-8">No hay profesionales marcados como favoritos</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardClient
