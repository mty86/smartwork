# SmartWorks - Guía de Características y Extensiones

## 📄 MÓDULO 1: HOME + LOGIN + REGISTRO

### 1.1 Home Page (`src/pages/Home/Home.jsx`)

#### Características Actuales
- Hero section con call-to-action
- Sección "¿Cómo Funciona?" con 3 pasos
- Grid de 3 categorías principales
- CTA final para proveedores
- Totalmente responsive

#### Cómo Extender
```javascript
// Agregar más secciones
const testimonials = [
  { author: "María", rating: 5, comment: "..." },
  // Más testimonios
]

// Esta seción ya está lista para agregar:
<section className="py-16">
  <h2>Testimonios de Clientes Satisfechos</h2>
  {testimonials.map(t => <TestimonialCard key={t.author} {...t} />)}
</section>

// Agregar blog section
// Agregar FAQ section
// Agregar newsletter signup
```

#### Componentes Utilizados
- Navbar (navigation)
- Footer (bottom)
- Hero section (custom)
- Feature cards (custom)
- CTA buttons (Link)

### 1.2 Login Page (`src/pages/Login/Login.jsx`)

#### Características Actuales
- Campo email/usuario
- Campo contraseña con show/hide
- Validación en tiempo real
- Manejo de errores con mensajes
- Link a registro
- Persistencia de sesión
- Redirección después de login

#### Cómo Extender
```javascript
// Agregar "Olvidé mi contraseña"
<Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>

// Agregar login social (Google, Facebook)
<GoogleLoginButton />
<FacebookLoginButton />

// Agregar verificación de 2FA
if (user.twoFactorEnabled) {
  return <TwoFactorModal />
}

// Agregar "Recuérdame"
<input type="checkbox" name="rememberMe" />
```

#### Hooks Utilizados
- `useNavigate()` - Redirección
- `useAuth()` - Autenticación
- `useState()` - Form state

### 1.3 Register Page (`src/pages/Register/Register.jsx`)

#### Características Actuales
- Selección de tipo de usuario (3 pasos)
- Validación de email único (frontend)
- Validación de contraseña
- Formularios dinámicos por tipo
- Campos específicos por tipo de proveedor
- Redirección automática para negocios sin local

#### Profesional Form
```javascript
// Campos:
- Nombre, Apellido
- Email, Contraseña
- Cédula profesional
- Especialidad (select dinámico)
- Teléfono
- Dirección (opcional)
- Tipo de atención
```

#### Oficio Form
```javascript
// Campos:
- Nombre, Apellido
- Email, Contraseña
- Oficio (select dinámico)
- Teléfono
- Zona de trabajo (opcional)
```

#### Negocio Form
```javascript
// Campos:
- Nombre del negocio
- Email, Contraseña
- ¿Tiene local físico? (sí/no)
  - Si NO → Redirige a registro de Profesional/Oficio
  - Si SÍ:
    - Dirección
    - Horarios y días
    - Teléfono
    - Categoría
```

#### Cómo Extender
```javascript
// Agregar verificación de email
if (!emailVerified) {
  await sendVerificationEmail(email)
  return <EmailVerificationScreen />
}

// Agregar upload de documento en registro
<DocumentUpload label="Cédula profesional" />

// Agregar términos y condiciones dinámicos
<TermsAndConditions role={userType} />

// Agregar capcha
<ReCaptcha />
```

---

## 📄 MÓDULO 2: CATÁLOGOS DE SERVICIOS

### 2.1 Professionals (`src/pages/Professionals/Professionals.jsx`)

#### Características Actuales
- Grid de 9 categorías profesionales
- Búsqueda de categorías
- Cards interactivos
- Navegación a listado por categoría

#### Categorías Incluidas
1. Médico General 🏥
2. Dentista 🦷
3. Cirujano ⚕️
4. Veterinario 🐾
5. Abogado ⚖️
6. Contador 📊
7. Ingeniero Civil 🏗️
8. Desarrollo de Software 💻
9. Sistemas 🖥️

