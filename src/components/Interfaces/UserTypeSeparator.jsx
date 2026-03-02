import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useUserPanel } from '../../context/UserPanelContext'
import { FiArrowRight, FiChevronRight } from 'react-icons/fi'

/**
 * UserTypeSeparator - Componente que separa la interfaz en dos paneles:
 * Cliente (busca servicios) y Proveedor (ofrece servicios)
 * 
 * Props:
 * - clientHeroImage: URL de imagen de fondo para la sección hero de clientes
 * - providerHeroImage: URL de imagen de fondo para la sección hero de proveedores
 */
export const UserTypeSeparator = ({ 
  providers, 
  businesses,
  clientHeroImage = null,
  providerHeroImage = null
}) => {
  const { activePanel, setActivePanel } = useUserPanel()
  
  // Estilos para hero sections con imagen opcional
  const clientHeroStyle = clientHeroImage 
    ? {
        backgroundImage: `linear-gradient(rgba(55, 111, 71, 0.7), rgba(12, 74, 35, 0.7)), url(${clientHeroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }
    : {}

  const providerHeroStyle = providerHeroImage
    ? {
        backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.7), rgba(30, 58, 138, 0.7)), url(${providerHeroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }
    : {}
  
  // Categorías para clientes
  const categoriesClient = [
    { name: 'Fontanería', icon: '🔧', color: 'bg-blue-100' },
    { name: 'Electricidad', icon: '⚡', color: 'bg-yellow-100' },
    { name: 'Carpintería', icon: '🪛', color: 'bg-emerald-100' },
    { name: 'Limpieza', icon: '🧹', color: 'bg-green-100' },
    { name: 'Reparación', icon: '🔩', color: 'bg-red-100' },
    { name: 'Transportes', icon: '🚚', color: 'bg-purple-100' }
  ]

  // Profesionales recomendados
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

  // Ventajas para proveedores
  const providerBenefits = [
    {
      icon: '👥',
      title: 'Alcanza Clientes',
      description: 'Conecta con miles de clientes potenciales en tu zona'
    },
    {
      icon: '📊',
      title: 'Gestiona tu Negocio',
      description: 'Panel completo para administrar tus servicios y ganancias'
    },
    {
      icon: '⭐',
      title: 'Construir Reputación',
      description: 'Recibe calificaciones y reseñas de clientes satisfechos'
    },
    {
      icon: '💰',
      title: 'Aumenta Ingresos',
      description: 'Planes premium para mayor visibilidad'
    }
  ]

  // Planes disponibles
  const plans = [
    {
      name: 'Básico',
      price: 'Gratis',
      features: ['Perfil básico', 'Hasta 5 servicios', 'Contacto directo']
    },
    {
      name: 'Profesional',
      price: '$19.99',
      features: ['Perfil premium', 'Servicios ilimitados', 'Estadísticas', 'Soporte prioritario']
    },
    {
      name: 'Premium',
      price: '$49.99',
      features: ['Todo de Profesional', 'Publicidad destacada', 'Análisis avanzado', 'Consultoría']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* PANEL CLIENTE */}
      {activePanel === 'client' && (
        <div>
          {/* Hero Cliente */}
          <section 
            className={clientHeroImage ? "text-white py-16 md:py-24" : "bg-gradient-to-r from-emerald-700 to-emerald-900 text-white py-16 md:py-24"}
            style={clientHeroStyle}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Encuentra el Mejor Profesional
                  </h1>
                  <p className="text-lg mb-6 text-emerald-100">
                    Conecta con profesionistas, personas con oficios y negocios certificados. Compara, califica y elige al mejor.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/professionals"
                      className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
                    >
                      Explorar Servicios <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block text-center">
                  <div className="text-7xl"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Barra de Búsqueda */}
          <section className="bg-white py-8 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">¿Qué necesitas?</h2>
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Busca un servicio o profesional..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-emerald-600"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-700 text-white p-2 rounded hover:bg-emerald-800">
                  🔍
                </button>
              </div>
            </div>
          </section>

          {/* Categorías */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Categorías Populares</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categoriesClient.map((category, index) => (
                  <Link
                    key={index}
                    to={`/professionals?category=${category.name}`}
                    className={`${category.color} rounded-lg p-6 text-center hover:shadow-lg transition cursor-pointer`}
                  >
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <p className="font-medium text-gray-800 text-sm">{category.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Profesionales Recomendados */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Profesionales Recomendados</h2>
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
          </section>

          {/* CTA Registrarse */}
          <section className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para encontrar el mejor servicio?</h2>
              <p className="text-lg mb-8 text-emerald-100">Regístrate ahora y accede a todos nuestros servicios profesionales</p>
              <Link
                to="/register"
                className="inline-block bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Crear Cuenta como Cliente
              </Link>
            </div>
          </section>
        </div>
      )}

      {/* PANEL PROVEEDOR */}
      {activePanel === 'provider' && (
        <div>
          {/* Hero Proveedor */}
          <section 
            className={providerHeroImage ? "text-white py-16 md:py-24" : "bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24"}
            style={providerHeroStyle}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Convierte tu Negocio en Digital
                  </h1>
                  <p className="text-lg mb-6 text-blue-100">
                    Ofrece tus servicios a miles de clientes. Gestiona tu negocio, gana más dinero y crece profesionalmente.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/register"
                      className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
                    >
                      Comenzar como Proveedor <FiArrowRight className="ml-2" />
                    </Link>
                    <Link
                      to="/login"
                      className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      Inicia Sesión
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block text-center">
                  <div className="text-7xl"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Beneficios */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">¿Por Qué Unirse a SmartWorks?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {providerBenefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="text-5xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cómo Funciona */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">3 Pasos Simples</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: '1',
                    title: 'Crea tu Perfil',
                    description: 'Registra tu negocio y completa tu información profesional'
                  },
                  {
                    step: '2',
                    title: 'Ofrece Servicios',
                    description: 'Añade tus servicios con descripciones y precios'
                  },
                  {
                    step: '3',
                    title: 'Gana Clientes',
                    description: 'Recibe solicitudes y comienza a ganar dinero de inmediato'
                  }
                ].map((step, index) => (
                  <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Planes */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Nuestros Planes</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-8 ${
                      index === 1
                        ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl'
                        : 'bg-gray-50 border-2 border-gray-200'
                    }`}
                  >
                    <div className={`text-3xl font-bold mb-2 ${index === 1 ? 'text-white' : 'text-gray-800'}`}>
                      {plan.name}
                    </div>
                    <div className={`text-4xl font-bold mb-6 ${index === 1 ? 'text-white' : 'text-blue-600'}`}>
                      {plan.price}
                      <span className={`text-sm ${index === 1 ? 'text-blue-100' : 'text-gray-600'}`}>/mes</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className={index === 1 ? 'text-white' : 'text-blue-600'}>✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-2 rounded-lg font-bold transition ${
                        index === 1
                          ? 'bg-white text-blue-600 hover:bg-gray-100'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Elegir Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonios */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Lo que Dicen Nuestros Proveedores</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Roberto Martínez',
                    role: 'Electricista',
                    comment: 'Con SmartWorks duplicué mis ingresos en 3 meses',
                    rating: 5
                  },
                  {
                    name: 'Sandra Gómez',
                    role: 'Limpieza Profesional',
                    comment: 'La plataforma es muy fácil de usar y recibo muchas solicitudes',
                    rating: 5
                  },
                  {
                    name: 'Diego López',
                    role: 'Carpintería',
                    comment: 'Excelente forma de expandir mi negocio sin gastos de publicidad',
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                    <div className="border-t pt-4">
                      <p className="font-bold text-gray-800">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para Crecer?</h2>
              <p className="text-lg mb-8 text-blue-100">Únete a SmartWorks y empieza a ganar dinero hoy mismo</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Registrate como Proveedor
                </Link>
                <Link
                  to="/login"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Inicia Sesión
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
