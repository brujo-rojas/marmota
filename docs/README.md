---
home: true
heroImage: /hero-logo.png
heroText: 🐹 Marmota
tagline: Librería Vue.js para tablas avanzadas con estilos Vuetify 2
actionText: Comenzar →
actionLink: /guide
features:
  - title: 🗂️ Agrupamiento Avanzado
    details: Organiza tus datos hasta en 3 niveles jerárquicos con navegación intuitiva y expandible
  - title: 🌙 Tema Oscuro
    details: Soporte nativo para modo oscuro que se integra perfectamente con Vuetify 2
  - title: ⚙️ Altamente Configurable
    details: Configuración completa mediante JSON con tipos de celda personalizables
  - title: 📊 Renderizado Eficiente
    details: Optimizada para manejar grandes conjuntos de datos con scroll virtual
  - title: 🎨 Estilos Vuetify
    details: Integración perfecta con el ecosistema de componentes Vuetify 2
  - title: 📱 Completamente Responsive
    details: Diseño adaptativo que funciona en dispositivos móviles y desktop

footer: Desarrollado con ❤️ por Patricio Rojas | MIT License © 2022-2025
---

## 🚀 Instalación rápida

```bash
# npm
npm install marmota

# yarn
yarn add marmota
```

## ⚡ Ejemplo básico

```vue
<template>
  <Marmota :config="config" style="height: 400px" />
</template>

<script>
export default {
  data() {
    return {
      config: {
        isSelectable: true,
        header: [/* configuración de columnas */],
        data: [/* tus datos */]
      }
    }
  }
}
</script>
```

## 📖 ¿Por qué Marmota?

- **🎯 Especializada**: Diseñada específicamente para tablas complejas con agrupamiento
- **🔧 Flexible**: Soporta múltiples tipos de celda y configuraciones personalizadas  
- **⚡ Performante**: Optimizada para datasets grandes con lazy loading
- **🎨 Hermosa**: Estilos consistentes con Material Design via Vuetify
- **🛠️ En desarrollo**: Constantemente mejorada con nuevas características
