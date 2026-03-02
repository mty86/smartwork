# Ejemplo: Cómo usar Imágenes de Fondo en Home.jsx

## Opción 1: URLs Externas (Más Fácil)

Si quieres usar imágenes desde internet directamente:

```jsx
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { DynamicHeader } from '../../components/Headers/DynamicHeader'
import { ClientInterface } from '../../components/Interfaces/ClientInterface'
import { ProviderInterface } from '../../components/Interfaces/ProviderInterface'
import { UserTypeSeparator } from '../../components/Interfaces/UserTypeSeparator'

export const Home = () => {
  const { isAuthenticated, userRole } = useAuth()
  const [providers, setProviders] = useState([])
  const [businesses, setBusinesses] = useState([])

  // URLs de imágenes de fondo
  const CLIENT_HERO_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop'
  const PROVIDER_HERO_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop'
  const CLIENT_DASHBOARD_BG = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop'
  const PROVIDER_DASHBOARD_BG = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop'

  // ... resto del useEffect ...

  // Si el usuario está autenticado, mostrar interfaz personalizada
  if (isAuthenticated) {
    return (
      <div>
        <DynamicHeader />
        {userRole === 'client' && (
          <ClientInterface backgroundImage={CLIENT_DASHBOARD_BG} />
        )}
        {['professional', 'trade', 'business'].includes(userRole) && (
          <ProviderInterface backgroundImage={PROVIDER_DASHBOARD_BG} />
        )}
        {/* ... resto del código admin ... */}
      </div>
    )
  }

  // Panel público con imágenes
  return (
    <UserTypeSeparator 
      providers={providers} 
      businesses={businesses}
      clientHeroImage={CLIENT_HERO_IMAGE}
      providerHeroImage={PROVIDER_HERO_IMAGE}
    />
  )
}

export default Home
```

---

## Opción 2: Imágenes Locales desde Assets

Si tienes imágenes en `src/assets/images/`:

```jsx
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { DynamicHeader } from '../../components/Headers/DynamicHeader'
import { ClientInterface } from '../../components/Interfaces/ClientInterface'
import { ProviderInterface } from '../../components/Interfaces/ProviderInterface'
import { UserTypeSeparator } from '../../components/Interfaces/UserTypeSeparator'

// Importar imágenes
import clientHeroImg from '../../assets/images/client-hero.jpg'
import providerHeroImg from '../../assets/images/provider-hero.jpg'
import clientDashboardImg from '../../assets/images/client-dashboard.jpg'
import providerDashboardImg from '../../assets/images/provider-dashboard.jpg'

export const Home = () => {
  const { isAuthenticated, userRole } = useAuth()
  const [providers, setProviders] = useState([])
  const [businesses, setBusinesses] = useState([])

  // ... useEffect ...

  if (isAuthenticated) {
    return (
      <div>
        <DynamicHeader />
        {userRole === 'client' && (
          <ClientInterface backgroundImage={clientDashboardImg} />
        )}
        {['professional', 'trade', 'business'].includes(userRole) && (
          <ProviderInterface backgroundImage={providerDashboardImg} />
        )}
        {/* ... resto del código ... */}
      </div>
    )
  }

  return (
    <UserTypeSeparator 
      providers={providers} 
      businesses={businesses}
      clientHeroImage={clientHeroImg}
      providerHeroImage={providerHeroImg}
    />
  )
}

export default Home
```

---

## Opción 3: Híbrida (URLs Dinámicas desde Context o Config)

Para mayor flexibilidad, guarda las URLs en un archivo de configuración o context:

**Crea `src/config/images.js`:**

```javascript
// src/config/images.js
export const backgroundImages = {
  clientHero: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop',
  providerHero: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop',
  clientDashboard: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop',
  providerDashboard: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop',
}
```

**Luego en Home.jsx:**

```jsx
import { backgroundImages } from '../../config/images'

export const Home = () => {
  // ... resto del código ...
  
  if (isAuthenticated) {
    return (
      <div>
        <DynamicHeader />
        {userRole === 'client' && (
          <ClientInterface backgroundImage={backgroundImages.clientDashboard} />
        )}
        {['professional', 'trade', 'business'].includes(userRole) && (
          <ProviderInterface backgroundImage={backgroundImages.providerDashboard} />
        )}
        {/* ... */}
      </div>
    )
  }

  return (
    <UserTypeSeparator 
      providers={providers} 
      businesses={businesses}
      clientHeroImage={backgroundImages.clientHero}
      providerHeroImage={backgroundImages.providerHero}
    />
  )
}
```

---

## Opción 4: Sin Imágenes (Usar Valores por Defecto)

Si no pasas las props, los componentes usarán gradientes por defecto:

```jsx
// Así está ahora - sin cambios necesarios
{userRole === 'client' && <ClientInterface />}
{['professional', 'trade', 'business'].includes(userRole) && <ProviderInterface />}
<UserTypeSeparator providers={providers} businesses={businesses} />
```

---

## 🎯 Recomendación

Usa **Opción 3 (Híbrida)** porque:
- ✅ Centraliza todas las URLs en un único lugar
- ✅ Fácil de cambiar sin tocar componentes
- ✅ Puedes agregar más imágenes sin editar Home.jsx
- ✅ Ideal para admin panel (cambiar imágenes dinámicamente)

---

## 📝 Pasos para Implementar

1. **Elige tu opción** (recomendamos Opción 3)
2. **Agrega las URLs o importa imágenes**
3. **Pasa las props a los componentes**
4. **Prueba en navegador**

¡Listo! Las imágenes aparecerán como fondo con overlay oscuro para legibilidad.
