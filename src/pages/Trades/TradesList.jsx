import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { FiSearch, FiArrowLeft } from 'react-icons/fi'
import ProviderCard from '../../components/Cards/ProviderCard'

const TradesList = () => {
  const { category } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const categoryData = location.state?.category || {}
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data de oficios por categoría
  const tradesByCategory = {
    1: [ // Carpintero
      { id: 1001, name: 'Juan Carpintero', specialty: 'Carpintería', category: 'Carpintero', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400', rating: [5, 4, 5, 5, 4], address: 'Taller Centro 1', phone: '+1234567890', email: 'juan@carpinteria.com' },
      { id: 1002, name: 'Carlos Muebles', specialty: 'Muebles Custom', category: 'Carpintero', image: 'https://images.unsplash.com/photo-1578026405371-5cbf6a226722?w=400', rating: [5, 5, 5, 4, 5], address: 'Taller Artesanal', phone: '+1234567891', email: 'carlos@muebles.com' },
    ],
    2: [ // Electricista
      { id: 1101, name: 'Electricista Jorge', specialty: 'Instalaciones', category: 'Electricista', image: 'https://images.unsplash.com/photo-1581092632275-097ca0d6b857?w=400', rating: [4, 5, 4, 5, 4], address: 'Servicios Eléctricos 24h', phone: '+1234567892', email: 'jorge@electric.com' },
      { id: 1102, name: 'Mario Electricista', specialty: 'Mantenimiento', category: 'Electricista', image: 'https://images.unsplash.com/photo-1511378228298-8805b0038dc3?w=400', rating: [5, 4, 5, 4, 5], address: 'Técnico Eléctrico', phone: '+1234567893', email: 'mario@electric.com' },
      { id: 1103, name: 'Luis Energía', specialty: 'Alta Tensión', category: 'Electricista', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', rating: [5, 5, 5, 5, 4], address: 'Empresa Eléctrica Plus', phone: '+1234567894', email: 'luis@electric.com' },
    ],
    3: [ // Plomero
      { id: 1201, name: 'Plomero Pedro', specialty: 'Fontanería', category: 'Plomero', image: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=400', rating: [4, 4, 5, 5, 4], address: 'Servicios de Plomería', phone: '+1234567895', email: 'pedro@plomeria.com' },
      { id: 1202, name: 'Raúl Tuberías', specialty: 'Instalación y Reparación', category: 'Plomero', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', rating: [5, 5, 4, 5, 5], address: 'Plomería Total', phone: '+1234567896', email: 'raul@plomeria.com' },
    ],
    4: [ // Albañil
      { id: 1301, name: 'Albañil Antonio', specialty: 'Construcción', category: 'Albañil', image: 'https://images.unsplash.com/photo-1508394519646-2f9a903e2ca4?w=400', rating: [5, 4, 5, 4, 5], address: 'Obra Civil', phone: '+1234567897', email: 'antonio@albaniles.com' },
      { id: 1302, name: 'Víctor Construcciones', specialty: 'Pisos y Paredes', category: 'Albañil', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', rating: [4, 5, 4, 5, 5], address: 'Construcciones Premium', phone: '+1234567898', email: 'victor@construcciones.com' },
    ],
    5: [ // Mecánico
      { id: 1401, name: 'Mecánico Ramón', specialty: 'Autos', category: 'Mecánico', image: 'https://images.unsplash.com/photo-1589146221016-112876a1dadf?w=400', rating: [5, 5, 5, 5, 4], address: 'Taller Mecánico Central', phone: '+1234567899', email: 'ramon@mecanica.com' },
      { id: 1402, name: 'Jesús Motor', specialty: 'Motor y Transmisión', category: 'Mecánico', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', rating: [5, 4, 5, 5, 5], address: 'Servicio Express Auto', phone: '+1234567900', email: 'jesus@mecanica.com' },
    ],
    6: [ // Pintor
      { id: 1501, name: 'Pintor Daniel', specialty: 'Pintura Residencial', category: 'Pintor', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', rating: [4, 4, 5, 4, 5], address: 'Servicios de Pintura', phone: '+1234567901', email: 'daniel@pintura.com' },
      { id: 1502, name: 'Arturo Arte', specialty: 'Pintura Comercial', category: 'Pintor', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', rating: [5, 5, 4, 5, 4], address: 'Decoraciones Pintura', phone: '+1234567902', email: 'arturo@pintura.com' },
    ],
    7: [ // Soldador
      { id: 1601, name: 'Soldador Roberto', specialty: 'Soldadura Industrial', category: 'Soldador', image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400', rating: [5, 5, 5, 5, 5], address: 'Taller de Soldaduras', phone: '+1234567903', email: 'roberto@soldadura.com' },
      { id: 1602, name: 'Welding Pro', specialty: 'Estructuras Metálicas', category: 'Soldador', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', rating: [4, 5, 5, 5, 4], address: 'Soluciones Metálicas', phone: '+1234567904', email: 'welding@soldadura.com' },
    ],
  }

  const trades = useMemo(() => {
    const categoryId = parseInt(category) || 1
    const list = tradesByCategory[categoryId] || []
    return list.filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [category, searchTerm])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header con botón de regreso */}
        <button
          onClick={() => navigate('/trades')}
          className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 transition"
        >
          <FiArrowLeft size={20} />
          Volver a Oficios
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {categoryData.name || 'Oficios'}
          </h1>
          <p className="text-gray-600 text-lg">
            Encuentra los mejores profesionales en esta categoría
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 relative">
          <FiSearch className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Busca por nombre o especialidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Results */}
        {trades.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trades.map(trade => (
              <ProviderCard
                key={trade.id}
                provider={trade}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">
              No se encontraron profesionales
            </p>
            <button
              onClick={() => navigate('/trades')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Ver todas las categorías
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TradesList