#### Cómo Extender
```javascript
// Agregar filtros adicionales
const [filters, setFilters] = useState({
  experience: 'all',
  rating: 0,
  price: [0, 1000],
  availability: 'any'
})

// Agregar búsqueda por nombre
<input 
  placeholder="Busca profesional específico"
  onChange={(e) => filterByName(e.target.value)}
/>

// Agregar sorting
<select onChange={(e) => sortCategories(e.target.value)}>
  <option>Más populares</option>
  <option>Mejor calificado</option>
  <option>Más reseñas</option>
</select>

// Listado de profesionales por categoría
<ProfessionalsList category={selectedCategory} />
```

### 2.2 Trades (`src/pages/Trades/Trades.jsx`)

#### Características Actuales
- Grid de 7 categorías de oficios
- Búsqueda de oficios
- Cards interactivos

#### Categorías Incluidas
1. Carpintero 🪵
2. Electricista ⚡
3. Plomero 🔧
4. Albañil 🧱
5. Mecánico 🔩
6. Pintor 🎨
7. Soldador 🔥

#### Cómo Extender
```javascript
// Similar a Professionals
// Agregar zona de servicio (radio desde ubicación)
<ZoneFilter radius={5} unit="km" />

// Agregar especialidades por oficio
const specialties = {
  Electricista: ['Residencial', 'Industrial', 'Comercial'],
  Plomero: ['Agua', 'Gas', 'Sanitarios']
}

// Filtrar por disponibilidad
<AvailabilityFilter times={['Mañana', 'Tarde', 'Noche']} />
```

### 2.3 Businesses (`src/pages/Businesses/Businesses.jsx`)

#### Características Actuales
- Grid de negocios locales
- Búsqueda de negocios
- Información básica

#### Cómo Extender
```javascript
// Agregar filtros específicos para negocios
<HoursFilter />      // Abierto ahora
<LocationFilter />   // Distancia
<CategoryFilter />   // Tipo de negocio
<PriceFilter />      // Rango de precios

// Agregar vista de mapa
<MapView businesses={businesses} />

// Agregar "Cerca de ti"
const nearby = getNearbyBusinesses(userLocation, 2) // 2km

// Agregar favoritos
<FavoriteButton businessId={business.id} />

// Agregar promociones activas
{business.activePromos && <PromoCard promo={business.promo} />}
```

---

## 📄 MÓDULO 3: VISTA DETALLADA + RESEÑAS

### 3.1 Provider Detail (`src/pages/ProviderDetail/ProviderDetail.jsx`)

#### Secciones Actuales
- Información general del proveedor
- Botones de contacto (WhatsApp, Teléfono, Email)
- Galería de imágenes
- Sistema de reseñas
- Formulario de reseña (solo autenticados)

#### Información Mostrada
```javascript
- Nombre completo
- Tipo (Profesional/Oficio/Negocio)
- Especialidad/Oficio
- Foto principal
- Dirección
- Teléfono
- Email
- Rating promedio
- Número de reseñas
```

#### Cómo Extender
```javascript
// Agregar mapa interactivo
<MapComponent lat={provider.lat} lng={provider.lng} />

// Agregar horarios de atención
<BusinessHours hours={provider.hours} />

// Agregar certificados/credenciales
<Credentials certificates={provider.certificates} />

// Agregar galería con carousel
<ImageCarousel images={provider.images} />

// Agregar botón de compartir
<ShareButton provider={provider} />

// Agregar "Ver más proveedores similares"
<SimilarProviders category={provider.category} />

// Agregar preguntas frecuentes
<FAQSection providerId={provider.id} />

// Agregar horarios de disponibilidad para citas
<BookingCalendar providerId={provider.id} />
```

#### Rating Component (`src/components/Ratings/RatingComponent.jsx`)

```javascript
// Actualmente:
- 5 estrellas interactivas
- Lectura (disabled)
- Edición (editable=true)
- Muestra número

// Extender con:
- Desglose de calificaciones (5⭐ 45%, 4⭐ 30%, etc.)
- Gráfico de distribución
- Filtro por rating
- Ordenar por relevancia
```

---

## 📄 MÓDULO 4: DASHBOARDS POR ROL

### 4.1 Dashboard Cliente (`src/pages/DashboardClient/DashboardClient.jsx`)

#### Tabs Actuales
- Perfil (editable)
- Reseñas realizadas

#### Información del Perfil
```javascript
- Nombre
- Apellido
- Email
- Teléfono
- Editar/Guardar cambios
```

#### Reseñas Mostrando
- Proveedor
- Calificación
- Comentario
- Fecha

#### Cómo Extender
```javascript
// Agregar nueva pestaña: Favoritos
<Tab name="favoritos">
  <FavoriteProvidersList />
</Tab>

// Agregar: Historial de búsquedas
<SearchHistory />

// Agregar: Citas/Reservas (cuando se implemente booking)
<AppointmentsList />

// Agregar: Notificaciones
<NotificationCenter />

// Agregar: Suscripciones (newsletter, alertas)
<SubscriptionPreferences />

// Agregar: Descarga de datos (GDPR)
<DataExport />

// Agregar: Cambiar contraseña
<ChangePasswordForm />

// Agregar: Two-Factor Authentication
<TwoFactorSetup />
```

### 4.2 Dashboard Proveedor (`src/pages/DashboardProvider/DashboardProvider.jsx`)

#### Tabs Actuales
- Perfil (editable)
- Imágenes (upload, galería, delete)
- Reseñas (lectura)
- Planes (seleccionar, actualizar)
- Estadísticas (visitas, rating, reseñas, posición)

#### Funcionalidades de Perfil
```javascript
- Editar datos personales
- Cambiar especialidad
- Actualizar dirección
- Editar teléfono
- Guardado automático
```

#### Funcionalidades de Imágenes
```javascript
- Drag & drop upload
- Preview antes de guardar
- Eliminar imagen
- Ordenar imágenes (drag)
- Comprimir automática
```

#### Cómo Extender
```javascript
// Agregar: Más estadísticas
<AdvancedStats>
  <ConversionRate /> {/* Visitas → Contactos */}
  <TrendChart />     {/* Últimos 30 días */}
  <ComparisonChart /> {/* Vs otros proveedores */}
</AdvancedStats>

// Agregar: Mensajes de clientes
<MessagesTab />

// Agregar: Citas programadas
<AppointmentsTab />

// Agregar: Facturación (historial de planes)
<BillingHistory />

// Agregar: Encuestas de feedback
<FeedbackSurveys />

// Agregar: Certificados y validaciones
<CertificateManagement />

// Agregar: Disponibilidad/Calendario
<AvailabilityCalendar />

// Agregar: Promociones activas
<ActivePromotions />

// Agregar: Integración con Google My Business
<GoogleBusinessSync />

// Agregar: Responder a reseñas
<ReviewResponses />
```

#### Plan Details Actuales
```javascript
- Gratuito: $0
  - Perfil básico
  - Contacto directo
  - Reseñas
  
- Básico: $9.99/mes
  - Mejor posicionamiento
  - Galería ampliada
  - Estadísticas visitas
  - Soporte prioritario
  
- Profesional: $29.99/mes
  - Posicionamiento premium
  - Galería ilimitada
  - Estadísticas detalladas
  - Widget redes sociales
  - Soporte 24/7
```

### 4.3 Admin Panel (`src/pages/AdminPanel/AdminPanel.jsx`)

#### Tabs Actuales
- Usuarios (listar, editar, eliminar)
- Categorías (listar, editar, crear, eliminar)
- Planes (listar, editar, crear, eliminar)
- Proveedores (placeholder)
- Administradores (placeholder)

