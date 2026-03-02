import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Forms/Input'
import { ImageUploader } from '../../components/ImageUploader/ImageUploader'
import { useLocalImage } from '../../hooks/useLocalImage'
import { SUBSCRIPTION_PLANS } from '../../utils/constants'
import { FiEdit2, FiSave, FiX } from 'react-icons/fi'

export const DashboardProvider = () => {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    specialty: user?.specialty || '',
    address: user?.address || '',
  })

  // Usar hook para gestionar imágenes locales con persistencia
  const { images, addImages, deleteImage } = useLocalImage(
    `provider_${user?.id}_images`,
    10
  )

  const [currentPlan, setCurrentPlan] = useState(SUBSCRIPTION_PLANS[0])
  const [reviews] = useState([
    {
      id: 1,
      author: 'Cliente 1',
      rating: 5,
      comment: 'Excelente trabajo',
      date: '2024-01-20',
    },
  ])
  const [stats] = useState({
    visits: 234,
    rating: 4.8,
    reviews: 18,
    position: 3,
  })

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    updateUser(editData)
    setIsEditing(false)
    alert('Perfil actualizado exitosamente')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleUpgradePlan = (plan) => {
    alert(`Actualizando a plan ${plan.name}...`)
    setCurrentPlan(plan)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Panel del Proveedor
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'profile'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Perfil
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'images'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Imágenes
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'reviews'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Reseñas
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'plans'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Planes
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'stats'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Estadísticas
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Información del Perfil
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  <FiEdit2 /> Editar
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Nombre</p>
                    <p className="text-gray-800 font-semibold">{user?.firstName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Apellido</p>
                    <p className="text-gray-800 font-semibold">{user?.lastName}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Teléfono</p>
                    <p className="text-gray-800 font-semibold">{user?.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Especialidad</p>
                    <p className="text-gray-800 font-semibold">{user?.specialty || 'No especificada'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Dirección</p>
                  <p className="text-gray-800 font-semibold">{user?.address || 'No proporcionada'}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    label="Nombre"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleEditChange}
                  />
                  <Input
                    type="text"
                    label="Apellido"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleEditChange}
                  />
                </div>
                <Input
                  type="tel"
                  label="Teléfono"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                />
                <Input
                  type="text"
                  label="Especialidad/Oficio"
                  name="specialty"
                  value={editData.specialty}
                  onChange={handleEditChange}
                />
                <Input
                  type="text"
                  label="Dirección"
                  name="address"
                  value={editData.address}
                  onChange={handleEditChange}
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveChanges}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                  >
                    <FiSave /> Guardar
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
                  >
                    <FiX /> Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <ImageUploader
              title="Galería de Imágenes"
              description="Sube fotos de tu trabajo, productos o servicios"
              images={images}
              onImagesChange={addImages}
              onDeleteImage={deleteImage}
              maxImages={10}
              allowMultiple={true}
            />
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Reseñas Recibidas
            </h2>

            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.author}</h4>
                      <p className="text-sm text-gray-600">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="grid md:grid-cols-3 gap-6">
            {SUBSCRIPTION_PLANS.map(plan => (
              <div
                key={plan.id}
                className={`rounded-lg p-6 transition-all ${
                  currentPlan.id === plan.id
                    ? 'bg-blue-50 border-2 border-blue-600 shadow-lg'
                    : 'bg-white shadow-md border-2 border-transparent'
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">
                  ${plan.price}<span className="text-sm text-gray-600">/mes</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600">✓</span> {benefit}
                    </li>
                  ))}
                </ul>
                {currentPlan.id === plan.id ? (
                  <button
                    disabled
                    className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-default"
                  >
                    Plan Actual
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgradePlan(plan)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                  >
                    Actualizar
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600 text-sm mb-2">Visitas al Perfil</p>
              <p className="text-4xl font-bold text-blue-600">{stats.visits}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600 text-sm mb-2">Calificación Promedio</p>
              <p className="text-4xl font-bold text-yellow-500">{stats.rating}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600 text-sm mb-2">Reseñas</p>
              <p className="text-4xl font-bold text-green-600">{stats.reviews}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600 text-sm mb-2">Posición en Categoría</p>
              <p className="text-4xl font-bold text-purple-600">#{stats.position}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardProvider
