import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FiArrowRight, FiChevronRight } from 'react-icons/fi'
import { ImageGallery } from '../../components/Gallery/ImageGallery'
import { GalleryGrid } from '../../components/Gallery/GalleryGrid'
import { HeroImageEditor } from '../../components/HeroImageEditor/HeroImageEditor'
import { useAuth } from '../../hooks/useAuth'
import { loadUsers } from '../../utils/storage'
import { DynamicHeader } from '../../components/Headers/DynamicHeader'
import { ClientInterface } from '../../components/Interfaces/ClientInterface'
import { ProviderInterface } from '../../components/Interfaces/ProviderInterface'
import { UserTypeSeparator } from '../../components/Interfaces/UserTypeSeparator'

// Importar imágenes de assets
import oficiosImg from '../../assets/images/oficios.jpg'
import profesionesImg from '../../assets/images/profesiones.jpg'

// Componente para mostrar imagen del hero
const HeroImage = () => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    try {
      // Primero intenta cargar la imagen guardada en localStorage (si el usuario la subió)
      const stored = localStorage.getItem('hero_image')
      if (stored) {
        setImage(stored)
        return
      }

    } catch (error) {
      console.error('Error cargando imagen hero:', error)
    }
    let mounted = true
    const tryFetchStatic = async () => {
      try {
        const resp = await fetch('/src/assets/images/image.jpg', { method: 'HEAD' })
        if (resp.ok && mounted) {
          setImage('/src/assets/images/image.jpg')
        }
      } catch (err) {
        // no existe o error de red; usar fallback
      }
    }
    tryFetchStatic()
    return () => { mounted = false }
  }, [])

  if (!image) return ''

  return <img src={image} alt="Hero" className="w-full h-full object-cover" />
}

export const Home = () => {
  const { isAuthenticated, userRole } = useAuth()
  const [providers, setProviders] = useState([])
  const [businesses, setBusinesses] = useState([])

  // Cargar datos de localStorage para secciones con imágenes
  useEffect(() => {
    // Simulamos cargar lista de proveedores usando el contexto o mock
    // Por ahora mostramos galerías si existen en localStorage
    const loadProvidersFromStorage = () => {
      const storedKeys = Object.keys(localStorage)
      const providerItems = storedKeys
        .filter(key => key.startsWith('provider_') && key.endsWith('_images'))
        .map((key, idx) => {
          const userId = key.replace('provider_', '').replace('_images', '')
          return {
            id: userId,
            name: `Proveedor ${idx + 1}`,
            storageKey: key,
            category: 'profesional',
          }
        })
      return providerItems
    }

    const loadBusinessesFromStorage = () => {
      const storedKeys = Object.keys(localStorage)
      const businessItems = storedKeys
        .filter(key => key.startsWith('business_') && key.endsWith('_images'))
        .map((key, idx) => {
          const userId = key.replace('business_', '').replace('_images', '')
          return {
            id: userId,
            name: `Negocio ${idx + 1}`,
            storageKey: key,
            category: 'negocio',
          }
        })
      return businessItems
    }

    setProviders(loadProvidersFromStorage())
    setBusinesses(loadBusinessesFromStorage())
  }, [])

  // Si el usuario está autenticado, mostrar interfaz personalizada
  if (isAuthenticated) {
    return (
      <div>
        <DynamicHeader />
        {userRole === 'client' && <ClientInterface backgroundImage={oficiosImg} />}
        {['professional', 'trade', 'business'].includes(userRole) && <ProviderInterface backgroundImage={profesionesImg} />}
        {userRole === 'admin' && (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Panel de Administración</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-2xl font-bold text-red-600">{loadUsers().length}</div>
                  <p className="text-gray-600">Usuarios Totales</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-2xl font-bold text-blue-600">{loadUsers().filter(u=>['professional','trade','business'].includes(u.role)).length}</div>
                  <p className="text-gray-600">Proveedores</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-2xl font-bold text-green-600">{loadUsers().filter(u=>u.role==='client').length}</div>
                  <p className="text-gray-600">Clientes</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-2xl font-bold text-purple-600">{loadUsers().filter(u=>u.status==='pending').length}</div>
                  <p className="text-gray-600">Por aprobar</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Si no está autenticado, mostrar la página de inicio pública con separador
  return <UserTypeSeparator 
    providers={providers} 
    businesses={businesses}
    clientHeroImage={oficiosImg}
    providerHeroImage={profesionesImg}
  />
}

export default Home