#### Gestión de Usuarios
```javascript
- Tabla con: Nombre, Email, Tipo, Estado
- Acciones: Editar, Eliminar, Suspender
- Búsqueda y filtros
- Paginación
```

#### Gestión de Categorías
```javascript
- Tabla: Nombre, Tipo, Acciones
- Crear nueva categoría
- Editar nombre/descripción
- Eliminar categoría
- Ordenar posición
```

#### Gestión de Planes
```javascript
- Tabla: Nombre, Precio, Beneficios
- Crear nuevo plan
- Editar precio y beneficios
- Eliminar plan
- Activar/Desactivar
```

#### Cómo Extender
```javascript
// Agregar: Dashboard de estadísticas
<AdminDashboard>
  <TotalUsers />
  <TotalProviders />
  <Revenue />
  <ActivePlans />
  <NewUsersChart />
</AdminDashboard>

// Agregar: Reportes avanzados
<ReportsSection>
  <UserActivityReport />
  <ProviderPerformance />
  <RevenueReport />
  <SupportTickets />
</ReportsSection>

// Agregar: Moderación de contenido
<ContentModeration>
  <PendingReviews />
  <FlaggedContent />
  <ApprovalQueue />
</ContentModeration>

// Agregar: Sistema de tickets de soporte
<SupportTickets />

// Agregar: Email marketing
<EmailCampaigns />

// Agregar: Configuración de sistema
<SystemSettings>
  <MaintenanceMode />
  <SMTPConfig />
  <PaymentGateway />
  <EmailTemplates />
</SystemSettings>

// Agregar: Auditoría y logs
<AuditLogs />

// Agregar: Backup y datos
<DataManagement />

// Agregar: Roles y permisos personalizados
<RoleManagement />
```

---

## 🔧 Componentes Reutilizables Disponibles

### Input.jsx
```javascript
<Input
  type="text|email|password|tel"
  label="Etiqueta"
  placeholder="Placeholder"
  value={value}
  onChange={handleChange}
  error={errorMessage}
  required={true}
/>
```

### RatingComponent.jsx
```javascript
<RatingComponent
  rating={4}
  onRatingChange={handleRatingChange}
  editable={false}
/>
```

### ProviderCard.jsx
```javascript
<ProviderCard
  provider={providerObject}
  onViewMore={handleViewMore}
/>
```

### CategoryCard.jsx
```javascript
<CategoryCard
  category={{ name, icon }}
  onClick={handleClick}
/>
```

---

## 📱 Responsive Design Notes

- Mobile: 1 columna
- Tablet (md): 2-3 columnas
- Desktop (lg): 3-4 columnas
- Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)

Usar clases Tailwind como:
```javascript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
```

---

## 🎨 Temas y Personalización

### Colores Principales
```javascript
// En tailwind.config.js
primary: "#3B82F6"    // Azul
secondary: "#1F2937"  // Gris oscuro
accent: "#F59E0B"     // Ámbar
```

### Cambiar Colores
```javascript
// Actualizar tailwind.config.js:
colors: {
  primary: "#YOUR_COLOR",
  secondary: "#YOUR_COLOR",
  accent: "#YOUR_COLOR"
}

// Usar en componentes:
className="bg-primary hover:bg-primary-600"
```

---

## 🚀 Ejemplo de Extensión Completa

### Agregar Nueva Pestaña a Dashboard Cliente

```javascript
// 1. Agregar opción en switch de tabs
{activeTab === 'saved' && <SavedProvidersTab />}

// 2. Crear componente
const SavedProvidersTab = () => {
  const [saved, setSaved] = useState([])
  
  useEffect(() => {
    // Cargar desde API
  }, [])
  
  return (
    <div>
      <h3>Mi Proveedores Guardados</h3>
      <ProvidersList providers={saved} />
    </div>
  )
}

// 3. Exportar y usar
export { SavedProvidersTab }
```

---

**Documento actualizado:** 8 de febrero de 2026
**Última modificación:** Features Guide for Extensions
