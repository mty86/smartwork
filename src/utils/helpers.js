/**
 * Funciones auxiliares generales
 */

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export const getInitials = (firstName, lastName) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0
  
  // Si es un array de números directamente
  if (typeof ratings[0] === 'number') {
    const sum = ratings.reduce((acc, rating) => acc + rating, 0)
    return parseFloat((sum / ratings.length).toFixed(1))
  }
  
  // Si es un array de objetos con propiedad 'rating'
  const sum = ratings.reduce((acc, review) => acc + (review.rating || 0), 0)
  return parseFloat((sum / ratings.length).toFixed(1))
}

export const sortProvidersByRating = (providers) => {
  return [...providers].sort((a, b) => {
    const ratingB = calculateAverageRating(b.reviews)
    const ratingA = calculateAverageRating(a.reviews)
    return ratingB - ratingA
  })
}

export const openWhatsApp = (phoneNumber, message = '') => {
  const cleanedPhone = phoneNumber.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)
  window.open(
    `https://wa.me/${cleanedPhone}?text=${encodedMessage}`,
    '_blank'
  )
}
