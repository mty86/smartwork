import { useState, useEffect } from 'react'
import { FiStar, FiMapPin, FiPhone, FiMail, FiMessageCircle } from 'react-icons/fi'
import { calculateAverageRating, openWhatsApp } from '../../utils/helpers'
import ProviderDetailModal from '../Modals/ProviderDetailModal'

export const ProviderCard = ({ provider }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const averageRating = calculateAverageRating(provider.rating)

  // Cargar imagen local del proveedor si existe
  useEffect(() => {
    try {
      const savedImages = localStorage.getItem(`provider_${provider.id}_images`)
      if (savedImages) {
        const images = JSON.parse(savedImages)
        if (images.length > 0) {
          setProfileImage(images[0].src || images[0])
        }
      }
    } catch (error) {
      console.error('Error cargando imagen del proveedor:', error)
    }
  }, [provider.id])

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

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          <img
            src={profileImage || provider.image || 'https://via.placeholder.com/300x200?text=No+Image'}
            alt={provider.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          {/* Badge */}
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
            <FiStar size={14} className="fill-yellow-400" />
            {averageRating}
          </div>
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          {/* Name */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 truncate hover:text-blue-600 transition">
              {provider.name}
            </h3>
            <p className="text-sm text-blue-600 font-medium">
              {provider.specialty || provider.category || provider.type}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={16}
                  className={i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
              ({provider.rating?.length || 0})
            </span>
          </div>

          {/* Location */}
          {provider.address && (
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <FiMapPin size={16} className="flex-shrink-0 mt-0.5 text-red-500" />
              <span className="line-clamp-1">{provider.address}</span>
            </div>
          )}

          {/* Contact Info Buttons */}
          <div className="flex gap-2 pt-2 border-t border-gray-100 mt-auto">
            {provider.phone && (
              <button
                onClick={handleCall}
                title="Llamar"
                className="flex-1 flex items-center justify-center gap-1 bg-green-50 text-green-600 hover:bg-green-100 active:bg-green-200 py-2 rounded text-sm font-medium transition duration-200"
              >
                <FiPhone size={16} />
                <span className="hidden sm:inline">Llamar</span>
              </button>
            )}
            {provider.email && (
              <button
                onClick={handleEmail}
                title="Enviar correo"
                className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 active:bg-blue-200 py-2 rounded text-sm font-medium transition duration-200"
              >
                <FiMail size={16} />
                <span className="hidden sm:inline">Email</span>
              </button>
            )}
            {provider.phone && (
              <button
                onClick={handleWhatsApp}
                title="WhatsApp"
                className="flex-1 flex items-center justify-center gap-1 bg-cyan-50 text-cyan-600 hover:bg-cyan-100 active:bg-cyan-200 py-2 rounded text-sm font-medium transition duration-200"
              >
                <FiMessageCircle size={16} />
                <span className="hidden sm:inline">Chat</span>
              </button>
            )}
          </div>

          {/* Ver Más Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Ver Más Información
          </button>
        </div>
      </div>

      {/* Modal */}
      <ProviderDetailModal 
        provider={provider} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}

export default ProviderCard
