import { useState, useEffect } from 'react'
import { FiUpload, FiTrash2 } from 'react-icons/fi'

/**
 * Componente para editar la imagen del hero (solo para desarrollo)
 */
export const HeroImageEditor = () => {
  const [heroImage, setHeroImage] = useState(null)
  const [showEditor, setShowEditor] = useState(false)

  // Cargar imagen del hero al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hero_image')
      if (stored) {
        setHeroImage(stored)
      }
    } catch (error) {
      console.error('Error cargando imagen hero:', error)
    }
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida')
      return
    }

    // Validar tamaño (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('La imagen es muy grande (máx 10MB)')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target.result
      try {
        localStorage.setItem('hero_image', imageData)
        setHeroImage(imageData)
        alert('¡Imagen del hero actualizada exitosamente!')
      } catch (error) {
        console.error('Error guardando imagen:', error)
        alert('Error al guardar la imagen')
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDeleteImage = () => {
    if (window.confirm('¿Eliminar la imagen del hero?')) {
      try {
        localStorage.removeItem('hero_image')
        setHeroImage(null)
        alert('Imagen eliminada')
      } catch (error) {
        console.error('Error eliminando imagen:', error)
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Botón flotante */}
      <button
        onClick={() => setShowEditor(!showEditor)}
        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-full p-4 shadow-lg transition-all duration-300"
        title="Editar imagen del hero"
      >
        <FiUpload size={24} />
      </button>

      {/* Panel editor (modal) */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Editar Imagen del Hero
            </h3>

            {/* Preview actual */}
            {heroImage && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">Preview actual:</p>
                <img
                  src={heroImage}
                  alt="Hero preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Upload input */}
            <div className="mb-6">
              <label className="border-2 border-dashed border-blue-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-600 transition block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <FiUpload className="mx-auto mb-2 text-blue-600" size={32} />
                <p className="text-blue-600 font-semibold">Haz clic para seleccionar</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF (máx 10MB)</p>
              </label>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              {heroImage && (
                <button
                  onClick={handleDeleteImage}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                  <FiTrash2 /> Eliminar
                </button>
              )}
              <button
                onClick={() => setShowEditor(false)}
                className={`${heroImage ? 'flex-1' : 'w-full'} bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition`}
              >
                Cerrar
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              La imagen se guarda en tu navegador (localStorage)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
