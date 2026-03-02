import { FiUpload, FiTrash2, FiX } from 'react-icons/fi'

/**
 * Componente reutilizable para cargar y gestionar imágenes
 * @param {Function} onImagesChange - Callback cuando cambian las imágenes
 * @param {Array} images - Array de imágenes actuales
 * @param {Function} onDeleteImage - Callback para eliminar una imagen
 * @param {number} maxImages - Número máximo de imágenes (por defecto 10)
 * @param {string} title - Título de la sección (opcional)
 * @param {boolean} allowMultiple - Permitir múltiples imágenes (por defecto true)
 */
export const ImageUploader = ({
  onImagesChange,
  images = [],
  onDeleteImage,
  maxImages = 10,
  title = 'Galería de Imágenes',
  allowMultiple = true,
  description = 'Haz clic o arrastra imágenes aquí',
}) => {
  const handleFileSelect = (e) => {
    onImagesChange(e.target.files)
    // Limpiar input para permitir subir el mismo archivo nuevamente
    e.target.value = ''
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('border-blue-600', 'bg-blue-50')
  }

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-blue-600', 'bg-blue-50')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('border-blue-600', 'bg-blue-50')
    onImagesChange(e.dataTransfer.files)
  }

  const remaining = maxImages - images.length
  const isFull = images.length >= maxImages

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      )}

      {/* Upload Area */}
      {!isFull && (
        <div
          className="border-2 border-dashed border-blue-400 rounded-lg p-8 text-center cursor-pointer hover:border-blue-600 transition mb-6"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple={allowMultiple}
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="image-uploader-input"
          />
          <label htmlFor="image-uploader-input" className="cursor-pointer block">
            <FiUpload className="mx-auto mb-2 text-blue-600" size={32} />
            <p className="text-blue-600 font-semibold mb-1">{description}</p>
            <p className="text-sm text-gray-500">
              Formatos soportados: JPG, PNG, GIF, WebP (Máx 5MB por imagen)
            </p>
            {allowMultiple && (
              <p className="text-xs text-gray-400 mt-2">
                {remaining} imágenes disponibles ({images.length}/{maxImages})
              </p>
            )}
          </label>
        </div>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-700">
              Imágenes cargadas ({images.length}/{maxImages})
            </h4>
            {images.length > 0 && allowMultiple && (
              <p className="text-sm text-gray-500">
                {remaining > 0 ? `${remaining} espacios disponibles` : 'Límite alcanzado'}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => {
              const imageSrc = image.src || image
              const imageId = image.id || imageSrc
              const filename =
                image.filename || image.uploadedAt || `Imagen ${images.indexOf(image) + 1}`

              return (
                <div
                  key={imageId}
                  className="relative group bg-gray-100 rounded-lg overflow-hidden"
                >
                  {/* Imagen */}
                  <img
                    src={imageSrc}
                    alt={filename}
                    className="w-full h-40 object-cover group-hover:opacity-75 transition"
                  />

                  {/* Info en hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-end">
                    <div className="w-full bg-black bg-opacity-70 text-white p-2 opacity-0 group-hover:opacity-100 transition">
                      <p className="text-xs truncate">{filename}</p>
                    </div>
                  </div>

                  {/* Botón delete */}
                  <button
                    onClick={() => onDeleteImage(imageId)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                    title="Eliminar imagen"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <FiX className="mx-auto mb-2 text-gray-400" size={32} />
          <p className="text-gray-500">No hay imágenes cargadas aún</p>
        </div>
      )}
    </div>
  )
}
