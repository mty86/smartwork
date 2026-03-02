import { useState, useEffect } from 'react'
import { FiX, FiPhone, FiMail, FiMapPin, FiStar, FiMessageCircle, FiClock, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { calculateAverageRating, openWhatsApp } from '../../utils/helpers'

const ProviderDetailModal = ({ provider, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('info')
  const [localImages, setLocalImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const averageRating = calculateAverageRating(provider.rating)

  // Cargar imágenes locales del proveedor
  useEffect(() => {
    if (provider?.id) {
      try {
        const savedImages = localStorage.getItem(`provider_${provider.id}_images`)
        if (savedImages) {
          const images = JSON.parse(savedImages)
          setLocalImages(images)
          setCurrentImageIndex(0)
        }
      } catch (error) {
        console.error('Error cargando imágenes locales:', error)
      }
    }
  }, [provider?.id, isOpen])

  if (!isOpen || !provider) return null

  const handleCall = (e) => {
    e.preventDefault()
    if (provider.phone) {
      window.location.href = `tel:${provider.phone}`
    }
  }

  const handleEmail = (e) => {
    e.preventDefault()
    if (provider.email) {
      window.location.href = `mailto:${provider.email}`
    }
  }

  const handleWhatsApp = (e) => {
    e.preventDefault()
    if (provider.phone) {
      const message = `Hola ${provider.name}, quisiera consultar sobre tus servicios de ${provider.specialty || provider.category}`
      openWhatsApp(provider.phone, message)
    }
  }

  if (!isOpen || !provider) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{provider.name}</h2>
            <p className="text-blue-100">{provider.specialty || provider.category}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Image Gallery */}
        <div className="relative bg-gray-100 h-64 flex items-center justify-center group">
          {localImages.length > 0 ? (
            <>
              <img
                src={localImages[currentImageIndex]?.src || localImages[currentImageIndex]}
                alt={`${provider.name} - Imagen ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {localImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? localImages.length - 1 : prev - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === localImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1}/{localImages.length}
              </div>
            </>
          ) : (
            <>
              <img
                src={provider.image || 'https://via.placeholder.com/500x300'}
                alt={provider.name}
                className="w-full h-full object-cover"
              />
              {provider.gallery && provider.gallery.length > 0 && (
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  +{provider.gallery.length} fotos
                </div>
              )}
            </>
          )}
        </div>

        {/* Rating y Info Rápida */}
        <div className="bg-gray-50 border-b p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={20}
                    className={i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="ml-3 text-lg font-semibold text-gray-800">
                {averageRating.toFixed(1)} ({provider.rating?.length || 0} reseñas)
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-3 bg-white rounded-lg">
              <FiMapPin className="text-blue-600 mb-2" size={24} />
              <span className="text-xs text-gray-600 text-center truncate">Ubicación</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-lg">
              <FiClock className="text-green-600 mb-2" size={24} />
              <span className="text-xs text-gray-600 text-center">Disponible</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-lg">
              <FiUser className="text-purple-600 mb-2" size={24} />
              <span className="text-xs text-gray-600 text-center">Verificado</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-lg">
              <FiStar className="text-orange-600 mb-2" size={24} />
              <span className="text-xs text-gray-600 text-center">Top Pro</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-white sticky top-20 z-40">
          {['info', 'contacto', 'reseñas'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 font-medium text-center transition ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Información Profesional</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    {provider.description || `${provider.name} es un profesional certificado en ${provider.specialty || provider.category} con amplia experiencia en el sector. Ofrece servicios de calidad con garantía de satisfacción del cliente.`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">ESPECIALIDAD</h4>
                  <p className="text-gray-800">{provider.specialty || provider.category || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">AÑOS DE EXPERIENCIA</h4>
                  <p className="text-gray-800">{provider.experience || '5+ años'}</p>
                </div>
              </div>

              {provider.address && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">UBICACIÓN</h4>
                  <div className="flex items-start gap-2">
                    <FiMapPin className="text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800">{provider.address}</p>
                  </div>
                </div>
              )}

              {provider.hours && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">HORARIO</h4>
                  <div className="flex items-start gap-2">
                    <FiClock className="text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800">{provider.hours}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contacto Tab */}
          {activeTab === 'contacto' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de Contacto</h3>

              {provider.phone && (
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <FiPhone className="text-green-600" size={24} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <a href={`tel:${provider.phone}`} className="text-lg font-semibold text-green-600 hover:text-green-700">
                      {provider.phone}
                    </a>
                  </div>
                  <button 
                    onClick={handleCall}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Llamar
                  </button>
                </div>
              )}

              {provider.email && (
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <FiMail className="text-blue-600" size={24} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Correo Electrónico</p>
                    <a href={`mailto:${provider.email}`} className="text-lg font-semibold text-blue-600 hover:text-blue-700">
                      {provider.email}
                    </a>
                  </div>
                  <button 
                    onClick={handleEmail}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Enviar
                  </button>
                </div>
              )}

              {provider.phone && (
                <button 
                  onClick={handleWhatsApp}
                  className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <FiMessageCircle size={20} />
                  Contactar por WhatsApp
                </button>
              )}

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Sugerencia:</strong> Contacta directamente para obtener presupuestos y disponibilidad.
                </p>
              </div>
            </div>
          )}

          {/* Reseñas Tab */}
          {activeTab === 'reseñas' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Reseñas ({provider.rating?.length || 0})
              </h3>

              {provider.rating && provider.rating.length > 0 ? (
                <div className="space-y-3">
                  {provider.rating.slice(0, 3).map((rating, idx) => (
                    <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-800">Cliente {idx + 1}</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              size={14}
                              className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        "Excelente servicio, muy profesional y puntual. Recomendado al 100%"
                      </p>
                      <span className="text-xs text-gray-500 mt-2 block">Hace 2 días</span>
                    </div>
                  ))}
                  {provider.rating.length > 3 && (
                    <button className="w-full text-blue-600 hover:text-blue-700 font-semibold py-2">
                      Ver todas las reseñas ({provider.rating.length})
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">
                  No hay reseñas aún. ¡Sé el primero en comentar!
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="bg-gray-50 border-t p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Cerrar
          </button>
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition">
            Contratar Ahora
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProviderDetailModal
