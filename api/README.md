# 🚀 SmartWork Backend API

## 📖 ¿Qué es esto?

Esta carpeta contiene el **backend (servidor API)** de SmartWork. Es el corazón del proyecto que:

- ✅ **Gestiona la autenticación** - Login, registro y tokens JWT
- ✅ **Almacena datos** - Base de datos MariaDB con usuarios, proveedores, servicios, etc
- ✅ **Expone endpoints** - API REST que el frontend consume
- ✅ **Valida y procesa** - Toda la lógica de negocio
- ✅ **Protege datos** - Encriptación de contraseñas y autenticación

---

## 🏗️ Arquitectura

```
Frontend (React)               Backend (Node.js)              Base de Datos
┌──────────────────┐          ┌─────────────────┐           ┌──────────────┐
│ Navegador        │  HTTP    │ Express Server  │  SQL      │  MariaDB     │
│                  │◄────────►│ Puerto 5000     │◄─────────►│  smartwork   │
│ localhost:5173   │  REST    │                 │           │  _db         │
└──────────────────┘          └─────────────────┘           └──────────────┘
```

### Flujo de una petición:

1. **Frontend envía request** → `POST /api/auth/login` con credenciales
2. **Backend recibe** → Express procesa la solicitud
3. **Valida en BD** → Consulta MariaDB para verificar usuario
4. **Genera JWT** → Token de autenticación
5. **Retorna respuesta** → JSON con token y datos del usuario
6. **Frontend guarda token** → localStorage para futuras peticiones

---

## 📁 Estructura de carpetas

```
api/
├── config/
│   └── database.js           # Conexión a MariaDB con pool
├── middleware/
│   └── auth.js               # Verificación JWT y roles (admin)
├── controllers/
│   ├── authController.js     # Lógica: registro, login
│   └── userController.js     # Lógica: CRUD usuarios
├── routes/
│   ├── auth.js               # Rutas: /api/auth/*
│   └── users.js              # Rutas: /api/users/*
├── server.js                 # Servidor Express principal
├── package.json              # Dependencias Node.js
├── .env                      # Credenciales (usuario, contraseña BD)
├── .env.example              # Ejemplo de .env
└── smartwork.sql             # Script para crear BD y tablas
```

---

## 🔧 Instalación y Setup

### Paso 1: Requisitos
```bash
# Node.js v16+ y MariaDB 10.5+
node --version
mysql --version
```

### Paso 2: Crear base de datos
```bash
cd api
mysql -u root -p < smartwork.sql
```
(Presiona ENTER si no tiene contraseña)

### Paso 3: Copiar `.env`
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de MariaDB:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=smartwork_db
PORT=5000
```

### Paso 4: Instalar dependencias
```bash
npm install
```

### Paso 5: Ejecutar backend
```bash
npm run dev
```

Deberías ver:
```
🚀 Servidor ejecutándose en puerto 5000
```

---

## 📚 Endpoints API

### 🔐 Autenticación (Sin token requerido)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario |
| `POST` | `/api/auth/login` | Iniciar sesión |

**Ejemplo - Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"admin@smartwork.com",
    "password":"admin123"
  }'
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": 1,
    "email": "admin@smartwork.com",
    "nombre": "Administrador",
    "rol": "admin"
  }
}
```

---

### 👥 Usuarios (Requiere token JWT)

| Método | Ruta | Descripción | Permiso |
|--------|------|-------------|---------|
| `GET` | `/api/users` | Ver todos los usuarios | Admin |
| `GET` | `/api/users/:id` | Ver usuario por ID | Cualquiera |
| `PUT` | `/api/users/:id` | Actualizar usuario | Dueño/Admin |
| `PUT` | `/api/users/:id/password` | Cambiar contraseña | Dueño |
| `DELETE` | `/api/users/:id` | Eliminar usuario | Admin |

