# Guía de Integración Backend - SmartWorks

## 1. Configuración de URL de API

### Opción 1: Variable de Entorno (Recomendado)

Crear archivo `.env.local` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
# O para producción:
# VITE_API_URL=https://api.smartworks.com/api
```

Actualizar `src/services/apiClient.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
```

### Opción 2: Cambio directo en apiClient.js

```javascript
const API_URL = 'http://tu-servidor:3000/api'
```

---

## 2. Endpoints Esperados del Backend

### Autenticación
```
POST   /auth/login
       Body: { email, password }
       Response: { token, user: { id, email, firstName, lastName, role } }

POST   /auth/register
       Body: { email, password, firstName, lastName, role, ... }
       Response: { token, user: { ... } }

POST   /auth/logout
       Headers: Authorization: Bearer <token>
       Response: { success: true }

POST   /auth/verify
       Headers: Authorization: Bearer <token>
       Response: { valid: true, user: { ... } }

POST   /auth/refresh
       Body: { token }
       Response: { token }
```

### Proveedores
```
GET    /providers
       Query: ?page=1&limit=10
       Response: { providers: [...], total, page, limit }

GET    /providers/:id
       Response: { id, name, type, specialty, image, reviews, ... }

GET    /providers/type/:type
       Types: professional, trade, business
       Response: { providers: [...] }

GET    /providers/category/:category
       Response: { providers: [...] }

GET    /providers/:id/reviews
       Query: ?page=1&limit=10
       Response: { reviews: [...], total }

POST   /providers/:id/reviews
       Headers: Authorization: Bearer <token>
       Body: { rating: 1-5, comment }
       Response: { id, rating, comment, author, date }

PUT    /providers/:id
       Headers: Authorization: Bearer <token>
       Body: { firstName, lastName, specialty, address, phone, ... }
       Response: { success: true, provider: { ... } }

POST   /providers/:id/upload-image
       Headers: 
         - Authorization: Bearer <token>
         - Content-Type: multipart/form-data
       Body: FormData { file }
       Response: { success: true, imageUrl, imageId }

GET    /providers/categories
       Response: { categories: { professional: [...], trade: [...] } }

GET    /providers/search?q=query
       Response: { providers: [...] }
```

---

## 3. Estructura de Datos Esperada

### User Object
```javascript
{
  id: "uuid",
  email: "user@example.com",
  firstName: "Juan",
  lastName: "Pérez",
  role: "client" | "professional" | "trade" | "business" | "admin",
  phone: "1234567890",
  // Campos adicionales según tipo
  specialty: "Médico General",  // professional
  trade: "Carpintero",           // trade
  businessName: "Mi Negocio",    // business
  address: "Calle 123",
  businessHours: "Lun-Vie 9AM-6PM"  // business
}
```

### Provider Object
```javascript
{
  id: "uuid",
  name: "Dr. Juan Pérez",
  type: "professional" | "trade" | "business",
  specialty: "Médico General",
  image: "url-to-image",
  images: ["url1", "url2"],
  address: "Calle Central 456",
  phone: "1234567890",
  whatsapp: "1234567890",
  email: "provider@example.com",
  rating: 4.5,
  reviews: [
    {
      id: "uuid",
      author: "María López",
      rating: 5,
      comment: "Excelente servicio",
      date: "2024-01-20T10:30:00Z"
    }
  ],
  plan: {
    id: 1,
    name: "Gratuito",
    price: 0
  },
  createdAt: "2024-01-01T00:00:00Z"
}
```

### Review Object
```javascript
{
  id: "uuid",
  providerId: "uuid",
  clientId: "uuid",
  author: "Cliente Nombre",
  rating: 1-5,
  comment: "Lorem ipsum...",
  date: "2024-01-20T10:30:00Z"
}
```

---

## 4. Autenticación en Headers

Todos los endpoints protegidos requieren:

```javascript
Authorization: Bearer <jwt_token>
```

Ejemplo en Axios (ya configurado en apiClient.js):
```javascript
const token = localStorage.getItem('authToken')
config.headers.Authorization = `Bearer ${token}`
```

---

## 5. Manejo de Errores

### Respuestas de Error Esperadas
```javascript
// 400 - Bad Request
{ message: "Validación fallida", errors: { email: "Email inválido" } }

// 401 - Unauthorized
{ message: "Token expirado o inválido" }

// 403 - Forbidden
{ message: "No tienes permiso para esto" }

// 404 - Not Found
{ message: "Recurso no encontrado" }

// 500 - Server Error
{ message: "Error interno del servidor" }
```

### Manejo en Frontend (ya implementado)
```javascript
// apiClient.js hace redirect automático a /login si recibe 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

---

## 6. Cómo Usar los Servicios

### Servicio de Autenticación

