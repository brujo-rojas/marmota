# Guía de Instalación

## Prerequisitos

Antes de instalar Marmota, asegúrate de tener:

- **Vue.js 2.x** (2.6+ recomendado)
- **Vuetify 2.x** (2.0+ recomendado)
- **Node.js** 16+ y npm/yarn

## Instalación

### Via NPM

```bash
npm install marmota
```

### Via Yarn

```bash
yarn add marmota
```

### Via CDN

```html
<script src="https://unpkg.com/marmota@latest/dist/marmota.umd.min.js"></script>
```

## Configuración

### 1. Registro Global (Recomendado)

```javascript
// main.js
import Vue from 'vue'
import Marmota from 'marmota'

Vue.use(Marmota)
```

### 2. Registro por Componente

```vue
<script>
import { Marmota } from 'marmota'

export default {
  components: {
    Marmota
  }
  // ...
}
</script>
```

### 3. Importar Estilos

```javascript
// main.js - Si no se importan automáticamente
import 'marmota/dist/marmota.css'
```

## Configuración con Vuetify

Marmota está diseñada para trabajar con Vuetify 2. Asegúrate de que Vuetify esté configurado:

```javascript
// main.js
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import Marmota from 'marmota'

Vue.use(Vuetify)
Vue.use(Marmota)

export default new Vuetify({
  theme: {
    dark: false, // Marmota respetará este setting
  }
})
```

## Primer Uso

### Ejemplo Mínimo

```vue
<template>
  <v-app>
    <Marmota 
      ref="marmota"
      style="height: 400px"
    />
  </v-app>
</template>

<script>
export default {
  mounted() {
    const config = {
      isSelectable: false,
      header: [
        {
          label: 'Datos Básicos',
          vars: [
            {
              label: 'Nombre',
              varName: 'nombre',
              type: 'text'
            },
            {
              label: 'Edad',
              varName: 'edad', 
              type: 'number'
            }
          ]
        }
      ],
      data: [
        {
          label: 'Usuario 1',
          vars: {
            nombre: { value: 'Juan Pérez' },
            edad: { value: 28 }
          }
        },
        {
          label: 'Usuario 2', 
          vars: {
            nombre: { value: 'María García' },
            edad: { value: 32 }
          }
        }
      ]
    }
    
    this.$refs.marmota.init(config)
  }
}
</script>
```

## Problemas Comunes

### "Marmota is not defined"
Asegúrate de importar y registrar el componente correctamente.

### Estilos no se aplican
Verifica que Vuetify esté instalado y configurado correctamente.

### Datos no se muestran
Revisa que la estructura de `config.data` coincida con `config.header`.

## Siguientes Pasos

¡Perfecto! Ya tienes Marmota funcionando. Ahora puedes:

- Ver [Ejemplos Básicos](/components/table-basic) para casos de uso simples
- Explorar [Ejemplos Avanzados](/components/table-example) con todas las características  
- Revisar la configuración completa de la API