**Ejemplo - Obtener todos (requiere token):**
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer tu_token_aqui"
```

---

## 🔐 Autenticación con JWT

### ¿Cómo funciona?

1. **Usuario hace login** → Envía email y contraseña
2. **Backend verifica** → Compara con BD (contraseña hasheada con bcrypt)
3. **Genera JWT** → Token con datos del usuario (válido 7 días)
4. **Frontend guarda** → En localStorage
5. **Frontend envía en headers** → Todas las peticiones llevan: `Authorization: Bearer {token}`
6. **Backend valida** → Middleware verifica que el token sea válido

### Token JWT incluye:
- `id` del usuario
- `email`
- `rol` (usuario o admin)
- `nombre`
- `iat` (fecha creación)
- `exp` (fecha expiración)

---

## 🔒 Seguridad

### Contraseñas
- **Hasheadas con bcrypt** (no se guardan en texto plano)
- Hash único por usuario
- Imposible recuperar la original

### Tokens
- **JWT con secreto privado** (variable `JWT_SECRET`)
- **Expiran después de 7 días**
- **Se validan en cada petición**

### Validaciones
- Email único por usuario
- Campos requeridos validados
- No se permite eliminar último admin

---

## 🔄 Integración con Frontend

### 1. Cliente HTTP (apiClient.js)
El frontend usa Axios como cliente HTTP:
```javascript
// Apunta al backend
const API_URL = 'http://localhost:5000/api'

// Interceptor: agrega token automáticamente
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### 2. Servicios (authService.js, userService.js)
Cada servicio encapsula llamadas a la API:
```javascript
// authService.js
export const authService = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  
  register: (userData) =>
    apiClient.post('/auth/register', userData),
}

// userService.js
export const userService = {
  getAllUsers: () =>
    apiClient.get('/users'),
  
  updateUser: (userId, data) =>
    apiClient.put(`/users/${userId}`, data),
    
  createUser: (userData) =>
    apiClient.post('/auth/register', userData),
}
```

### 3. Contexto (AuthContext.jsx)
Maneja el estado de autenticación globalmente:
```javascript
// Guarda token y usuario después del login
login(userData, authToken) {
  localStorage.setItem('authToken', authToken)
  localStorage.setItem('user', JSON.stringify(userData))
}

// Limpia después del logout
logout() {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
}
```

### 4. Páginas usan hooks
Las páginas acceden al contexto con hooks:
```javascript
const { user, login, logout, token } = useAuth()
```

---

## 👨‍💼 Casos de Uso del Admin Panel

### Crear Usuario
```javascript
// Frontend envía
await userService.createUser({
  email: 'nuevo@ejemplo.com',
  password: 'password123',
  nombre: 'Nuevo Usuario',
  rol: 'usuario'
})

// Backend
1. Valida datos
2. Hashea contraseña con bcrypt
3. Inserta en BD
4. Retorna usuario creado
```

### Editar Usuario
```javascript
// Frontend envía
await userService.updateUser(userId, {
  email: 'actualizado@ejemplo.com',
  nombre: 'Nombre Actualizado',
  rol: 'admin'
})

// Backend
1. Verifica que es admin
2. Valida email único
3. Actualiza en BD
4. Retorna confirmación
```

### Eliminar Usuario
```javascript
// Frontend envía
await userService.deleteUser(userId)

// Backend
1. Verifica que es admin
2. Previene eliminar último admin
3. Elimina de BD
4. Retorna confirmación
```

---

## 🧪 Probar endpoints (curl)

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Registrar Usuario
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "123456",
    "nombre": "Usuario Test"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@smartwork.com",
    "password": "admin123"
  }'
```

### 4. Obtener Todos (con token)
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer tu_token_aqui"
```

### 5. Actualizar Usuario
```bash
curl -X PUT http://localhost:5000/api/users/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu_token_aqui" \
  -d '{
    "nombre": "Nombre Nuevo",
    "email": "nuevo@ejemplo.com",
    "rol": "usuario"
  }'
```

### 6. Eliminar Usuario
```bash
curl -X DELETE http://localhost:5000/api/users/2 \
  -H "Authorization: Bearer tu_token_aqui"
```

