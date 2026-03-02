import { createContext, useState, useCallback } from 'react'

/**
 * ProviderContext - Contexto global para gestión de proveedores
 * Maneja estado de catálogos, filtros y datos de proveedores
 */
export const ProviderContext = createContext()

export const ProviderProvider = ({ children }) => {
  const [providers, setProviders] = useState([])
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [filterCategory, setFilterCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const updateProviders = useCallback((newProviders) => {
    setProviders(newProviders)
  }, [])

  const filterProviders = useCallback((providers) => {
    let filtered = providers

    if (filterCategory) {
      filtered = filtered.filter(p => p.category === filterCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [filterCategory, searchTerm])

  const value = {
    providers,
    selectedProvider,
    filterCategory,
    searchTerm,
    loading,
    updateProviders,
    setSelectedProvider,
    setFilterCategory,
    setSearchTerm,
    setLoading,
    filterProviders,
  }

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  )
}
