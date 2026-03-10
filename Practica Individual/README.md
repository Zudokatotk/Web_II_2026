# Práctica Individual - Diseño Responsive con Flexbox

## 📋 Descripción del Proyecto

Este proyecto contiene dos páginas web completamente responsive utilizando **Flexbox** como sistema de layout principal. Ambas páginas se adaptan perfectamente a dispositivos móviles, tablets y escritorio.

---

## 📁 Estructura del Proyecto

```
Practica Individual/
├── Pagina_cn/                    # Página principal corporativa
│   ├── index.html
│   └── assets/
│       ├── css/
│       │   ├── reset.css         # Reset de estilos base
│       │   ├── head.css          # Header responsive
│       │   ├── pagina.css        # Sección hero/banner
│       │   ├── elemento.css      # Sección de elementos
│       │   ├── mensaje.css       # Tarjetas de mensajes
│       │   └── secciones.css     # Secciones adicionales (nuevo)
│       └── img/                  # Imágenes del proyecto
│
└── Pagina_productos/             # Página de productos
    ├── index.html
    ├── css/
    │   ├── reset.css
    │   ├── style.css             # Estilos base
    │   └── flexbox.css           # Sistema Flexbox (nuevo)
    └── img/                      # Imágenes y logos
```

---

## 🎨 Cambios Realizados

### 1️⃣ Pagina_cn - Página Corporativa

#### **head.css** - Header Responsive
**Antes:**
- Header con elementos en fila fija
- No adaptable a móviles

**Después:**
```css
/* Mobile First */
- Header en columna (logo arriba, menú abajo)
- Menú vertical centrado
- Logo de 60px

/* Desktop (768px+) */
- Header en fila (logo izquierda, menú derecha)
- Menú horizontal
- Logo de 75px
```

**Propiedades Flexbox usadas:**
- `display: flex`
- `flex-direction: column` → `row`
- `justify-content: space-between`
- `align-items: center`
- `gap` para espaciado

---

#### **pagina.css** - Sección Hero/Banner
**Mejoras:**
```css
/* Mobile */
- Padding adaptativo
- Botón 80% ancho
- Texto centrado

/* Tablet (768px+) */
- Botón 50% ancho
- Fuentes más grandes

/* Desktop (1024px+) */
- Imagen de fondo
- Min-height: 80vh
- Hover effects en botones
```

**Propiedades Flexbox usadas:**
- `display: flex`
- `flex-direction: column`
- `align-items: center`
- `justify-content: center`

---

#### **elemento.css** - Sección de Elementos
**Mejoras:**
```css
/* Mobile */
- Imágenes 90% ancho
- Layout vertical

/* Desktop (768px+) */
- Imágenes 70% ancho
- Mejor espaciado
```

**Propiedades Flexbox usadas:**
- `display: flex`
- `flex-direction: column`
- `align-items: center`

---

#### **mensaje.css** - Tarjetas de Mensajes
**Antes:**
- Tarjetas con wrap básico
- Sin estructura clara

**Después:**
```css
/* Mobile */
- 1 columna (tarjetas apiladas)
- Gap de 2rem

/* Tablet (768px+) */
- 2 columnas
- flex: 1 1 calc(50% - 2rem)

/* Desktop (1024px+) */
- 3 columnas en fila
- flex: 1 1 calc(33.333% - 2rem)
```

**Propiedades Flexbox usadas:**
- `display: flex`
- `flex-direction: column` → `row`
- `flex-wrap: wrap` → `nowrap`
- `flex: 1 1 calc()`
- `gap`
- `justify-content: space-evenly`

---

#### **secciones.css** - Archivo NUEVO ✨
Contiene estilos responsive para:

**Sección Nosotros:**
```css
/* Mobile: Columna (texto arriba, imagen abajo) */
/* Desktop: Fila (texto izquierda, imagen derecha) */
```

**Sección Productos:**
```css
/* Mobile: 1 columna */
/* Tablet: 2 columnas */
/* Desktop: 3 columnas */
```

**Sección Contacto:**
```css
/* Mobile: Columna */
/* Desktop: Fila */
```

**Footer:**
```css
/* Mobile: Columna centrada */
/* Desktop: Fila (logo izquierda, menú derecha) */
```

**Propiedades Flexbox usadas:**
- `display: flex`
- `flex-direction: column` → `row`
- `flex: 1` para distribución equitativa
- `flex-wrap: wrap`
- `gap` para espaciado
- `align-items: center`
- `justify-content: space-between`

---

### 2️⃣ Pagina_productos - Página de Productos

#### **flexbox.css** - Archivo NUEVO ✨
Sistema completo de layout responsive.

**Header:**
```css
/* Mobile */
- Columna (título arriba, nav abajo)
- Nav vertical

/* Desktop (768px+) */
- Fila (título izquierda, nav derecha)
- Nav horizontal
```

**Grid de Productos:**
```css
/* Mobile */
- 1 columna: flex: 1 1 100%

/* Tablet (768px+) */
- 2 columnas: flex: 1 1 calc(50% - 1%)

/* Desktop (1024px+) */
- 3 columnas: flex: 1 1 calc(33.333% - 1%)

/* Large Desktop (1200px+) */
- 4 columnas: flex: 1 1 calc(25% - 1%)
```

