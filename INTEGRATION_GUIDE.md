# 🚀 Guía de Integración Frontend + Backend

## 📋 Checklist de Integración Completada

✅ **Backend (Node.js + Express)**
- Servidor ejecutándose en puerto 5000
- Autenticación con JWT + bcrypt
- CRUD de usuarios
- Base de datos MariaDB

✅ **Frontend (React)**
- Conectado a la API backend
- Login y Register using API
- Panel Admin para gestionar usuarios
- AuthContext con JWT tokens

---

## 🏃 Cómo Ejecutar

### Paso 1: Terminal 1 - Backend

```bash
cd api
npm install
npm run dev
```

**Esperado:**
```
🚀 Servidor ejecutándose en puerto 5000
```

### Pasos 2: Terminal 2 - Crear Base de Datos

```bash
cd api
mysql -u root -p < smartwork.sql
```

(Presiona Enter si no has configurado contraseña en MariaDB)

### Paso 3: Terminal 3 - Frontend

```bash
cd ../  (o ve a la raíz del proyecto)
npm run dev
```

**Esperado:**
```
VITE v5.0.0  ready in 245 ms

➜  Local:   http://localhost:5173/
```

---

## ✅ Probar la Integración

### 1. **Acceder al Login**
- URL: http://localhost:5173/login
- Email: `admin@smartwork.com`
- Contraseña: `admin123`

### 2. **Si tira error de conexión:**
- Verifica que el backend esté corriendo (`npm run dev` en `/api`)
- Verifica que MariaDB esté activo
- Revisa la consola del navegador (F12) para ver el error

### 3. **Crear nuevo usuario**
- Ir a `/register`
- Llenar el formulario (se guardará en la BD)
- Ir a login y entrar con esas credenciales

### 4. **Gestionar usuarios (Admin)**
- Loguear como admin
- Se redirige automáticamente a `/admin`
- Editar/eliminar usuarios desde la tabla

---

## 🔍 Endpoints Disponibles (API)

### Autenticación
```
POST /api/auth/register
POST /api/auth/login
```

### Usuarios (requieren token JWT)
```
GET /api/users                    # Obtener todos (admin)
GET /api/users/:id                # Obtener por ID
PUT /api/users/:id                # Actualizar
PUT /api/users/:id/password       # Cambiar contraseña
DELETE /api/users/:id             # Eliminar (admin)
```

---

## 📁 Estructura Actualizada

```
smartwork/
├── api/
│   ├── config/              ← Conexión DB
│   ├── controllers/         ← Lógica de negocio
│   ├── middleware/          ← Autenticación JWT
│   ├── routes/              ← Endpoints
│   ├── server.js            ← Servidor Express
│   ├── smartwork.sql        ← Script BD
│   └── package.json
│
├── src/
│   ├── services/
│   │   ├── apiClient.js     ← ACTUALIZADO a puerto 5000
│   │   ├── authService.js   ← Login/Register
│   │   └── userService.js   ← NUEVO: CRUD usuarios
│   ├── context/
│   │   └── AuthContext.jsx  ← ACTUALIZADO con JWT
│   └── pages/
│       ├── Login/Login.jsx  ← ACTUALIZADO a API
│       ├── Register/        ← ACTUALIZADO a API
│       └── AdminPanel/      ← ACTUALIZADO a API
```

---

## 🔐 Flujo de Autenticación

1. **Frontend envía credenciales** → `POST /api/auth/login`
2. **Backend verifica y genera JWT** → Retorna token
3. **Frontend guarda token en localStorage**
4. **Todos los requests incluyen Authorization header** → `Bearer {token}`
5. **Backend valida token** en cada petición

---

## ⚠️ Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `ECONNREFUSED` | Backend no está corriendo | `npm run dev` en `/api` |
| `Error de BD` | MariaDB no instalado o script no ejecutado | `mysql -u root -p < smartwork.sql` |
| `401 Token inválido` | Token expirado o incorrecto | Hacer logout y login nuevamente |
| `Email ya existe` | Usuario duplicado | Usar otro email |

---

## 🎯 Próximos Pasos

1. ✅ **Completado**: Login, Register, CRUD de usuarios
2. 📋 **Próximo**: CRUD de proveedores y servicios
3. 📋 **Próximo**: Integrar sistema de reseñas
4. 📋 **Próximo**: Planes de suscripción
5. 📋 **Próximo**: Deploy a producción

---

## 📞 Variables de Entorno

En `/api/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=       # Tu contraseña de MySQL (vacío si no tiene)
DB_NAME=smartwork_db
JWT_SECRET=tu_clave_super_secreta
PORT=5000
```

---

¡**Backend y Frontend están integrados y listos para usar!** 🎉
