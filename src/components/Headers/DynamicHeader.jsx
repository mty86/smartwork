import { useAuth } from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { FiChevronDown, FiLogOut, FiHome, FiTrendingUp, FiAward } from 'react-icons/fi'
import { useState } from 'react'

/**
 * DynamicHeader - Header que cambia dinámicamente según el rol del usuario
 * Muestra opciones y estilos personalizados para cada tipo de usuario
 */
export const DynamicHeader = () => {
  const { isAuthenticated, user, userRole, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Definir configuración por rol
  const roleConfig = {
    client: {
      color: 'from-emerald-700 to-emerald-900',
      icon: '👤',
      title: 'Panel de Cliente',
      subtitle: 'Solicita servicios profesionales',
      options: [
        { label: 'Mis Solicitudes', link: '/dashboard/client', icon: '📋' },
        { label: 'Favoritos', link: '/dashboard/client?tab=favorites', icon: '⭐' },
        { label: 'Reseñas', link: '/dashboard/client?tab=reviews', icon: '💬' },
        { label: 'Perfil', link: '/dashboard/client?tab=profile', icon: '👤' },
      ]
    },
    professional: {
      color: 'from-blue-500 to-blue-700',
      icon: '👨‍💼',
      title: 'Panel de Profesional',
      subtitle: 'Gestiona tus servicios',
      options: [
        { label: 'Mi Perfil', link: '/dashboard/provider?tab=profile', icon: '👤' },
        { label: 'Mis Servicios', link: '/dashboard/provider?tab=services', icon: '⚙️' },
        { label: 'Reseñas', link: '/dashboard/provider?tab=reviews', icon: '⭐' },
        { label: 'Estadísticas', link: '/dashboard/provider?tab=stats', icon: '📊' },
      ]
    },
    trade: {
      color: 'from-amber-500 to-amber-700',
      icon: '🔧',
      title: 'Panel de Oficios',
      subtitle: 'Gestiona tus trabajos',
      options: [
        { label: 'Mi Perfil', link: '/dashboard/provider?tab=profile', icon: '👤' },
        { label: 'Mis Trabajos', link: '/dashboard/provider?tab=services', icon: '🔨' },
        { label: 'Reseñas', link: '/dashboard/provider?tab=reviews', icon: '⭐' },
        { label: 'Ganancias', link: '/dashboard/provider?tab=earnings', icon: '💰' },
      ]
    },
    business: {
      color: 'from-green-500 to-green-700',
      icon: '🏢',
      title: 'Panel de Negocio',
      subtitle: 'Gestiona tu negocio',
      options: [
        { label: 'Perfil del Negocio', link: '/dashboard/provider?tab=profile', icon: '🏢' },
        { label: 'Servicios', link: '/dashboard/provider?tab=services', icon: '📦' },
        { label: 'Reseñas', link: '/dashboard/provider?tab=reviews', icon: '⭐' },
        { label: 'Análisis', link: '/dashboard/provider?tab=analytics', icon: '📈' },
      ]
    },
    admin: {
      color: 'from-red-500 to-red-700',
      icon: '🛡️',
      title: 'Panel de Administrador',
      subtitle: 'Gestiona la plataforma',
      options: [
        { label: 'Usuarios', link: '/admin?tab=users', icon: '👥' },
        { label: 'Categorías', link: '/admin?tab=categories', icon: '🗂️' },
        { label: 'Planes', link: '/admin?tab=plans', icon: '💳' },
        { label: 'Filtro', link: '/admin?tab=pending', icon: '🔍' },
        { label: 'Administradores', link: '/admin?tab=admins', icon: '👤' },
      ]
    }
  }

  const config = roleConfig[userRole] || roleConfig.client
  const currentOptions = isAuthenticated ? config.options : []

  return (
    <div className={`bg-gradient-to-r ${config.color} text-white shadow-xl`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          {/* Información del Usuario */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl font-bold border-2 border-white">
              {config.icon}
            </div>
            <div>
              {isAuthenticated ? (
                <>
                  <h1 className="text-3xl font-bold">{config.title}</h1>
                  <p className="text-white text-opacity-90">{config.subtitle}</p>
                  {user && (
                    <p className="text-white text-opacity-75 text-sm mt-1">
                      Bienvenido, {user.firstName} {user.lastName}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold">SmartWorks</h1>
                  <p className="text-white text-opacity-90">Plataforma de Servicios Profesionales</p>
                </>
              )}
            </div>
          </div>

          {/* Opciones del Usuario */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
              >
                <span className="font-medium">{user?.firstName}</span>
                <FiChevronDown size={20} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-2xl z-50">
                  <div className="p-2">
                    {currentOptions.map((option) => (
                      <Link
                        key={option.label}
                        to={option.link}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="text-lg">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                      </Link>
                    ))}
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        logout()
                        navigate('/')
                        setDropdownOpen(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded transition"
                    >
                      <FiLogOut size={18} />
                      <span className="font-medium">Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
