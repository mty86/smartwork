import { useState, useEffect } from 'react'

/**
 * Hook para manejar imágenes locales persistidas en localStorage
 * @param {string} storageKey - Clave única para almacenar las imágenes
 * @param {number} maxImages - Máximo número de imágenes permitidas (por defecto 10)
 * @returns {Object} { images, addImages, deleteImage, clearAll }
 */
export const useLocalImage = (storageKey, maxImages = 10) => {
  const [images, setImages] = useState([])

  // Cargar imágenes del localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        setImages(JSON.parse(stored))
      }
    } catch (error) {
      console.error(`Error cargando imágenes de ${storageKey}:`, error)
    }
  }, [storageKey])

  // Guardar imágenes en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(images))
    } catch (error) {
      console.error(`Error guardando imágenes en ${storageKey}:`, error)
    }
  }, [storageKey, images])

  /**
   * Agregar nuevas imágenes desde archivos
   * @param {FileList} files - Lista de archivos del input
   */
  const addImages = (files) => {
    const fileArray = Array.from(files)
    let addedCount = 0

    fileArray.forEach(file => {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        console.warn(`${file.name} no es una imagen válida`)
        return
      }

      // Validar tamaño máximo (5MB)
      if (file.size > 5 * 1024 * 1024) {
        console.warn(`${file.name} es demasiado grande (máx 5MB)`)
        return
      }

      // Validar límite de imágenes
      if (images.length + addedCount >= maxImages) {
        console.warn(`Límite de ${maxImages} imágenes alcanzado`)
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        setImages(prev => {
          if (prev.length < maxImages) {
            return [
              ...prev,
              {
                id: Date.now() + Math.random(),
                src: event.target.result,
                uploadedAt: new Date().toISOString(),
                filename: file.name,
              },
            ]
          }
          return prev
        })
      }
      reader.readAsDataURL(file)
      addedCount++
    })
  }

  /**
   * Eliminar una imagen por ID
   * @param {number|string} imageId - ID de la imagen a eliminar
   */
  const deleteImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
  }

  /**
   * Eliminar todas las imágenes
   */
  const clearAll = () => {
    setImages([])
  }

  return {
    images,
    addImages,
    deleteImage,
    clearAll,
    count: images.length,
    isEmpty: images.length === 0,
  }
}
