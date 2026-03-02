import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import CategoryCard from '../../components/Cards/CategoryCard'
import { loadCategories } from '../../utils/storage'

export const Trades = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCategories, setFilteredCategories] = useState([])

  useEffect(() => {
    const all = loadCategories().filter(c => c.type === 'trade')
    const filtered = all.filter(cat =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCategories(filtered)
  }, [searchTerm])

  const handleCategoryClick = (category) => {
    navigate(`/trades/${category.id}`, { state: { category } })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Oficios
          </h1>
          <p className="text-gray-600 text-lg">
            Encuentra a los mejores profesionales en oficios técnicos
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 relative">
          <FiSearch className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Busca un oficio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No se encontraron oficios
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Trades