---

## 📊 Base de Datos

### Tablas creadas:

| Tabla | Descripción |
|-------|-------------|
| `usuarios` | Email, contraseña hasheada, nombre, rol |
| `proveedores` | Profesionales, oficios, negocios |
| `servicios` | Servicios ofrecidos por proveedores |
| `resenas` | Reseñas y calificaciones |
| `planes` | Planes de suscripción |
| `suscripciones` | Suscripciones activas de proveedores |
| `categorias` | Categorías de servicios |

---

## ⚠️ Troubleshooting

| Problema | Solución |
|----------|----------|
| `Cannot POST /api/auth/login` | Backend no corre. Ejecuta `npm run dev` |
| `Error: Access denied for user` | Credenciales BD incorrectas en `.env` |
| `ECONNREFUSED` | MariaDB no activo. `sudo systemctl start mariadb` |
| `401 Token inválido` | Token expirado o incorrecto. Logout y login |
| `404 Not Found` | Endpoint no existe. Verifica la ruta |
| `El email ya está registrado` | Usa otro email al registrar |

---

## 🚀 Variables de Entorno

En `.env`:
```env
# Base de Datos
DB_HOST=localhost          # Host donde corre MariaDB
DB_USER=root               # Usuario de BD
DB_PASSWORD=               # Contraseña de BD
DB_NAME=smartwork_db       # Nombre de la BD
DB_PORT=3306              # Puerto de MariaDB

# Seguridad
JWT_SECRET=...            # Clave secreta para firmar tokens
JWT_EXPIRATION=7d         # Duración de tokens

# Servidor
PORT=5000                 # Puerto donde corre el backend
NODE_ENV=development      # production o development
```

---

## 📝 Resumen de Tecnologías

```
Backend Stack:
├── Node.js           - Runtime JavaScript
├── Express.js        - Framework web
├── MariaDB           - Base de datos relacional
├── JWT               - Autenticación con tokens
├── bcrypt            - Encriptación de contraseñas
├── mysql2            - Driver MySQL/MariaDB
├── CORS              - Seguridad de origen cruzado
└── nodemon           - Auto-reload en desarrollo
```

---

## 💡 Notas Importantes

- El backend corre en puerto **5000**
- El frontend espera en `http://localhost:5000/api`
- Los tokens expiran en **7 días**
- Las contraseñas se guardan **hasheadas** (no recuperables)
- Solo **admins** pueden ver todos los usuarios
- El **último admin NO puede ser eliminado**
- Los emails son **únicos** por usuario
- Las contraseñas deben tener **mínimo 6 caracteres**

---

## 📞 Conexión Frontend-Backend en Detalle

### 1. Frontend inicia sesión
```
Browser (React) → POST /api/auth/login → Backend
```

### 2. Backend valida y retorna token
```
Backend → JSON {token, usuario} → Browser
```

### 3. Frontend guarda token
```
localStorage.setItem('authToken', token)
```

### 4. Frontend envía token en siguiente petición
```
GET /api/users
Header: Authorization: Bearer {token}
```

### 5. Backend valida token
```
middleware auth.js → verifyToken() → válido? →  permite
```

### 6. Backend retorna datos
```
Backend → JSON {usuarios:[...]} → Browser
```

---

## ✨ Funcionalidades Actuales

- ✅ Autenticación con JWT
- ✅ Registro de usuarios
- ✅ Login seguro
- ✅ CRUD completo de usuarios
- ✅ Control de roles (admin/usuario)
- ✅ Validaciones en backend
- ✅ Encriptación de contraseñas
- ✅ Tokens seguros expirables

---

## 🎯 Próximos Endpoints

Para agregar más funcionalidades:
- [ ] CRUD Proveedores
- [ ] CRUD Servicios
- [ ] Sistema de Reseñas
- [ ] Planes de Suscripción
- [ ] Búsqueda avanzada
- [ ] Filtros por categoría

---

¡**Backend completamente funcional e integrado con el frontend!** 🎉
