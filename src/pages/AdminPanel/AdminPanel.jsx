import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi'
import { loadUsers, saveUsers, loadCategories, saveCategories, loadPlans, savePlans } from '../../utils/storage'
import { PROFESSIONAL_CATEGORIES, TRADE_CATEGORIES } from '../../utils/constants'

export const AdminPanel = () => {
  const { user, logout, userRole } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [plans, setPlans] = useState([])

  const [showAdminModal, setShowAdminModal] = useState(false)
  const [newAdmin, setNewAdmin] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', type: 'professional' })
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [newPlan, setNewPlan] = useState({ name: '', price: '', description: '' })

  // cargar datos desde almacenamiento local
  useEffect(() => {
    const u = loadUsers()
    setUsers(u)

    let cats = loadCategories()
    if (cats.length === 0) {
      // inicializar con valores por defecto
      cats = [
        ...PROFESSIONAL_CATEGORIES.map(c => ({ ...c, type: 'professional' })),
        ...TRADE_CATEGORIES.map(c => ({ ...c, type: 'trade' })),
      ]
      saveCategories(cats)
    }
    setCategories(cats)

    let pls = loadPlans()
    if (pls.length === 0) {
      pls = [
        { id: 1, name: 'Gratuito', price: 0, description: '' },
        { id: 2, name: 'Básico', price: 9.99, description: '' },
        { id: 3, name: 'Profesional', price: 29.99, description: '' },
      ]
      savePlans(pls)
    }
    setPlans(pls)
  }, [])

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Acceso Denegado
          </h1>
          <p className="text-gray-600 mb-6">
            No tienes permisos para acceder a este panel
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // helper counts
  const countsByType = {
    professional: users.filter(u => u.role === 'professional').length,
    trade: users.filter(u => u.role === 'trade').length,
    business: users.filter(u => u.role === 'business').length,
  }

  // user actions
  const suspendUser = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u))
  }
  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id))
  }
  const changeUserPlan = (id) => {
    const plan = prompt('Ingrese el nuevo plan o descripción:')
    if (plan) {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, plan } : u))
    }
  }

  const approveProfessional = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'active', isActive: true } : u))
  }
  const rejectProfessional = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  // persist changes to storage whenever users/categories/plans change
  useEffect(() => {
    saveUsers(users)
  }, [users])
  useEffect(() => {
    saveCategories(categories)
  }, [categories])
  useEffect(() => {
    savePlans(plans)
  }, [plans])

  // category admin functions
  const addCategory = (cat) => {
    setCategories(prev => [...prev, { ...cat, id: Date.now() }])
  }
  const removeCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  // admin management
  const addAdmin = () => {
    if (newAdmin.email && newAdmin.password) {
      const adminUser = {
        id: `user_${Date.now()}`,
        ...newAdmin,
        role: 'admin',
        status: 'active',
        isActive: true,
      }
      setUsers(prev => [...prev, adminUser])
      setShowAdminModal(false)
      setNewAdmin({ firstName: '', lastName: '', email: '', password: '' })
    }
  }
  const removeAdmin = (id) => {
    setUsers(prev => prev.filter(u => !(u.role === 'admin' && u.id === id)))
  }

  // plan management
  const addPlan = () => {
    if (newPlan.name) {
      setPlans(prev => [...prev, { ...newPlan, id: Date.now() }])
      setShowPlanModal(false)
      setNewPlan({ name: '', price: '', description: '' })
    }
  }
  const editPlan = (id) => {
    const p = plans.find(pl => pl.id === id)
    if (!p) return
    const price = prompt('Nuevo precio', p.price)
    const description = prompt('Nueva descripción', p.description || '')
    setPlans(prev => prev.map(pl => pl.id === id ? { ...pl, price: price !== null ? Number(price) : pl.price, description } : pl))
  }
  const deletePlan = (id) => {
    setPlans(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Panel de Administrador
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          {['users', 'categories', 'plans', 'pending', 'admins'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab === 'users' && 'Usuarios'}
              {tab === 'categories' && 'Categorías'}
              {tab === 'plans' && 'Planes'}
              {tab === 'pending' && 'Filtro'}
              {tab === 'admins' && 'Administradores'}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h2>
            </div>
            {/* counts */}
            <div className="mb-4 flex gap-4">
              <span className="bg-blue-100 px-3 py-1 rounded">Profesionales: {countsByType.professional}</span>
              <span className="bg-blue-100 px-3 py-1 rounded">Oficios: {countsByType.trade}</span>
              <span className="bg-blue-100 px-3 py-1 rounded">Negocios: {countsByType.business}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Rol</th>
                    <th className="px-4 py-2 text-left">Estado</th>
                    <th className="px-4 py-2 text-left">Plan</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{user.firstName} {user.lastName}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{user.role}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${user.status === 'active' ? 'bg-green-100 text-green-800' : user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{user.plan || '-'}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => suspendUser(user.id)} className="text-yellow-600 hover:text-yellow-800" title="Suspender/Activar">
                          🛑
                        </button>
                        <button onClick={() => changeUserPlan(user.id)} className="text-blue-600 hover:text-blue-800" title="Cambiar plan">
                          💳
                        </button>
                        <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-800" title="Eliminar">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pending validations Tab */}
        {activeTab === 'pending' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Profesionales Pendientes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Especialidad</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.role === 'professional' && u.status === 'pending').map(u => (
                    <tr key={u.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{u.firstName} {u.lastName}</td>
                      <td className="px-4 py-3">{u.email}</td>
                      <td className="px-4 py-3">{u.specialty || '-'}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => approveProfessional(u.id)} className="text-green-600 hover:text-green-800">✔️</button>
                        <button onClick={() => rejectProfessional(u.id)} className="text-red-600 hover:text-red-800">✖️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Gestión de Categorías</h2>
              <button onClick={() => setShowCategoryModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FiPlus /> Nueva Categoría
              </button>
            </div>
            {/* group by type */}
            {['professional', 'trade', 'business'].map(type => (
              <div key={type} className="mb-8">
                <h3 className="text-xl font-semibold capitalize mb-2">{type === 'professional' ? 'Profesionales' : type === 'trade' ? 'Oficios' : 'Negocios'}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Nombre</th>
                        <th className="px-4 py-2 text-left">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.filter(c => c.type === type).map(cat => (
                        <tr key={cat.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{cat.name}</td>
                          <td className="px-4 py-3 flex gap-2">
                            <button onClick={() => removeCategory(cat.id)} className="text-red-600 hover:text-red-800">
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Gestión de Planes</h2>
              <button onClick={() => setShowPlanModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FiPlus /> Nuevo Plan
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Precio</th>
                    <th className="px-4 py-2 text-left">Descripción</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map(plan => (
                    <tr key={plan.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{plan.name}</td>
                      <td className="px-4 py-3">${plan.price}</td>
                      <td className="px-4 py-3">{plan.description || '-'}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => editPlan(plan.id)} className="text-blue-600 hover:text-blue-800" title="Editar">
                          <FiEdit2 />
                        </button>
                        <button onClick={() => deletePlan(plan.id)} className="text-red-600 hover:text-red-800" title="Eliminar">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Admins Tab */}
        {activeTab === 'admins' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Administradores</h2>
              <button onClick={() => setShowAdminModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FiPlus /> Nuevo Admin
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.role === 'admin').map(a => (
                    <tr key={a.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{a.firstName} {a.lastName}</td>
                      <td className="px-4 py-3">{a.email}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => removeAdmin(a.id)} className="text-red-600 hover:text-red-800">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Agregar Administrador</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={newAdmin.firstName}
                onChange={e => setNewAdmin(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Apellido"
                value={newAdmin.lastName}
                onChange={e => setNewAdmin(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={newAdmin.email}
                onChange={e => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={newAdmin.password}
                onChange={e => setNewAdmin(prev => ({ ...prev, password: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowAdminModal(false)} className="px-4 py-2">Cancelar</button>
              <button onClick={addAdmin} className="bg-blue-600 text-white px-4 py-2 rounded">Agregar</button>
            </div>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Agregar Categoría</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre de categoría"
                value={newCategory.name}
                onChange={e => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              />
              <select
                value={newCategory.type}
                onChange={e => setNewCategory(prev => ({ ...prev, type: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="professional">Profesional</option>
                <option value="trade">Oficio</option>
                <option value="business">Negocio</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowCategoryModal(false)} className="px-4 py-2">Cancelar</button>
              <button onClick={() => { addCategory(newCategory); setShowCategoryModal(false) }} className="bg-blue-600 text-white px-4 py-2 rounded">Agregar</button>
            </div>
          </div>
        </div>
      )}

      {showPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Agregar Plan</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del plan"
                value={newPlan.name}
                onChange={e => setNewPlan(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Precio"
                value={newPlan.price}
                onChange={e => setNewPlan(prev => ({ ...prev, price: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Descripción"
                value={newPlan.description}
                onChange={e => setNewPlan(prev => ({ ...prev, description: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowPlanModal(false)} className="px-4 py-2">Cancelar</button>
              <button onClick={addPlan} className="bg-blue-600 text-white px-4 py-2 rounded">Agregar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default AdminPanel
