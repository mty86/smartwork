import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProviderProvider } from './context/ProviderContext'
import { UserPanelProvider } from './context/UserPanelContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Professionals from './pages/Professionals/Professionals'
import ProfessionalsList from './pages/Professionals/ProfessionalsList'
import Trades from './pages/Trades/Trades'
import TradesList from './pages/Trades/TradesList'
import Businesses from './pages/Businesses/Businesses'
import ProviderDetail from './pages/ProviderDetail/ProviderDetail'
import Plans from './pages/Plans/Plans'
import DashboardClient from './pages/DashboardClient/DashboardClient'
import DashboardProfessional from './pages/DashboardProfessional/DashboardProfessional'
import DashboardBusiness from './pages/DashboardBusiness/DashboardBusiness'
import DashboardProvider from './pages/DashboardProvider/DashboardProvider'
import AdminPanel from './pages/AdminPanel/AdminPanel'
import { useAuth } from './hooks/useAuth'

// Componente para redirigir a dashboard según el rol
const DashboardRouter = () => {
  const { user } = useAuth()
  
  if (!user) return <Navigate to="/login" replace />
  
  switch (user.role) {
    case 'professional':
      return <DashboardProfessional />
    case 'tradesperson':
      return <DashboardProfessional />
    case 'business':
      return <DashboardBusiness />
    case 'admin':
      return <AdminPanel />
    case 'client':
    default:
      return <DashboardClient />
  }
}

function App() {
  return (
    <AuthProvider>
      <ProviderProvider>
        <UserPanelProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/professionals" element={<Professionals />} />
                <Route path="/professionals/:category" element={<ProfessionalsList />} />
                <Route path="/trades" element={<Trades />} />
                <Route path="/trades/:category" element={<TradesList />} />
                <Route path="/businesses" element={<Businesses />} />
                <Route path="/provider/:id" element={<ProviderDetail />} />
                <Route path="/dashboard" element={<DashboardRouter />} />
                <Route path="/dashboard/client" element={<DashboardClient />} />
                <Route path="/dashboard/professional" element={<DashboardProfessional />} />
                <Route path="/dashboard/business" element={<DashboardBusiness />} />
                <Route path="/dashboard/provider" element={<DashboardProvider />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
          </Router>
        </UserPanelProvider>
      </ProviderProvider>
    </AuthProvider>
  )
}

export default App
