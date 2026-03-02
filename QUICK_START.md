# 🚀 SmartWorks - Guía Rápida de Inicio

## ⚡ 5 Pasos para Empezar

### 1️⃣ Instalar Dependencias (Si no lo hiciste)
```bash
cd c:\Users\palac\Music\smartWconreact
npm install
```

### 2️⃣ Iniciar Servidor de Desarrollo
```bash
npm run dev
```
Abre tu navegador en: **http://localhost:5173**

### 3️⃣ Probar la Aplicación
- 🏠 [Inicio](http://localhost:5173/) - Página home
- 👤 [Iniciar Sesión](http://localhost:5173/login) - Login
- 📝 [Registrarse](http://localhost:5173/register) - Registro
- 👨‍⚕️ [Profesionistas](http://localhost:5173/professionals) - Catálogo
- 🔧 [Oficios](http://localhost:5173/trades) - Oficios
- 🏢 [Negocios](http://localhost:5173/businesses) - Negocios

### 4️⃣ Crear Cuenta de Prueba
**Cliente:**
1. Ir a `/register`
2. Seleccionar "Cliente"
3. Llenar formulario
4. Hacer clic en "Registrarse"
5. ✅ Se abre dashboard del cliente

**Proveedor:**
1. Ir a `/register`
2. Seleccionar "Proveedor"
3. Llenar tipo (Profesional, Oficio, o Negocio)
4. Completar formulario específico
5. ✅ Se abre dashboard del proveedor

### 5️⃣ Explorar Funcionalidades
- 📍 Hacer clic en categorías para ver proveedores
- ⭐ Dejar reseñas a proveedores
- 👤 Editar perfil en dashboard
- 🖼️ Agregar imágenes
- 💬 Contactar por WhatsApp

---

## 📁 Archivos Más Importantes

| Archivo | Hacerle qué |
|---------|-----------|
| `src/App.jsx` | Editar rutas, agregar nuevas páginas |
| `src/context/AuthContext.jsx` | Cambiar lógica de autenticación |
| `src/services/apiClient.js` | Conectar a backend |
| `src/utils/constants.js` | Editar categorías, planes |
| `tailwind.config.js` | Cambiar colores, tipografía |
| `src/pages/Home/Home.jsx` | Modificar página de inicio |

---

## 🔌 Conectar a Backend

### Opción 1: Rápida (5 minutos)
```javascript
// En src/services/apiClient.js, cambia:
const API_URL = 'http://tu-servidor:3000/api'
```

### Opción 2: Con Variables de Entorno (Recomendado)
```bash
# Crear archivo .env.local
# Contenido:
VITE_API_URL=http://localhost:3000/api
```

Ver `BACKEND_INTEGRATION_GUIDE.md` para detalles completos.

---

## 🎨 Customizar Colores

**Archivo:** `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: "#3B82F6",      // Cambiar este azul
      secondary: "#1F2937",    // O este gris
      accent: "#F59E0B",       // O este ámbar
    },
  },
},
```

Luego usar en componentes:
```jsx
<button className="bg-primary hover:bg-primary-700">
  Botón personalizado
</button>
```

---

## 📱 Verificar Responsive

1. Abrir DevTools (F12)
2. Click en icono de dispositivo móvil
3. Revisar en diferentes tamaños:
   - 📱 Móvil (320px)
   - 📱 Tablet (768px)
   - 💻 Desktop (1024px+)

---

## 🐛 Troubleshooting Rápido

### Error: "npm: command not found"
Instalar Node.js desde nodejs.org

### Error: Puerto 5173 en uso
```bash
# Cambia puerto en vite.config.js:
server: { port: 5174 }
```

### Error: Module not found
```bash
# Reinstalar dependencias
rm -r node_modules package-lock.json
npm install
```

### Error: CORS
Ver punto 4 en `BACKEND_INTEGRATION_GUIDE.md`

---

## 💡 Tips Útiles

### Limpiar Cache
```bash
# Windows
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Ver logs del servidor
Abierto en la terminal donde corres `npm run dev`

### Usar React DevTools
Instalar extensión en Chrome/Firefox para inspeccionar componentes

### Depuración con console.log
```javascript
// En cualquier componente
console.log('Debug:', variable)
// Ver en Console tab de DevTools
```

---

## 🎯 Próximos Pasos Recomendados

### Corto Plazo (Hoy)
- [ ] Explorar todas las páginas
- [ ] Probar crear cuenta
- [ ] Revisar diseño responsive
- [ ] Leer código de componentes

### Mediano Plazo (Esta semana)
- [ ] Conectar backend
- [ ] Implementar endpoints
- [ ] Testing end-to-end
- [ ] Ajustes de diseño

### Largo Plazo (Este mes)
- [ ] Agregar WebSockets
- [ ] Implementar booking
- [ ] Agregar pagos
- [ ] Deploy a producción

---

## 📖 Documentos de Referencia

| Documento | Sobre qué |
|-----------|----------|
| `README.md` | Descripción general |
| `DEVELOPMENT_SUMMARY.md` | Todo lo que se creó |
| `BACKEND_INTEGRATION_GUIDE.md` | Cómo conectar API |
| `FEATURES_AND_EXTENSIONS.md` | Cómo agregar funciones |
| `QUICK_START.md` | Eres aquí 👈 |

---

## 🚨 Puntos de Atención

⚠️ **Mock Data**: Todo está con datos de prueba
- Reemplazar con API real cuando esté lista

⚠️ **Autenticación**: Works locally, needs backend
- Actualmente usa localStorage
- Backend debe validar tokens

⚠️ **Imágenes**: Suben a localStorage (demo)
- Implementar cloud storage (S3, GCS)

⚠️ **Variables privadas**: Nada en .env visible en frontend
- Secretos backend-only en .env backend

---

## 🔐 Security Reminders

✅ **Frontend seguro:**
- Validación de inputs
- Sanitización de HTML

⚠️ **Backend DEBE hacer:**
- Validar TODOS los inputs
- Hashear contraseñas (bcrypt)
- Validar roles en endpoints
- Rate limiting
- HTTPS en producción

---

## 📊 Información útil

### Rutas de Dashboard
- Cliente: `/dashboard/client`
- Proveedor: `/dashboard/provider`  
- Admin: `/admin`

### Roles en Sistema
- `client` - Usuario que busca servicios
- `professional` - Profesional independiente
- `trade` - Persona con oficio
- `business` - Negocio con local
- `admin` - Administrador del sistema

### Planes de Suscripción
- Gratuito: $0
- Básico: $9.99/mes
- Profesional: $29.99/mes

---

## 💬 Ejemplos de Uso

### Agregar un nuevo componente
```javascript
// 1. Crear archivo en src/components/
// src/components/MyComponent/MyComponent.jsx

// 2. Importar en página
import MyComponent from '@/components/MyComponent/MyComponent'

// 3. Usar en JSX
<MyComponent prop={value} />
```

### Llamar API desde componente
```javascript
import { useEffect, useState } from 'react'
import providerService from '@/services/providerService'

export const MyPage = () => {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    providerService
      .getAllProviders(1, 10)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [])
  
  return <div>{/* render data */}</div>
}
```

---

## 🎉 ¡Felicitaciones!

SmartWorks está listo para:
- ✅ Desarrollo local
- ✅ Integración con backend
- ✅ Customización visual
- ✅ Expansión de funcionalidades
- ✅ Deployment a producción

---

## 📞 Ayuda Rápida

**¿Dónde está...?**
- Componentes → `src/components/`
- Páginas → `src/pages/`
- Estilos → `src/styles/index.css` y `tailwind.config.js`
- Constantes → `src/utils/constants.js`
- Validación → `src/utils/validation.js`
- Helpers → `src/utils/helpers.js`

**¿Cómo ...?**
- Cambiar colores → Ver sección "Customizar Colores"
- Agregar ruta → Editar `src/App.jsx`
- Conectar API → Ver `BACKEND_INTEGRATION_GUIDE.md`
- Agregar componente → Ver "Ejemplos de Uso"

---

**🎊 ¡Bienvenido a SmartWorks!**

Creado: 8 de febrero de 2026
Versión: 1.0.0
Estado: ✅ LISTO PARA USAR
