import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { FiEdit2, FiSave, FiLogOut, FiUsers, FiBarChart2, FiMessageSquare, FiAward } from 'react-icons/fi'
import { ImageUploader } from '../../components/ImageUploader/ImageUploader'
import { useLocalImage } from '../../hooks/useLocalImage'
import SubscriptionBanner from '../../components/SubscriptionBanner/SubscriptionBanner'

export const DashboardBusiness = () => {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    businessName: user?.businessName || '',
    businessDescription: user?.businessDescription || '',
    phone: user?.phone || '',
    city: user?.city || '',
    employees: user?.employees || '',
    websiteUrl: user?.websiteUrl || '',
  })

  // Hook para imágenes locales del negocio
  const { images, addImages, deleteImage } = useLocalImage(
    `business_${user?.id}_images`,
    10
  )

  const stats = [
    { label: 'Empleados', value: user?.employees || 25, icon: <FiUsers className="text-blue-500" /> },
    { label: 'Rating', value: user?.rating || 4.6, icon: <FiAward className="text-yellow-500" /> },
    { label: 'Reseñas', value: user?.reviews || 58, icon: <FiMessageSquare className="text-green-500" /> },
    { label: 'Servicios Activos', value: 12, icon: <FiBarChart2 className="text-purple-500" /> },
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
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-3xl font-bold">
                {user?.businessName?.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user?.businessName}</h1>
                <p className="text-green-200">Empresa de Servicios</p>
                <p className="text-green-200 text-sm">📍 {user?.city}</p>
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
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500"
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
              {['overview', 'company', 'images', 'services', 'team'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                    activeTab === tab
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab === 'overview' && 'Resumen'}
                  {tab === 'company' && 'Empresa'}
                  {tab === 'images' && 'Galería'}
                  {tab === 'services' && 'Servicios'}
                  {tab === 'team' && 'Equipo'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Bienvenido al panel empresarial</h3>
                  <p className="text-gray-700">
                    Desde aquí puedes gestionar tu empresa, equipo de trabajo, servicios ofrecidos y ver 
                    tu desempeño en la plataforma.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Solicitudes Pendientes</p>
                    <p className="text-3xl font-bold text-blue-600">7</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Proyectos Completados</p>
                    <p className="text-3xl font-bold text-purple-600">156</p>
                  </div>
                </div>
              </div>
            )}

            {/* Company Tab */}
            {activeTab === 'company' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Información de Empresa</h3>
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isEditing
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de Empresa</label>
                    <input
                      type="text"
                      name="businessName"
                      value={editData.businessName}
                      onChange={handleEditChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número de Empleados</label>
                    <input
                      type="number"
                      name="employees"
                      value={editData.employees}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sitio Web</label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={editData.websiteUrl}
                      onChange={handleEditChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción de Empresa</label>
                    <textarea
                      name="businessDescription"
                      value={editData.businessDescription}
                      onChange={handleEditChange}
                      disabled={!isEditing}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <ImageUploader
                  title="Galería de Imágenes de Negocio"
                  description="Sube fotos de tu negocio, instalaciones, equipo o proyectos realizados"
                  images={images}
                  onImagesChange={addImages}
                  onDeleteImage={deleteImage}
                  maxImages={10}
                  allowMultiple={true}
                />
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mb-6">
                  + Agregar Servicio
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-800 mb-2">Servicio {i}</h4>
                      <p className="text-sm text-gray-600">Descripción del servicio</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <div className="space-y-4">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mb-6">
                  + Agregar Miembro
                </button>
                <p className="text-gray-500 text-center py-8">No hay miembros del equipo registrados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardBusiness
