# Guía: Configurar Imágenes de Fondo

Ahora puedes usar imágenes de fondo dinámicas en lugar de colores sólidos en los paneles de clientes y proveedores.

## 📋 Componentes Actualizados

### 1. **UserTypeSeparator** (Panel Público)
Ubicación: `src/components/Interfaces/UserTypeSeparator.jsx`

**Props disponibles:**
- `clientHeroImage`: URL de imagen para el panel de clientes
- `providerHeroImage`: URL de imagen para el panel de proveedores

**Ejemplo de uso en Home.jsx:**

```jsx
<UserTypeSeparator 
  clientHeroImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop"
  providerHeroImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=300&fit=crop"
/>
```

### 2. **ClientInterface** (Dashboard Clientes Autenticados)
Ubicación: `src/components/Interfaces/ClientInterface.jsx`

**Props disponibles:**
- `backgroundImage`: URL de imagen de fondo para el dashboard

**Ejemplo:**

```jsx
<ClientInterface 
  backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop"
/>
```

### 3. **ProviderInterface** (Dashboard Proveedores Autenticados)
Ubicación: `src/components/Interfaces/ProviderInterface.jsx`

**Props disponibles:**
- `backgroundImage`: URL de imagen de fondo para el dashboard

**Ejemplo:**

```jsx
<ProviderInterface 
  backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop"
/>
```

## 🎨 Características

- ✅ Si **no proporcionas** imagen, usa el color por defecto (gradiente)
- ✅ Si **proporcionas** imagen, la superpone con un overlay oscuro (70% opacidad) para legibilidad
- ✅ El contenido permanece sobre la imagen con buena visibilidad
- ✅ Usa `backgroundAttachment: 'fixed'` para efecto parallax suave
- ✅ Se adapta a cualquier resolución (responsive)

## 📁 Cómo Agregar Imágenes Locales

### Opción 1: Imágenes en assets (Recomendado)

1. **Coloca las imágenes en:** `src/assets/images/`

2. **Importa en el componente:**

```jsx
import clientHeroImg from '../../assets/images/client-hero.jpg'
import providerHeroImg from '../../assets/images/provider-hero.jpg'

// Luego usa:
<UserTypeSeparator 
  clientHeroImage={clientHeroImg}
  providerHeroImage={providerHeroImg}
/>
```

### Opción 2: URLs Externas

Simplemente pasa URLs públicas:

```jsx
<UserTypeSeparator 
  clientHeroImage="https://ejemplo.com/images/client.jpg"
  providerHeroImage="https://ejemplo.com/images/provider.jpg"
/>
```

## 🔧 Configuración en Home.jsx

Actualiza [src/pages/Home/Home.jsx](src/pages/Home/Home.jsx) para usar las props:

```jsx
// Ejemplo de cómo hacerlo en Home.jsx
const clientBgImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978'
const providerBgImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978'

return (
  <>
    <DynamicHeader />
    {isAuthenticated && userRole ? (
      <>
        {userRole === 'client' && <ClientInterface backgroundImage={clientBgImage} />}
        {userRole === 'professional' && <ProviderInterface backgroundImage={providerBgImage} />}
        {userRole === 'trade' && <ProviderInterface backgroundImage={providerBgImage} />}
        {userRole === 'business' && <ProviderInterface backgroundImage={providerBgImage} />}
      </>
    ) : (
      <UserTypeSeparator 
        clientHeroImage={clientBgImage}
        providerHeroImage={providerBgImage}
      />
    )}
  </>
)
```

## 🎯 Recomendaciones para Imágenes

### Tamaño recomendado:
- **Ancho:** 1920px o mayor
- **Alto:** 400-600px para hero sections
- **Formato:** JPG (mejor para fotos) o WebP (más comprimido)

### Fuentes gratuitas de imágenes:
1. **Unsplash** - https://unsplash.com
2. **Pexels** - https://www.pexels.com
3. **Pixabay** - https://pixabay.com
4. **Unsplash API** - Para carga dinámica

### Ejemplo con Unsplash API:

```jsx
const clientHeroImage = 'https://source.unsplash.com/1920x600/?client,service,professional'
const providerHeroImage = 'https://source.unsplash.com/1920x600/?business,work,professional'
```

## ⚙️ Cómo Funciona Internamente

### Sin imagen (por defecto):
```jsx
// Usa gradiente de colores
className="bg-gradient-to-r from-orange-500 to-orange-700"
```

### Con imagen:
```jsx
// Usa background-image con overlay
style={{
  backgroundImage: `linear-gradient(rgba(245, 127, 23, 0.7), rgba(217, 70, 7, 0.7)), url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed' // Efecto parallax
}}
```

## 🔄 Cambiar Dinámicamente

Puedes cambiar las imágenes desde un estado en App.jsx o crear un componente de configuración:

```jsx
// En App.jsx o similar
const [settings, setSettings] = useState({
  clientHeroImage: 'https://...',
  providerHeroImage: 'https://...'
})

// Luego pasa a los componentes:
<UserTypeSeparator 
  clientHeroImage={settings.clientHeroImage}
  providerHeroImage={settings.providerHeroImage}
/>
```

## 📝 Notas Importantes

- ✅ La opacidad del overlay (70%) asegura legibilidad del texto
- ✅ Si no especificas imagen, sigue usando los colores por defecto
- ✅ Las imágenes se cargan con `cover` para llenar todo el espacio
- ✅ Solo cambia el canvas, no afecta los componentes internos
- ⚠️ Para mejor rendimiento, optimiza las imágenes antes de usar

## 🚀 Próximas Mejoras

Considera agregar:
1. Selector de imágenes en admin panel
2. Caché de imágenes
3. Lazy loading
4. Filtros CSS (blur, brillo) dinámicos
5. Upload de imágenes personalizadas
