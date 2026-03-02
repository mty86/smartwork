import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { FiSearch, FiStar, FiMessageSquare, FiClock, FiArrowRight } from 'react-icons/fi'
import { useState } from 'react'
import { ProviderCard } from '../Cards/ProviderCard'
import { CategoryCard } from '../Cards/CategoryCard'

/**
 * ClientInterface - Interfaz personalizada para clientes
 * Muestra opciones para buscar, ver favoritos y solicitar servicios
 * 
 * Props:
 * - backgroundImage: URL de imagen de fondo opcional
 */
export const ClientInterface = ({ backgroundImage = null }) => {
  const { user } = useAuth()
  const [activeFilter, setActiveFilter] = useState('all')

  const containerStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }
    : {}

  // Estadísticas del cliente
  const stats = [
    {
      icon: <FiSearch className="text-3xl text-blue-500" />,
      label: 'Búsquedas',
      value: user?.searches || 0,
      description: 'Profesionales buscados'
    },
    {
      icon: <FiStar className="text-3xl text-yellow-500" />,
      label: 'Favoritos',
      value: user?.favorites || 0,
      description: 'Guardados'
    },
    {
      icon: <FiMessageSquare className="text-3xl text-green-500" />,
      label: 'Reseñas',
      value: user?.reviews || 0,
      description: 'Dejadas'
    },
    {
      icon: <FiClock className="text-3xl text-purple-500" />,
      label: 'Tiempo Ahorrado',
      value: user?.timeSaved || 0,
      description: 'Horas'
    }
  ]

  // Categorías para cliente
  const categories = [
    { name: 'Fontanería', icon: '🔧', color: 'bg-blue-100' },
    { name: 'Electricidad', icon: '⚡', color: 'bg-yellow-100' },
    { name: 'Carpintería', icon: '🪛', color: 'bg-emerald-100' },
    { name: 'Limpieza', icon: '🧹', color: 'bg-green-100' },
    { name: 'Reparación', icon: '🔩', color: 'bg-red-100' },
    { name: 'Transportes', icon: '🚚', color: 'bg-purple-100' }
  ]

  // Proveedores recomendados
  const recommendedProviders = [
    {
      id: 1,
      name: 'Juan Pérez',
      specialty: 'Fontanería',
      rating: 4.8,
      reviews: 45,
      image: '👨‍🔧'
    },
    {
      id: 2,
      name: 'María García',
      specialty: 'Electricidad',
      rating: 4.9,
      reviews: 52,
      image: '👩‍🔧'
    },
    {
      id: 3,
      name: 'Carlos López',
      specialty: 'Carpintería',
      rating: 4.7,
      reviews: 38,
      image: '👨‍🔨'
    }
  ]

  return (
    <div 
      className={backgroundImage ? "min-h-screen py-12" : "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12"}
      style={containerStyle}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Bienvenida personalizada */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Bienvenido, {user?.firstName}
          </h2>
          <p className="text-gray-600 text-lg">
            Encuentra el mejor profesional para tus necesidades
          </p>
        </div>

        {/* Estadísticas del Cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-gray-100">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
              <p className="text-gray-500 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Sección de Búsqueda  */}
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-lg shadow-lg p-8 mb-12 text-white">
          <h3 className="text-2xl font-bold mb-4">¿Qué necesitas?</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Busca un servicio o profesional..."
              className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-700 text-white p-2 rounded hover:bg-emerald-800">
              <FiSearch size={20} />
            </button>
          </div>
        </div>

        {/* Categorías */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Categorías Populares</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/professionals?category=${category.name}`}
                className={`${category.color} rounded-lg p-6 text-center hover:shadow-lg transition cursor-pointer`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <p className="font-medium text-gray-800">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Profesionales Recomendados */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Profesionales Recomendados</h3>
            <Link to="/professionals" className="text-emerald-700 hover:text-emerald-800 flex items-center gap-2">
              Ver todos <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProviders.map((provider) => (
              <div key={provider.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
                    {provider.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{provider.name}</h4>
                    <p className="text-gray-600 text-sm">{provider.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < Math.floor(provider.rating) ? '⭐' : '☆'}</span>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">({provider.reviews})</span>
                </div>
                <button className="w-full bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 transition font-medium">
                  Solicitar Servicio
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Planes Premium */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">¿Quieres más beneficios?</h3>
          <p className="mb-6 text-blue-100">Suscríbete a un plan premium para acceso prioritario a profesionales</p>
          <Link
            to="/plans"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
          >
            Ver Planes
          </Link>
        </div>
      </div>
    </div>
  )
}
