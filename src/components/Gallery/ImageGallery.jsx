import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

/**
 * Componente para mostrar galería de imágenes locales con carrusel
 * @param {string} title - Título de la galería
 * @param {string} storageKey - Clave de localStorage para buscar imágenes
 * @param {number} maxDisplay - Máximo número de imágenes a mostrar
 */
export const ImageGallery = ({ title, storageKey, maxDisplay = 6 }) => {
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const imageList = JSON.parse(stored)
        setImages(imageList.slice(0, maxDisplay))
      }
    } catch (error) {
      console.error(`Error cargando galería ${storageKey}:`, error)
    }
  }, [storageKey, maxDisplay])

  if (images.length === 0) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const imageSrc = images[currentIndex]?.src || images[currentIndex]

  return (
    <div className="mb-8">
      {title && (
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      )}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg h-64 md:h-80 lg:h-96 group">
        <img
          src={imageSrc}
          alt={`Galería ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}

        {/* Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1}/{images.length}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex ? 'border-white scale-110' : 'border-gray-400 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img.src || img}
                  alt={`Thumb ${idx}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Image Counter and Info */}
      <div className="mt-4 text-center text-gray-600">
        <p className="text-sm">Mostrando {images.length} imágenes locales</p>
      </div>
    </div>
  )
}
