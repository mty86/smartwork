/**
 * Usuarios para Testing - SmartWorks
 * Diferentes roles: admin, professional, tradesperson, business, client
 */

export const mockUsers = {
  // Administrador
  admin: {
    id: 'user_1',
    email: 'admin@smartworks.com',
    password: '123456',
    firstName: 'Administrador',
    lastName: 'Sistema',
    role: 'admin',
    isActive: true,
  },

  // Profesionista (Ingeniero, Abogado, Consultor)
  professional: {
    id: 'user_2',
    email: 'profesional@smartworks.com',
    password: '123456',
    firstName: 'Juan',
    lastName: 'Pérez García',
    role: 'professional',
    specialty: 'Ingeniería de Software',
    phone: '+34 612 345 678',
    city: 'Madrid',
    experience: 5,
    rate: 85,
    description: 'Ingeniero especializado en desarrollo de software con 5 años de experiencia',
    rating: 4.8,
    reviews: 42,
    image: null,
  },

  // Profesionista de Oficios (Electricista, Fontanero, etc.)
  tradesperson: {
    id: 'user_3',
    email: 'electricista@smartworks.com',
    password: '123456',
    firstName: 'Carlos',
    lastName: 'López Martín',
    role: 'tradesperson',
    trade: 'Electricista',
    phone: '+34 656 789 012',
    city: 'Barcelona',
    experience: 8,
    rate: 65,
    description: 'Electricista profesional con certificaciones y 8 años de experiencia',
    rating: 4.9,
    reviews: 67,
    image: null,
  },

  // Negocio (Empresa de servicios)
  business: {
    id: 'user_4',
    email: 'empresa@smartworks.com',
    password: '123456',
    firstName: 'Smart',
    lastName: 'Services',
    role: 'business',
    businessName: 'Smart Services S.L.',
    businessDescription: 'Servicios integrales de consultoría y soporte técnico',
    phone: '+34 91 234 5678',
    city: 'Madrid',
    employees: 25,
    websiteUrl: 'https://smartservices.com',
    rating: 4.6,
    reviews: 58,
    image: null,
  },

  // Cliente
  client: {
    id: 'user_5',
    email: 'usuario@smartworks.com',
    password: '123456',
    firstName: 'María',
    lastName: 'García López',
    role: 'client',
    phone: '+34 645 123 456',
    city: 'Valencia',
    image: null,
  },
}

/**
 * Simulación de Login para Testing
 * Retorna el usuario si las credenciales coinciden
 */
export const mockLogin = (email, password) => {
  for (const key in mockUsers) {
    const user = mockUsers[key]
    if (user.email === email && user.password === password) {
      // Retornar sin la contraseña
      const { password: _, ...userWithoutPassword } = user
      return {
        success: true,
        token: `mock_token_${user.id}`,
        user: userWithoutPassword,
      }
    }
  }
  return {
    success: false,
    error: 'Correo o contraseña inválidos',
  }
}

/**
 * Simulación de Register para Testing
 * Crea un nuevo usuario mock
 */
export const mockRegister = (userData) => {
  const newUser = {
    id: `user_${Date.now()}`,
    ...userData,
    isActive: true,
    createdAt: new Date().toISOString(),
  }
  return {
    success: true,
    token: `mock_token_${newUser.id}`,
    user: newUser,
  }
}

/**
 * Inyectar usuarios en localStorage para testing
 */
export const injectMockUsersToLocalStorage = () => {
  const users = Object.values(mockUsers)
  users.forEach(user => {
    // Guardar cada usuario de forma individual si es necesario
    console.log(`Mock user created: ${user.email}`)
  })
  console.log('✅ Mock users loaded. Use these credentials to test:')
  users.forEach(user => {
    console.log(`📧 ${user.email} | 🔑 ${user.password} | 👤 ${user.role}`)
  })
}

export default mockUsers
