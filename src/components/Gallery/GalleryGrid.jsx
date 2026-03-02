import { useState, useEffect } from 'react'

/**
 * Componente para mostrar grid de galerías de múltiples usuarios/negocios
 * @param {Array} items - Array con {id, name, storageKey, category}
 * @param {string} title - Título de la sección
 */
export const GalleryGrid = ({ items = [], title = 'Galerías Destacadas' }) => {
  const [galleries, setGalleries] = useState([])

  useEffect(() => {
    const loadedGalleries = items
      .map(item => {
        try {
          const stored = localStorage.getItem(item.storageKey)
          if (stored) {
            const images = JSON.parse(stored)
            return {
              ...item,
              images,
              image: images[0]?.src || images[0],
              hasImages: images.length > 0,
            }
          }
        } catch (error) {
          console.error(`Error loading ${item.storageKey}:`, error)
        }
        return { ...item, hasImages: false }
      })
      .filter(g => g.hasImages)

    setGalleries(loadedGalleries)
  }, [items])

  if (galleries.length === 0) return null

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Explora las mejores imágenes de nuestros proveedores
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Badge */}
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {item.images.length} fotos
                </div>

                {/* Category Badge */}
                {item.category && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {item.category}
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 truncate">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                )}
                
                {/* Gallery Info */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>📸 {item.images.length} imágenes</span>
                  <span className="text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver más →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