**Sección Video:**
```css
/* Mobile: Columna (video arriba, texto abajo) */
/* Desktop: Fila (video 50%, texto 50%) */
```

**Footer:**
```css
/* Mobile: Todo en columna */
/* Desktop: Grid de 4 columnas para navegación */
```

**Propiedades Flexbox usadas:**
- `display: flex`
- `flex-direction: column` → `row`
- `flex-wrap: wrap`
- `flex: 1 1 calc()`
- `gap` para espaciado
- `justify-content: space-between`
- `align-items: center`

---

## 📱 Breakpoints Utilizados

| Dispositivo | Ancho | Descripción |
|-------------|-------|-------------|
| Mobile | < 768px | Diseño base (Mobile First) |
| Tablet | 768px - 1023px | 2 columnas, layouts intermedios |
| Desktop | 1024px - 1199px | 3 columnas, layouts completos |
| Large Desktop | 1200px+ | 4 columnas, máximo espacio |

---

## 🎯 Conceptos de Flexbox Aplicados

### Propiedades del Contenedor (Flex Container)
```css
display: flex;                    /* Activa Flexbox */
flex-direction: row | column;     /* Dirección de los items */
flex-wrap: wrap | nowrap;         /* Permite salto de línea */
justify-content: center | space-between | space-evenly;  /* Alineación horizontal */
align-items: center | flex-start; /* Alineación vertical */
gap: 1rem;                        /* Espaciado entre items */
```

### Propiedades de los Items (Flex Items)
```css
flex: 1;                          /* Crecimiento equitativo */
flex: 1 1 50%;                    /* grow shrink basis */
flex: 1 1 calc(33.333% - 2rem);   /* Con cálculos */
```

---

## 🚀 Cómo Funciona el Responsive

### Mobile First Approach
1. **Base (Mobile):** Diseño en columna, 100% ancho
2. **Tablet:** Cambia a 2 columnas con `flex-wrap`
3. **Desktop:** Cambia a fila o 3-4 columnas

### Ejemplo Práctico:
```css
/* Mobile */
.container {
    display: flex;
    flex-direction: column;  /* Apilado vertical */
    gap: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        flex-direction: row;  /* Horizontal */
        flex-wrap: wrap;      /* Permite múltiples filas */
    }
    
    .item {
        flex: 1 1 calc(50% - 1rem);  /* 2 columnas */
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .item {
        flex: 1 1 calc(33.333% - 1rem);  /* 3 columnas */
    }
}
```

---

## 🎨 Assets Utilizados

### Imágenes (Pagina_cn)
- `logo.png` - Logo del sitio
- `port1.jpg` - Imagen de fondo hero
- `prod1.jpg, prod2.jpg, prod3.jpg` - Productos
- `perfil1.jpg, perfil2.jpg, perfil3.jpg` - Perfiles

### Imágenes (Pagina_productos)
- `background1.svg, background2.svg` - Fondos decorativos
- `logos/adidas.svg, nike.svg, polo.svg, zara.svg` - Logos de marcas

### Fuentes
- **Montserrat** - Títulos y navegación
- **Open Sans** - Texto general

---

## 🔧 Cómo Probar el Responsive

1. **Abrir en navegador:**
   - `Pagina_cn/index.html`
   - `Pagina_productos/index.html`

2. **Probar responsive:**
   - Presiona `F12` (DevTools)
   - Click en el ícono de dispositivo móvil
   - Prueba diferentes tamaños:
     - iPhone SE (375px)
     - iPad (768px)
     - Desktop (1024px+)

3. **O redimensiona la ventana del navegador**

---

## ✅ Checklist de Características

- ✅ Mobile First Design
- ✅ Flexbox en todos los layouts
- ✅ Responsive en 3+ breakpoints
- ✅ Navegación adaptativa
- ✅ Grids de productos responsive
- ✅ Imágenes adaptativas
- ✅ Hover effects
- ✅ Transiciones suaves
- ✅ Assets originales preservados
- ✅ Código limpio y comentado

---

## 📚 Recursos de Aprendizaje

- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN Flexbox](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [Flexbox Froggy](https://flexboxfroggy.com/) - Juego para practicar

---

## 👥 Créditos

Proyecto desarrollado para práctica de diseño responsive con Flexbox.

**Tecnologías:**
- HTML5
- CSS3 (Flexbox)
- Diseño Mobile First
- Media Queries

---

## 📝 Notas Importantes

1. **Todos los assets originales se mantuvieron** - No se eliminó ni modificó ninguna imagen
2. **Solo se agregaron archivos CSS nuevos** - `secciones.css` y `flexbox.css`
3. **Se mejoraron archivos CSS existentes** - Con mejor estructura responsive
4. **No se modificó la estructura HTML** - Solo se agregó un link CSS

---

¿Preguntas? Revisa los comentarios en los archivos CSS para entender cada sección. 🚀
