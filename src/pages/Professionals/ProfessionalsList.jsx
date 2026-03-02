import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { FiSearch, FiArrowLeft, FiStar, FiPhone, FiMail } from 'react-icons/fi'
import ProviderCard from '../../components/Cards/ProviderCard'

const ProfessionalsList = () => {
  const { category } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const categoryData = location.state?.category || {}
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data de profesionales por categoría
  const professionalsByCategory = {
    1: [ // Médico General
      { id: 101, name: 'Dr. Juan Pérez', specialty: 'Médico General', category: 'Médico General', image: 'https://images.unsplash.com/photo-1576091160399-14667620e2e5?w=400', rating: [5, 5, 4, 5, 4], address: 'Calle 1, Centro', phone: '+1234567890', email: 'juan@med.com' },
      { id: 102, name: 'Dra. María López', specialty: 'Médico General', category: 'Médico General', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', rating: [5, 4, 5, 5, 5], address: 'Avenida 2, Norte', phone: '+1234567891', email: 'maria@med.com' },
      { id: 103, name: 'Dr. Carlos García', specialty: 'Médico General', category: 'Médico General', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', rating: [4, 4, 4, 5, 4], address: 'Calle 3, Sur', phone: '+1234567892', email: 'carlos@med.com' },
    ],
    2: [ // Dentista
      { id: 201, name: 'Dr. Miguel Santos', specialty: 'Dentista', category: 'Dentista', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', rating: [5, 5, 5, 5, 4], address: 'Calle Dental 1', phone: '+1234567893', email: 'miguel@dent.com' },
      { id: 202, name: 'Dra. Ana Rodríguez', specialty: 'Dentista', category: 'Dentista', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', rating: [5, 4, 5, 5, 5], address: 'Avenida Sonrisa 2', phone: '+1234567894', email: 'ana@dent.com' },
    ],
    3: [ // Cirujano
      { id: 301, name: 'Dr. Roberto Díaz', specialty: 'Cirujano', category: 'Cirujano', image: 'https://images.unsplash.com/photo-1519085360771-9852520e8ce7?w=400', rating: [5, 5, 5, 5, 5], address: 'Hospital Central', phone: '+1234567895', email: 'roberto@cirugia.com' },
    ],
    4: [ // Veterinario
      { id: 401, name: 'Dr. Lucas Moreno', specialty: 'Veterinario', category: 'Veterinario', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', rating: [5, 4, 5, 5, 4], address: 'Calle Mascotas 5', phone: '+1234567896', email: 'lucas@vet.com' },
      { id: 402, name: 'Dra. Sofia Torres', specialty: 'Veterinaria', category: 'Veterinario', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', rating: [5, 5, 4, 5, 5], address: 'Clínica Pet Care', phone: '+1234567897', email: 'sofia@vet.com' },
    ],
    5: [ // Abogado
      { id: 501, name: 'Lic. Fernando Ruiz', specialty: 'Abogado', category: 'Abogado', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', rating: [4, 4, 5, 4, 5], address: 'Oficina Legal Central', phone: '+1234567898', email: 'fernando@law.com' },
      { id: 502, name: 'Lic. Patricia Flores', specialty: 'Abogada', category: 'Abogado', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', rating: [5, 5, 5, 5, 4], address: 'Despacho Flores & Asociados', phone: '+1234567899', email: 'patricia@law.com' },
    ],
    6: [ // Contador
      { id: 601, name: 'CP. Javier López', specialty: 'Contador', category: 'Contador', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', rating: [4, 5, 4, 5, 5], address: 'Despacho Contable 1', phone: '+1234567900', email: 'javier@cpa.com' },
    ],
    7: [ // Ingeniero Civil
      { id: 701, name: 'Ing. Héctor Méndez', specialty: 'Ingeniero Civil', category: 'Ingeniero Civil', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', rating: [5, 4, 5, 4, 5], address: 'Ingenierías & Proyectos', phone: '+1234567901', email: 'hector@engineering.com' },
    ],
    8: [ // Desarrollador de Software
      { id: 801, name: 'Ing. Alejandro Chávez', specialty: 'Desarrollador', category: 'Desarrollo de Software', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', rating: [5, 5, 4, 5, 5], address: 'Tech Solutions', phone: '+1234567902', email: 'alejandro@tech.com' },
      { id: 802, name: 'Ing. Daniela Vargas', specialty: 'Desarrolladora', category: 'Desarrollo de Software', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', rating: [5, 5, 5, 5, 4], address: 'Digital Innovations', phone: '+1234567903', email: 'daniela@tech.com' },
    ],
    9: [ // Ingeniero de Sistemas
      { id: 901, name: 'Ing. Gabriel Romero', specialty: 'Ingeniero de Sistemas', category: 'Sistemas', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', rating: [4, 5, 5, 4, 5], address: 'Infraestructura IT', phone: '+1234567904', email: 'gabriel@systems.com' },
    ],
  }

  const professionals = useMemo(() => {
    const categoryId = parseInt(category) || 1
    const list = professionalsByCategory[categoryId] || []
    return list.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [category, searchTerm])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header con botón de regreso */}
        <button
          onClick={() => navigate('/professionals')}
          className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 transition"
        >
          <FiArrowLeft size={20} />
          Volver a Profesionistas
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {categoryData.name || 'Profesionistas'}
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
        {professionals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map(professional => (
              <ProviderCard
                key={professional.id}
                provider={professional}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">
              No se encontraron profesionales
            </p>
            <button
              onClick={() => navigate('/professionals')}
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

export default ProfessionalsList
