# SmartWorks - Guía de Dashboard Personalizados

## 🎯 Visión General

Cada rol en SmartWorks tiene un dashboard completamente personalizado diseñado para sus necesidades específicas:

- **👨‍💼 Profesionista / Técnico**: Dashboard enfocado en gestión de servicios, tarifas, experiencia y reseñas
- **🏢 Negocio**: Panel empresarial para gestionar equipo, servicios múltiples y desempeño general
- **👤 Cliente**: Interfaz para buscar servicios, enviar solicitudes y gestionar favoritos
- **👨‍💻 Administrador**: Panel de control y gestión del sistema

---

## 📋 Usuarios Disponibles

### 1. Profesionista (Ingeniero)
- **Email**: `profesional@smartworks.com`
- **Contraseña**: `123456`
- **Dashboard**: Azul - Gestión de servicios profesionales
- **Características**: 
  - Estadísticas de calificación y experiencia
  - Gestión de tarifa por hora
  - Perfil detallado con especialidad

### 2. Técnico/Oficio (Electricista)
- **Email**: `electricista@smartworks.com`
- **Contraseña**: `123456`
- **Dashboard**: Azul - Igual que profesionista
- **Características**:
  - Seguimiento de trabajos completados
  - Gestión de disponibilidad
  - Sistema de presupuestos

### 3. Negocio (Empresa)
- **Email**: `empresa@smartworks.com`
- **Contraseña**: `123456`
- **Dashboard**: Verde - Gestión empresarial
- **Características**:
  - Dashboard de equipo
  - Múltiples servicios
  - Estadísticas de empleados
  - Gestión de sitio web

### 4. Cliente
- **Email**: `usuario@smartworks.com`
- **Contraseña**: `123456`
- **Dashboard**: Naranja - Búsqueda y solicitudes
- **Características**:
  - Búsqueda de profesionales
  - Envío de solicitudes
  - Gestión de favoritos
  - Historial de servicios

### 5. Administrador
- **Email**: `admin@smartworks.com`
- **Contraseña**: `123456`
- **Panel**: Control total del sistema
- **Características**:
  - Gestión de usuarios
  - Moderación de contenido
  - Estadísticas del sistema

---

## 🚀 Cómo Acceder

1. Ve a http://localhost:5173/login
2. En la sección **"📋 Usuarios Disponibles"**, busca el usuario que deseas probar
3. Haz clic en el botón **"Usar"** para cargar automáticamente sus credenciales
4. Presiona **"Iniciar Sesión"**
5. Serás redirigido automáticamente a tu dashboard personalizado

---

## 🎨 Características de Cada Dashboard

### Dashboard Profesionista/Técnico (Azul)
```
Header con nombre, especialidad y ubicación
Estadísticas: Rating, Reseñas, Experiencia, Tarifa/hora

Tabs:
- Resumen: Información general y accesos rápidos
- Perfil: Edición de datos personales y profesionales
- Servicios: Gestión de servicios ofrecidos
- Reseñas: Panel de reseñas y calificaciones
```

### Dashboard Negocio (Verde)
```
Header con nombre de empresa y ubicación
Estadísticas: Empleados, Rating, Reseñas, Servicios Activos

Tabs:
- Resumen: Dashboard principal con KPIs
- Empresa: Información y configuración empresarial
- Servicios: Catálogo de servicios ofrecidos
- Equipo: Gestión de miembros del equipo
```

### Dashboard Cliente (Naranja)
```
Header con nombre y ubicación
Estadísticas: Solicitudes, Favoritos, Reseñas Hechas, Horas Ahorradas

Tabs:
- Resumen: Opciones rápidas (Buscar, Solicitar, Favoritos, Historial)
- Perfil: Datos personales editables
- Mis Solicitudes: Solicitudes de servicios
- Favoritos: Profesionales marcados como favoritos
```

---

## 📱 Funcionalidades Implementadas

✅ **Login Responsivo**: Acceso a usuarios por rol
✅ **Dashboards Personalizados**: Interfaz única para cada rol
✅ **Edición de Perfil**: Cada usuario puede editar sus datos
✅ **Estadísticas**: Métricas relevantes para cada rol
✅ **Navegación Intuitiva**: Tabs organizados por función
✅ **Diseño Responsive**: Funciona en móvil, tablet y desktop
✅ **Redirección Automática**: El sistema redirige según el rol

---

## 🔧 Próximas Funcionalidades

- [ ] Integración con base de datos real
- [ ] Sistema de notificaciones
- [ ] Chat en tiempo real
- [ ] Pasarela de pagos
- [ ] Agendamiento de citas
- [ ] Búsqueda avanzada con filtros
- [ ] Galería de trabajos completados

---

## 💡 Notas Importantes

- **Contraseña Simple**: Usamos `123456` para facilitar el testing. En producción usar contraseñas seguras.
- **Datos Simulados**: Las estadísticas son datos de ejemplo. Se actualizarán cuando se integre la API.
- **Sesión en LocalStorage**: Los usuarios se almacenan en localStorage para desarrollo local.
- **Sin Backend**: Actualmente funciona sin backend. Se integrará próximamente.

---

## 🎓 Flujo de Uso Recomendado

### Para Probar como Profesionista:
1. Login con `profesional@smartworks.com`
2. Ve al tab "Perfil" y haz clic en "Editar"
3. Actualiza tu información
4. Explora las reseñas y estadísticas

### Para Probar como Negocio:
1. Login con `empresa@smartworks.com`
2. Ve al tab "Empresa" para editar información
3. Revisa el equipo y servicios
4. Observa las estadísticas empresariales

### Para Probar como Cliente:
1. Login con `usuario@smartworks.com`
2. Explora las opciones en "Resumen"
3. Edita tu perfil
4. Intenta crear una solicitud

---

## 📞 Soporte

Para más información o reportar problemas, contacta al equipo de desarrollo.
