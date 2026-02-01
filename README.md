# ☕ LojaNia - Plataforma de Artesanías

> Conectando tradición y modernidad desde el corazón de Loja, Ecuador.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)

## 📖 Descripción

**LojaNia** es una plataforma de e-commerce que conecta a los artesanos de Loja, Ecuador con compradores que valoran los productos hechos a mano. Cada producto cuenta con la historia del artesano que lo creó, promoviendo el comercio justo y la preservación de técnicas ancestrales.

## ✨ Características

### Para Compradores
- 🛒 Catálogo de productos artesanales con imágenes de alta calidad
- 🔍 Búsqueda y filtros por categoría, precio y nombre
- 💝 Lista de deseos (Wishlist) para guardar favoritos
- 🛍️ Carrito de compras persistente (localStorage)
- 👤 Perfiles detallados de artesanos con su historia
- 📱 Diseño responsive optimizado para móviles
- 🎨 Animaciones y microinteracciones premium

### Para Artesanos (Panel de Control)
- 📊 Dashboard con métricas de ventas
- 📦 Gestión de inventario
- 📋 Administración de pedidos

### Características Técnicas
- ⚡ Server & Client Components de Next.js App Router
- 🔄 Context API para estado global (Carrito, Wishlist, Vista, Toasts)
- 💾 Persistencia en localStorage
- 🌐 Optimización de imágenes con next/image
- 🎭 Sistema de notificaciones Toast
- 📍 SEO optimizado con metadata dinámica

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/PlataformaWebArtesanos.git

# Navegar al directorio
cd PlataformaWebArtesanos

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
PlataformaWebArtesanos/
├── app/                      # App Router de Next.js
│   ├── artesanos/           # Páginas de artesanos
│   │   ├── [id]/            # Perfil dinámico de artesano
│   │   └── page.tsx         # Lista de artesanos
│   ├── historia/            # Página "Nuestra Historia"
│   ├── globals.css          # Estilos globales + animaciones
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página de inicio
│   └── providers.tsx        # Context Providers
├── components/
│   ├── artisan/             # Componentes del panel artesano
│   │   ├── Dashboard.tsx
│   │   ├── Inventory.tsx
│   │   └── Orders.tsx
│   ├── buyer/               # Componentes de la tienda
│   │   ├── CartDrawer.tsx
│   │   ├── CheckoutModal.tsx
│   │   ├── Hero.tsx
│   │   ├── Marketplace.tsx
│   │   ├── Navbar.tsx
│   │   └── ProductModal.tsx
│   └── FloatingToggle.tsx   # Toggle de vista Artesano/Comprador
├── lib/                      # Utilidades y contextos
│   ├── CartContext.tsx      # Carrito + Wishlist
│   ├── data.ts              # Datos de productos y artesanos
│   ├── ToastContext.tsx     # Sistema de notificaciones
│   └── ViewContext.tsx      # Toggle de modo de vista
└── public/                   # Assets estáticos
    ├── hero-banner.png
    ├── artisan-*.png
    └── product-*.png
```

## 🎨 Paleta de Colores

| Color | Nombre | HEX | Uso |
|-------|--------|-----|-----|
| 🟠 | Terracotta | `#E07A5F` | Acento principal, CTAs |
| 🟤 | Dark | `#3D405B` | Textos, headers |
| 🟢 | Green | `#81B29A` | Éxito, sostenibilidad |
| 🔵 | Blue | `#2563EB` | Links, información |
| 🟡 | Beige | `#F4F1EA` | Fondo principal |
| 🌟 | Gold | `#F2CC8F` | Badges, destacados |

## 📱 Vistas

### Vista de Comprador (Default)
- Hero con banner atractivo
- Marketplace con filtros y búsqueda
- Detalle de productos con historia
- Carrito y checkout

### Vista de Artesano
- Dashboard con métricas
- Gestión de inventario
- Lista de pedidos

💡 **Tip:** Usa el botón flotante en la esquina inferior izquierda para alternar entre vistas.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

Desarrollado con ❤️ para los artesanos de Loja, Ecuador.

---

<p align="center">
  <strong>☕ LojaNia</strong> - Tradición, Autenticidad, Comercio Justo
</p>
