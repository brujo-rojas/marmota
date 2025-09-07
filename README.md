# 🐹 Marmota

[![Version](https://img.shields.io/npm/v/marmota.svg)](https://www.npmjs.com/package/marmota)
[![License](https://img.shields.io/npm/l/marmota.svg)](https://github.com/brujo-rojas/marmota/blob/main/LICENSE)

> **⚠️ En desarrollo activo**: Esta librería se encuentra en desarrollo activo. Pueden ocurrir cambios importantes en versiones futuras.

Una librería Vue.js para crear tablas avanzadas e interactivas con estilos compatibles con Vuetify 2. Marmota ofrece funcionalidades avanzadas como agrupamiento de datos, selección múltiple, ordenamiento, filtrado y modo oscuro.

## 🚀 Características

- 📊 **Tablas dinámicas**: Renderizado eficiente de grandes conjuntos de datos
- 🗂️ **Agrupamiento avanzado**: Agrupa los datos hasta en 3 niveles
- 🌙 **Tema oscuro**: Soporte nativo para modo oscuro
- 📱 **Responsive**: Diseño adaptativo para todos los dispositivos  
- ⚙️ **Altamente configurable**: Configuración mediante JSON
- ✅ **Selección múltiple**: Selecciona filas individuales o por grupos
- 🔍 **Ordenamiento**: Ordena columnas de forma ascendente/descendente
- 🎨 **Estilos Vuetify**: Integración perfecta con el ecosistema Vuetify 2
- 🧩 **Slots personalizables**: Personaliza headers, celdas y controles
- 📝 **Tipos de celda**: Text, Number, Date, Select, Checkbox, Button y más

## 📦 Instalación

```bash
# npm
npm install marmota

# yarn
yarn add marmota

# pnpm
pnpm add marmota
```

## 🔧 Uso básico

```vue
<template>
  <div>
    <Marmota 
      :config="tableConfig"
      :items="tableItems"
      @selection-changed="onSelectionChanged"
    />
  </div>
</template>

<script>
import { Marmota } from 'marmota'

export default {
  components: {
    Marmota
  },
  data() {
    return {
      tableConfig: {
        headers: [
          { text: 'Nombre', value: 'name', type: 'text' },
          { text: 'Edad', value: 'age', type: 'number' },
          { text: 'Email', value: 'email', type: 'text' }
        ],
        selectable: true,
        sortable: true,
        groupable: true
      },
      tableItems: [
        { name: 'Juan Pérez', age: 28, email: 'juan@example.com' },
        { name: 'María García', age: 32, email: 'maria@example.com' }
      ]
    }
  },
  methods: {
    onSelectionChanged(selection) {
      console.log('Elementos seleccionados:', selection)
    }
  }
}
</script>
```

## 📚 Documentación

Marmota incluye una documentación completa creada con **VuePress** que incluye ejemplos interactivos, guías de instalación y API detallada.

### 🖥️ Sitio de documentación

La documentación está disponible con:
- Ejemplos en vivo ejecutables
- Código fuente de cada ejemplo
- Guías paso a paso
- Configuraciones avanzadas
- Componentes demo interactivos

### 🚀 Comandos de documentación

```bash
# Ejecutar documentación en desarrollo con hot-reload
yarn docs:dev

# Compilar documentación para producción  
yarn docs:build

# Previsualizar documentación compilada
yarn docs:serve
```

### 📁 Estructura de documentación

```
docs/
├── .vuepress/
│   ├── config.js          # Configuración VuePress
│   ├── enhanceApp.js      # Configuración de la app
│   ├── components/        # Componentes demo
│   │   ├── Demo.vue       # Wrapper para demos
│   │   ├── SourceCode.vue # Mostrar código fuente
│   │   └── examples/      # Ejemplos específicos
│   └── styles/           # Estilos personalizados
├── components/           # Documentación de componentes
│   ├── table-basic.md   # Tabla básica
│   ├── table-example.md # Ejemplos avanzados
│   └── TODO.md          # Características pendientes
├── guide.md             # Guía de instalación
└── README.md            # Página principal
```

### ✨ Características de la documentación

- **🌐 Multiidioma**: Configurado en español con soporte para otros idiomas
- **🔍 Navegación intuitiva**: Sidebar organizado por categorías
- **📱 Responsive**: Optimizada para todos los dispositivos
- **⚡ Hot-reload**: Cambios en tiempo real durante el desarrollo
- **📝 Markdown enriquecido**: Con números de línea y syntax highlighting
- **🔗 Enlaces a GitHub**: Contribuciones directas desde la documentación
- **📊 Demos interactivos**: Ejemplos ejecutables con código fuente visible

## 🛠️ Desarrollo

```bash
# Instalar dependencias
yarn install

# Desarrollo con hot-reload
yarn serve

# Compilar librería
yarn build:lib

# Ejecutar tests
yarn test

# Lint y formateo
yarn lint
```

## 🗂️ Estructura del proyecto

```
src/
├── components/
│   ├── Marmota/           # Componente principal
│   ├── MarmotaCells/      # Tipos de celdas (Text, Number, Date, etc.)
│   ├── MarmotaHeader/     # Cabecera de tabla
│   ├── MarmotaRow/        # Filas de tabla
│   └── ...                # Otros componentes
├── scss/                  # Estilos SCSS
└── utils/                 # Utilidades
```

## 🎯 Roadmap

- [ ] Soporte para Vue 3
- [ ] Integración con Vuetify 3
- [ ] Paginación automática
- [ ] Exportación a CSV/Excel
- [ ] Filtros avanzados
- [ ] Editor inline mejorado
- [ ] Tests unitarios completos
- [ ] Documentación interactiva

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Patricio Rojas** - [patricio@irricrops.com](mailto:patricio@irricrops.com)

---

⭐ Si este proyecto te resulta útil, ¡no olvides darle una estrella!
