import { useContext } from 'react'
import { ProviderContext } from '../context/ProviderContext'

export const useProvider = () => {
  const context = useContext(ProviderContext)
  if (!context) {
    throw new Error('useProvider debe ser usado dentro de ProviderProvider')
  }
  return context
}
