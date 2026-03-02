import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import BusinessCard from '../../components/Cards/BusinessCard'

export const Businesses = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [businesses] = useState([
    {
      id: 1,
      name: 'Restaurante El Buen Comer',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58ce?w=400',
      address: 'Calle Principal 123, Centro',
      hours: 'Lun-Dom 11AM-10PM',
      rating: 4.8,
      reviews: 45,
      category: 'Restaurantes',
      phone: '+1234567890',
    },
    {
      id: 2,
      name: 'Cafetería Casa Verde',
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400',
      address: 'Avenida Secundaria 456',
      hours: 'Lun-Sab 7AM-8PM',
      rating: 4.6,
      reviews: 32,
      category: 'Cafeterías',
      phone: '+1234567891',
    },
    {
      id: 3,
      name: 'Salón de Belleza Diana',
      image: 'https://images.unsplash.com/photo-1562322503-8b1f6f24fa38?w=400',
      address: 'Calle Tercera 789',
      hours: 'Mar-Sab 9AM-6PM',
      rating: 4.9,
      reviews: 28,
      category: 'Belleza',
      phone: '+1234567892',
    },
    {
      id: 4,
      name: 'Tienda Mini Market 24h',
      image: 'https://images.unsplash.com/photo-1578394320619-112d4666c6d0?w=400',
      address: 'Calle Cuarta 321',
      hours: 'Lun-Dom 24 Horas',
      rating: 4.3,
      reviews: 56,
      category: 'Tienda Conveniencia',
      phone: '+1234567893',
    },
    {
      id: 5,
      name: 'Farmacia Cruz Azul',
      image: 'https://images.unsplash.com/photo-1631549916768-4c73efb2cnc0?w=400',
      address: 'Avenida Principal 654',
      hours: 'Lun-Dom 8AM-9PM',
      rating: 4.7,
      reviews: 38,
      category: 'Farmacias',
      phone: '+1234567894',
    },
    {
      id: 6,
      name: 'Peluquería Estilo Moderno',
      image: 'https://images.unsplash.com/photo-1521746727202-7d0d0bfb0bcf?w=400',
      address: 'Calle Quinta 987',
      hours: 'Mar-Sab 10AM-7PM',
      rating: 4.5,
      reviews: 22,
      category: 'Peluquerías',
      phone: '+1234567895',
    },
    {
      id: 7,
      name: 'Pizzería La Nonna',
      image: 'https://images.unsplash.com/photo-1513104890138-7d3a67b20313?w=400',
      address: 'Calle Sexta 246',
      hours: 'Lun-Dom 5PM-12AM',
      rating: 4.6,
      reviews: 67,
      category: 'Pizzerías',
      phone: '+1234567896',
    },
    {
      id: 8,
      name: 'Gym Power House',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
      address: 'Avenida del Deporte 555',
      hours: 'Lun-Dom 6AM-10PM',
      rating: 4.4,
      reviews: 41,
      category: 'Gimnasios',
      phone: '+1234567897',
    },
  ])

  const filteredBusinesses = businesses.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Negocios
          </h1>
          <p className="text-gray-600 text-lg">
            Descubre negocios locales con servicios variados
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 relative">
          <FiSearch className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Busca un negocio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Businesses Grid */}
        {filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map(business => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No se encontraron negocios
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Businesses
