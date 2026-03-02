import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import { useUserPanel } from '../../context/UserPanelContext'
import { FiMenu, FiX } from 'react-icons/fi'

export const Navbar = () => {
  const { isAuthenticated, user, userRole, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { activePanel, setActivePanel } = useUserPanel()

  const navByPanel = {
    client: [
      { label: 'Inicio', to: '/' },
      { label: 'Profesionistas', to: '/professionals' },
      { label: 'Oficios', to: '/trades' },
      { label: 'Negocios', to: '/businesses' },
    ],
    provider: [
      { label: 'Inicio', to: '/' },
      { label: 'Planes', to: '/plans' },
      { label: 'Ingresar', to: '/login' },
      { label: 'Registrate', to: '/register' },
    ]
  }

  const currentNav = navByPanel[activePanel] || navByPanel.client

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const getDashboardLink = () => {
    if (userRole === 'admin') return '/admin'
    if (userRole === 'client') return '/dashboard/client'
    if (['professional', 'trade', 'business'].includes(userRole)) return '/dashboard/provider'
    return '/'
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">SmartWorks</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* If user is authenticated keep existing behavior */}
            {isAuthenticated ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                  Inicio
                </Link>
                <Link to="/professionals" className="text-gray-700 hover:text-blue-600">
                  Profesionistas
                </Link>
                <Link to="/trades" className="text-gray-700 hover:text-blue-600">
                  Oficios
                </Link>
                <Link to="/businesses" className="text-gray-700 hover:text-blue-600">
                  Negocios
                </Link>
                <Link to="/plans" className="text-gray-700 hover:text-blue-600 font-semibold">
                  Planes
                </Link>

                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Hola, {user?.firstName}</span>
                  <Link to={getDashboardLink()} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Panel
                  </Link>
                  <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">Cerrar Sesión</button>
                </div>
              </>
            ) : (
              // Not authenticated: show toggle + nav based on selected panel
              <>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActivePanel('client')}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      activePanel === 'client' ? 'bg-emerald-700 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    👤 Soy Cliente
                  </button>
                  <button
                    onClick={() => setActivePanel('provider')}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      activePanel === 'provider' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    💼 Soy Proveedor
                  </button>
                </div>

                {/* Render dynamic nav items */}
                {currentNav.map((item) => (
                  item.label === 'Ingresar' ? (
                    <Link key={item.label} to={item.to} className="text-blue-600 hover:text-blue-800 font-medium">
                      {item.label}
                    </Link>
                  ) : item.label === 'Registrate' ? (
                    <Link key={item.label} to={item.to} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      {item.label}
                    </Link>
                  ) : (
                    <Link key={item.label} to={item.to} className="text-gray-700 hover:text-blue-600">
                      {item.label}
                    </Link>
                  )
                ))}
                {/* Para el panel cliente, siempre mostrar Iniciar Sesión / Registrarse */}
                {activePanel === 'client' && (
                  <div className="flex items-center space-x-3">
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Iniciar Sesión</Link>
                    <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Registrarse</Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="space-y-2 pt-4">
              {/* Mobile nav: render based on auth + activePanel */}
              {isAuthenticated ? (
                <>
                  <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
                  <Link to="/professionals" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Profesionistas</Link>
                  <Link to="/trades" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Oficios</Link>
                  <Link to="/businesses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Negocios</Link>
                  <Link to="/plans" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold text-blue-600" onClick={() => setMobileMenuOpen(false)}>💰 Planes</Link>
                  <Link to={getDashboardLink()} className="block px-4 py-2 bg-green-600 text-white hover:bg-green-700" onClick={() => setMobileMenuOpen(false)}>Panel</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Cerrar Sesión</button>
                </>
              ) : (
                // Not authenticated: show mobile nav based on activePanel
                <>
                  {currentNav.map((item) => (
                    item.label === 'Ingresar' ? (
                      <Link key={item.label} to={item.to} className="block px-4 py-2 text-blue-600 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
                    ) : item.label === 'Registrate' ? (
                      <Link key={item.label} to={item.to} className="block px-4 py-2 bg-blue-600 text-white hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
                    ) : (
                      <Link key={item.label} to={item.to} className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
                    )
                  ))}

                  {/* En mobile, si el panel es cliente, añadir Iniciar Sesión y Registrarse */}
                  {activePanel === 'client' && (
                    <>
                      <Link to="/login" className="block px-4 py-2 text-blue-600 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Iniciar Sesión</Link>
                      <Link to="/register" className="block px-4 py-2 bg-blue-600 text-white hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>Registrarse</Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
