import { useState, useEffect } from 'react'
import { FiStar, FiMapPin, FiClock, FiPhone, FiMail, FiX } from 'react-icons/fi'

const BusinessCard = ({ business }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [profileImage, setProfileImage] = useState(null)

  // Cargar imagen local del negocio si existe
  useEffect(() => {
    try {
      const savedImages = localStorage.getItem(`business_${business.id}_images`)
      if (savedImages) {
        const images = JSON.parse(savedImages)
        if (images.length > 0) {
          setProfileImage(images[0].src || images[0])
        }
      }
    } catch (error) {
      console.error('Error cargando imagen del negocio:', error)
    }
  }, [business.id])

  const handleCall = (e) => {
    e.preventDefault()
    if (business.phone) {
      window.location.href = `tel:${business.phone}`
    }
  }

  const handleContact = () => {
    handleCall({ preventDefault: () => {} })
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200">
        {/* Image Container */}
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          <img
            src={profileImage || business.image || 'https://via.placeholder.com/300x200?text=No+Image'}
            alt={business.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <FiStar size={14} className="fill-white" />
            {business.rating}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Name & Category */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 truncate">
              {business.name}
            </h3>
            <p className="text-sm text-amber-600 font-medium">
              {business.category}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={16}
                  className={i < Math.round(business.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
              ({business.reviews})
            </span>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <FiMapPin size={16} className="flex-shrink-0 mt-0.5 text-red-500" />
            <span className="line-clamp-1">{business.address}</span>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <FiClock size={16} className="flex-shrink-0 mt-0.5 text-blue-500" />
            <span className="line-clamp-1">{business.hours}</span>
          </div>

          {/* Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            Ver Detalles
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{business.name}</h2>
                <p className="text-amber-100">{business.category}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Image */}
            <div className="relative bg-gray-100 h-64 flex items-center justify-center">
              <img
                src={business.image}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-6 space-y-6">
              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={20}
                      className={i < Math.round(business.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800">
                  {business.rating} ({business.reviews} reseñas)
                </span>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4">
                {/* Ubicación */}
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMapPin className="text-red-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Ubicación</h4>
                  </div>
                  <p className="text-gray-700 text-sm">{business.address}</p>
                </div>

                {/* Horario */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiClock className="text-blue-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Horario</h4>
                  </div>
                  <p className="text-gray-700 text-sm">{business.hours}</p>
                </div>

                {/* Teléfono */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FiPhone className="text-green-600" size={20} />
                    <h4 className="font-semibold text-gray-800">Teléfono</h4>
                  </div>
                  <a
                    href={`tel:${business.phone}`}
                    className="text-green-600 font-semibold hover:text-green-700 transition"
                  >
                    {business.phone}
                  </a>
                </div>

                {/* Categoría */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-purple-600 text-xl">🏷️</span>
                    <h4 className="font-semibold text-gray-800">Tipo</h4>
                  </div>
                  <p className="text-gray-700 text-sm">{business.category}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Acerca de este negocio</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {business.description || `${business.name} es un negocio dedicado a ${business.category.toLowerCase()} con excelente servicio y atención al cliente. Ubicado en una zona estratégica, ofrecemos productos y servicios de calidad con precios competitivos.`}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleContact}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition"
                >
                  Contactar Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BusinessCard
