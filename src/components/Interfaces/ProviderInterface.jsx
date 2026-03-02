import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { FiTrendingUp, FiStar, FiEye, FiAward, FiArrowRight } from 'react-icons/fi'
import { useState } from 'react'

/**
 * ProviderInterface - Interfaz personalizada para proveedores (profesionales, trades, negocios)
 * Muestra estadísticas, clientes y opciones de gestión de servicios
 * 
 * Props:
 * - backgroundImage: URL de imagen de fondo opcional
 */
export const ProviderInterface = ({ backgroundImage = null }) => {
  const { user, userRole } = useAuth()
  const [activeSection, setActiveSection] = useState('overview')

  const containerStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }
    : {}

  // Configuración según tipo de proveedor
  const providerConfig = {
    professional: {
      title: 'Panel de Profesional',
      icon: '👨‍💼',
      color: 'from-blue-500 to-blue-700',
      viewsLabel: 'Visitas a tu Perfil',
      servicesLabel: 'Servicios Activos'
    },
    trade: {
      title: 'Panel de Oficios',
      icon: '🔧',
      color: 'from-amber-500 to-amber-700',
      viewsLabel: 'Trabajos Visitados',
      servicesLabel: 'Trabajos en Progreso'
    },
    business: {
      title: 'Panel de Negocio',
      icon: '🏢',
      color: 'from-green-500 to-green-700',
      viewsLabel: 'Visitas',
      servicesLabel: 'Servicios Ofrecidos'
    }
  }

  const config = providerConfig[userRole] || providerConfig.professional

  // Estadísticas del Proveedor
  const stats = [
    {
      icon: <FiEye className="text-3xl text-blue-500" />,
      label: config.viewsLabel,
      value: user?.profileViews || 234,
      change: '+12%'
    },
    {
      icon: <FiStar className="text-3xl text-yellow-500" />,
      label: 'Calificación',
      value: user?.rating || 4.8,
      change: '18 reseñas'
    },
    {
      icon: <FiTrendingUp className="text-3xl text-green-500" />,
      label: config.servicesLabel,
      value: user?.activeServices || 12,
      change: '+3 este mes'
    },
    {
      icon: <FiAward className="text-3xl text-purple-500" />,
      label: 'Posición',
      value: user?.position || 3,
      change: 'en ranking'
    }
  ]

  // Clientes recientes
  const recentClients = [
    {
      id: 1,
      name: 'Carlos Martínez',
      service: 'Reparación Fontanería',
      status: 'Completado',
      rating: 5,
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Ana García',
      service: 'Instalación Luz',
      status: 'En Progreso',
      rating: 4,
      date: '2024-01-18'
    },
    {
      id: 3,
      name: 'Jorge López',
      service: 'Reparación Puerta',
      status: 'Pendiente',
      rating: 0,
      date: '2024-01-20'
    }
  ]

  // Acciones rápidas
  const quickActions = [
    { icon: '➕', label: 'Nuevo Servicio', link: '/dashboard/provider?tab=services' },
    { icon: '🖼️', label: 'Galería', link: '/dashboard/provider?tab=gallery' },
    { icon: '⚙️', label: 'Configuración', link: '/dashboard/provider?tab=settings' },
    { icon: '📊', label: 'Reportes', link: '/dashboard/provider?tab=reports' }
  ]

  // Objetivo mensual
  const monthlyGoal = {
    current: 8500,
    target: 10000,
    percentage: 85
  }

  return (
    <div 
      className={backgroundImage ? "min-h-screen py-12" : "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12"}
      style={containerStyle}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado de Bienvenida */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            {config.title}
          </h2>
          <p className="text-gray-600 text-lg">
            Gestiona tu negocio y atrae más clientes
          </p>
        </div>

        {/* Estadísticas Principales */}
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
                <span className="text-green-600 text-sm font-bold">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Acciones Rápidas */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition hover:scale-105"
              >
                <div className="text-4xl mb-3">{action.icon}</div>
                <p className="font-medium text-gray-800">{action.label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Dos Columnas: Meta Mensual y Clientes Recientes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Meta Mensual */}
          <div className="lg:col-span-1">
            <div className={`bg-gradient-to-br ${config.color} text-white rounded-lg shadow-md p-8 h-full`}>
              <h3 className="text-xl font-bold mb-6">Meta Este Mes</h3>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-bold">${monthlyGoal.current.toLocaleString()}</span>
                  <span className="text-sm text-white text-opacity-80">${monthlyGoal.target.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
                  <div
                    className="bg-white rounded-full h-3 transition-all duration-500"
                    style={{ width: `${monthlyGoal.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-white text-opacity-80 mt-2">
                  {monthlyGoal.percentage}% completado
                </p>
              </div>
              <div className="text-3xl font-bold">
                ${(monthlyGoal.target - monthlyGoal.current).toLocaleString()}
              </div>
              <p className="text-white text-opacity-80">falta para la meta</p>
            </div>
          </div>

          {/* Clientes Recientes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Clientes Recientes</h3>
                <Link to="/dashboard/provider?tab=clients" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  Ver todos <FiArrowRight />
                </Link>
              </div>
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{client.name}</h4>
                      <p className="text-gray-600 text-sm">{client.service}</p>
                      <p className="text-gray-500 text-xs mt-1">{client.date}</p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                        client.status === 'Completado' ? 'bg-green-100 text-green-800' :
                        client.status === 'En Progreso' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {client.status}
                      </div>
                      {client.rating > 0 && (
                        <div className="text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < client.rating ? '⭐' : '☆'}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Premium */}
        <div className={`bg-gradient-to-r ${config.color} rounded-lg shadow-lg p-8 text-white text-center`}>
          <h3 className="text-2xl font-bold mb-2">Potencia tu Negocio</h3>
          <p className="mb-6 text-white text-opacity-90">Actualiza a un plan premium para obtener más visibilidad y oportunidades</p>
          <Link
            to="/plans"
            className="bg-white text-gray-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
          >
            Explorar Planes
          </Link>
        </div>
      </div>
    </div>
  )
}
