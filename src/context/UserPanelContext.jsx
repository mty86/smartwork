import { createContext, useContext, useState } from 'react'

export const UserPanelContext = createContext()

export const UserPanelProvider = ({ children }) => {
  const [activePanel, setActivePanel] = useState('client') // 'client' or 'provider'

  return (
    <UserPanelContext.Provider value={{ activePanel, setActivePanel }}>
      {children}
    </UserPanelContext.Provider>
  )
}

export const useUserPanel = () => {
  const ctx = useContext(UserPanelContext)
  if (!ctx) throw new Error('useUserPanel must be used within a UserPanelProvider')
  return ctx
}