```javascript
import authService from '@/services/authService'

// Login
const response = await authService.login('user@email.com', 'password123')
const { token, user } = response.data

// Registro
const response = await authService.register({
  email: 'new@email.com',
  password: 'password123',
  firstName: 'Juan',
  lastName: 'Pérez',
  role: 'client'
})

// Logout
await authService.logout()
```

### Servicio de Proveedores

```javascript
import providerService from '@/services/providerService'

// Obtener todos
const response = await providerService.getAllProviders(1, 10)

// Obtener por tipo
const response = await providerService.getProvidersByType('professional', 1, 10)

// Obtener detalle
const response = await providerService.getProviderDetails('provider-id')

// Crear reseña
const response = await providerService.createReview('provider-id', {
  rating: 5,
  comment: 'Excelente'
})

// Cargar imagen
const formData = new FormData()
formData.append('file', fileObject)
const response = await providerService.uploadImage('provider-id', fileObject)
```

---

## 7. CORS Configuration

Backend debe permitir solicitudes CORS del frontend:

```javascript
// En Express/Node.js
const cors = require('cors')

app.use(cors({
  origin: ['http://localhost:5173', 'https://smartworks.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
```

---

## 8. Testing de Endpoints

### Con cURL
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get Providers
curl http://localhost:3000/api/providers \
  -H "Authorization: Bearer <token>"
```

### Con Postman
1. Guardar token en variable: `{{token}}`
2. Usar en headers: `Authorization: Bearer {{token}}`
3. Crear colecciones por recurso

---

## 9. Upload de Imágenes

### Desde Frontend
```javascript
const handleImageUpload = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const response = await providerService.uploadImage(providerId, file)
    console.log('Imagen subida:', response.data.imageUrl)
  } catch (error) {
    console.error('Error:', error.message)
  }
}
```

### Backend Esperado
- Recibir multipart/form-data
- Guardar en storage (cloud o local)
- Retornar URL accesible
- Validar tipo de archivo (jpg, png, etc.)
- Opcional: Redimensionar imagen

---

## 10. Validaciones Frontend Actuales

El frontend ya valida:
- ✅ Email válido
- ✅ Contraseña mínimo 8 caracteres
- ✅ Confirmación de contraseña
- ✅ Teléfono válido
- ✅ Campos requeridos
- ✅ Rating 1-5

El backend debe validar TODO nuevamente:
- Email único en BD
- Contraseña única (hash)
- Permisos por rol
- Datos de proveedor completos
- Límites de reseñas por usuario

---

## 11. Eventos en Tiempo Real (Futuro)

Preparado para WebSockets:
```javascript
// Sugerencia: Socket.io para notificaciones
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')
socket.on('new-review', (data) => {
  // Actualizar UI
})
```

---

## 12. Checklist de Integración

- [ ] Configurar `.env.local` con API_URL
- [ ] Validar CORS en backend
- [ ] Implementar endpoints de autenticación
- [ ] Implementar endpoints de proveedores
- [ ] Implementar upload de imágenes
- [ ] Usar variables de entorno para secretos
- [ ] Implementar refresh token
- [ ] Agregar logging en backend
- [ ] Configurar base de datos
- [ ] Crear índices en BD
- [ ] Testing de endpoints con Postman
- [ ] Validar todas las respuestas
- [ ] Implementar paginación
- [ ] Configurar rate limiting
- [ ] Testing de seguridad (OWASP)

---

## 13. Troubleshooting

### Error: "Cannot read property 'data' of undefined"
**Causa:** Respuesta no tiene la estructura esperada
**Solución:** Verificar que backend retorna `{ token, user }` en login

### Error: 401 Unauthorized
**Causa:** Token inválido o expirado
**Solución:** Implementar refresh token o pedir nuevo login

### Error: CORS policy
**Causa:** Backend no permite origen del frontend
**Solución:** Configurar CORS en backend

### Error: Imagen no sube
**Causa:** multipart/form-data no configurado
**Solución:** Verificar headers y formData en backend

---

## 14. Performance Tips

- Implementar paginación (ya soportado)
- Caché en localStorage (ratings previos)
- Lazy loading de imágenes
- Compresión de imágenes antes de upload
- Índices en BD para búsquedas
- Pagination en listados

---

## 15. Documentos de Referencia

- **Archivo principal de rutas:** `src/App.jsx`
- **Contexto de autenticación:** `src/context/AuthContext.jsx`
- **Cliente HTTP:** `src/services/apiClient.js`
- **Ejemplos de uso:** Dentro de cada página

---

## Próximos Pasos

1. Crear backend con Node.js/Express o Django/FastAPI
2. Implementar BD (MongoDB/PostgreSQL)
3. Conectar endpoints según esta guía
4. Testing end-to-end
5. Deployment en producción

---

**Generado:** 8 de febrero de 2026
**Stack:** React + Vite + Tailwind + Axios
**Status:** Listo para integración backend ✅
