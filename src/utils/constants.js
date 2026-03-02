/**
 * Constantes de la aplicación
 */

export const PROFESSIONAL_CATEGORIES = [
  { id: 1, name: 'Médico General', icon: '🏥' },
  { id: 2, name: 'Dentista', icon: '🦷' },
  { id: 3, name: 'Cirujano', icon: '⚕️' },
  { id: 4, name: 'Veterinario', icon: '🐾' },
  { id: 5, name: 'Abogado', icon: '⚖️' },
  { id: 6, name: 'Contador', icon: '📊' },
  { id: 7, name: 'Ingeniero Civil', icon: '🏗️' },
  { id: 8, name: 'Desarrollo de Software', icon: '💻' },
  { id: 9, name: 'Sistemas', icon: '🖥️' },
]

export const TRADE_CATEGORIES = [
  { id: 1, name: 'Carpintero', icon: '🪵' },
  { id: 2, name: 'Electricista', icon: '⚡' },
  { id: 3, name: 'Plomero', icon: '🔧' },
  { id: 4, name: 'Albañil', icon: '🧱' },
  { id: 5, name: 'Mecánico', icon: '🔩' },
  { id: 6, name: 'Pintor', icon: '🎨' },
  { id: 7, name: 'Soldador', icon: '🔥' },
]

export const USER_ROLES = {
  CLIENT: 'client',
  PROFESSIONAL: 'professional',
  TRADE: 'trade',
  BUSINESS: 'business',
  ADMIN: 'admin',
}

export const SUBSCRIPTION_PLANS = [
  {
    id: 1,
    name: 'Gratuito',
    price: 0,
    currency: 'MXN',
    period: 'Siempre',
    popular: false,
    features: [
      '✓ Perfil básico',
      '✓ Contacto directo',
      '✓ Reseñas y calificaciones',
      '✓ Perfil en búsqueda',
      '✗ Galería ampliada',
      '✗ Estadísticas detalladas',
      '✗ Soporte prioritario',
    ],
  },
  {
    id: 2,
    name: 'Básico',
    price: 199,
    currency: 'MXN',
    period: 'mes',
    popular: true,
    features: [
      '✓ Todo lo incluido en Gratuito',
      '✓ Mejor posicionamiento en búsqueda',
      '✓ Galería de 10 fotos',
      '✓ Estadísticas de visitas básicas',
      '✓ Soporte por email',
      '✓ Botón WhatsApp destacado',
      '✗ Galería ilimitada',
      '✗ Estadísticas avanzadas',
    ],
  },
  {
    id: 3,
    name: 'Profesional',
    price: 499,
    currency: 'MXN',
    period: 'mes',
    popular: false,
    features: [
      '✓ Todo lo incluido en Básico',
      '✓ Posicionamiento premium',
      '✓ Galería ilimitada',
      '✓ Estadísticas detalladas',
      '✓ Widget para redes sociales',
      '✓ Soporte 24/7 por chat y teléfono',
      '✓ Certificado de verificación',
      '✓ Api de integración',
    ],
  },
]

export const PHONE_TYPES = [
  { value: 'office', label: 'Oficina' },
  { value: 'mobile', label: 'Celular' },
  { value: 'whatsapp', label: 'WhatsApp' },
]

export const RATING_LEVELS = [
  { value: 5, label: 'Excelente' },
  { value: 4, label: 'Muy Bueno' },
  { value: 3, label: 'Bueno' },
  { value: 2, label: 'Regular' },
  { value: 1, label: 'Malo' },
]
