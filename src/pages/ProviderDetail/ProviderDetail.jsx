import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin, FiStar } from 'react-icons/fi'
import { openWhatsApp } from '../../utils/helpers'
import { useAuth } from '../../hooks/useAuth'
import RatingComponent from '../../components/Ratings/RatingComponent'

export const ProviderDetail = () => {
  const { id } = useParams()
  const { isAuthenticated, user } = useAuth()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  // Mock provider data - será reemplazado por datos de API
  const provider = {
    id,
    name: 'Dr. Juan Pérez García',
    type: 'Profesional',
    specialty: 'Médico General',
    image: 'https://via.placeholder.com/200x200?text=Doctor',
    address: 'Calle Central 456, Consultorio 301',
    phone: '1234567890',
    whatsapp: '1234567890',
    email: 'dr.juanperez@email.com',
    rating: 4.5,
    reviews: [
      {
        id: 1,
        author: 'María López',
        rating: 5,
        comment: 'Excelente médico, muy profesional y atento',
        date: '2024-01-15',
      },
      {
        id: 2,
        author: 'Carlos García',
        rating: 4,
        comment: 'Buen servicio, consulta rápida',
        date: '2024-01-10',
      },
    ],
    images: [
      'https://via.placeholder.com/300x200?text=Consultorio1',
      'https://via.placeholder.com/300x200?text=Consultorio2',
    ],
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para dejar una reseña')
      return
    }
    if (rating === 0) {
      alert('Por favor selecciona una calificación')
      return
    }
    // Aquí iría la lógica de envío a API
    setReviewSubmitted(true)
    setTimeout(() => {
      setRating(0)
      setComment('')
      setReviewSubmitted(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {provider.name}
              </h1>
              <p className="text-lg text-blue-600 mb-2">
                {provider.type} - {provider.specialty}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <FiStar className="text-yellow-400" fill="currentColor" />
                <span className="font-semibold">{provider.rating}</span>
                <span className="text-gray-600">({provider.reviews.length} reseñas)</span>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => openWhatsApp(provider.whatsapp, 'Hola, quisiera solicitar tu servicio')}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  💬 WhatsApp
                </button>
                <a
                  href={`tel:${provider.phone}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <FiPhone /> Llamar
                </a>
                <a
                  href={`mailto:${provider.email}`}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <FiMail /> Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Información
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FiMapPin className="text-blue-600" size={20} />
              <span>{provider.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-blue-600" size={20} />
              <span>{provider.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="text-blue-600" size={20} />
              <span>{provider.email}</span>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {provider.images.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Galería
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {provider.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Galería ${idx + 1}`}
                  className="rounded-lg w-full h-40 object-cover cursor-pointer hover:opacity-75 transition"
                />
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Reseñas y Comentarios
          </h2>

          {/* Review Form */}
          {isAuthenticated ? (
            <form onSubmit={handleSubmitReview} className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-4">Deja tu reseña</h3>
              <div className="mb-4">
                <label className="block mb-2">Calificación</label>
                <RatingComponent
                  rating={rating}
                  onRatingChange={setRating}
                  editable={true}
                />
              </div>
              <textarea
                placeholder="Cuéntanos tu experiencia..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                {reviewSubmitted ? 'Enviando...' : 'Enviar Reseña'}
              </button>
            </form>
          ) : (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="text-gray-700">
                <a href="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Inicia sesión
                </a> para dejar una reseña
              </p>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {provider.reviews.map(review => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{review.author}</h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={16}
                      className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderDetail
