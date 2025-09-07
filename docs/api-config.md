# Configuración de la API

Esta guía documenta todas las opciones de configuración disponibles en Marmota, con ejemplos prácticos y valores por defecto.

## Estructura General

```javascript
const config = {
  // Configuración principal
  isSelectable: false,
  isDark: false,
  loading: false,
  
  // Esquinas de la tabla
  corner: {
    left: { /* configuración esquina izquierda */ },
    right: { /* configuración esquina derecha */ }
  },
  
  // Navegación lateral
  nav: { /* configuración navegación izquierda */ },
  navRight: { /* configuración navegación derecha */ },
  
  // Definición de columnas
  header: [ /* array de grupos de columnas */ ],
  
  // Datos jerárquicos
  data: [ /* array de items con estructura jerárquica */ ]
}
```

## Opciones Principales

### isSelectable
**Tipo:** `Boolean`  
**Default:** `false`  
**Descripción:** Habilita la selección múltiple de filas.

```javascript
{
  isSelectable: true // Permite seleccionar filas
}
```

### isDark
**Tipo:** `Boolean`  
**Default:** `false`  
**Descripción:** Activa el tema oscuro (respeta configuración de Vuetify).

```javascript
{
  isDark: true // Modo oscuro activado
}
```

### loading
**Tipo:** `Boolean`  
**Default:** `false`  
**Descripción:** Muestra un overlay de carga sobre la tabla.

```javascript
{
  loading: true // Muestra spinner de carga
}
```

## Configuración de Esquinas

### corner.left
Configuración de la esquina superior izquierda.

```javascript
corner: {
  left: {
    label: 'Items',              // Texto mostrado
    isAllSelectable: true,       // Permite seleccionar todo
    width: 150                   // Ancho en píxeles
  }
}
```

**Opciones disponibles:**
- `label` (String): Texto de la esquina
- `isAllSelectable` (Boolean): Checkbox para seleccionar todo
- `width` (Number): Ancho personalizado

### corner.right
Configuración de la esquina superior derecha.

```javascript
corner: {
  right: {
    label: 'Acciones',           // Texto mostrado
    showLabels: true,            // Mostrar etiquetas de columna
    width: 200                   // Ancho total
  }
}
```

**Opciones disponibles:**
- `label` (String): Texto de la esquina
- `showLabels` (Boolean): Mostrar nombres de columnas
- `width` (Number): Ancho personalizado

## Configuración de Navegación

### nav (Navegación Izquierda)
Controla la navegación lateral izquierda donde se muestran los labels jerárquicos.

```javascript
nav: {
  textLabel: 'label',           // Campo para texto principal
  subTextLabel: 'subLabel',     // Campo para subtexto
  editable: false,              // Habilita edición inline
  width: 200,                   // Ancho fijo
  onLabelClick: function({ item, level }) {
    // Callback al hacer click
    console.log('Clicked:', item.label, 'Level:', level)
  }
}
```

**Opciones disponibles:**
- `textLabel` (String): Campo del objeto data para texto principal
- `subTextLabel` (String): Campo para texto secundario
- `editable` (Boolean): Permite edición inline
- `width` (Number): Ancho en píxeles
- `onLabelClick` (Function): Callback para clicks en labels

### navRight (Navegación Derecha)
Configuración para columnas adicionales del lado derecho.

```javascript
navRight: {
  label: 'Información Adicional',
  vars: [
    {
      label: 'Estado',
      varName: 'status',
      type: 'select',
      options: ['Activo', 'Inactivo'],
      width: 120
    },
    {
      label: '',
      type: 'icon-button',
      icon: 'mdi-delete',
      width: 50,
      onClick: function({ item }) {
        // Lógica de eliminación
      }
    }
  ]
}
```

## Configuración de Headers

### Estructura de Headers
Los headers definen las columnas de la tabla y se organizan en grupos.

```javascript
header: [
  {
    label: 'Datos Personales',   // Título del grupo
    width: 300,                  // Ancho total del grupo
    vars: [
      {
        label: 'Nombre',         // Título de la columna
        varName: 'nombre',       // Clave en data.vars
        type: 'text',            // Tipo de celda
        width: 150,              // Ancho de la columna
        sortable: true,          // Habilitado para ordenamiento
        editable: true,          // Permite edición
        required: true,          // Campo obligatorio
        placeholder: 'Ingrese nombre...'
      },
      {
        label: 'Edad',
        varName: 'edad',
        type: 'number',
        width: 80,
        min: 0,
        max: 120,
        step: 1
      }
    ]
  }
]
```

## Tipos de Celda Disponibles

### text
Campo de texto simple.
```javascript
{
  type: 'text',
  placeholder: 'Ingrese texto...',
  maxlength: 100
}
```

### number
Campo numérico con controles.
```javascript
{
  type: 'number', 
  min: 0,
  max: 1000,
  step: 0.1,
  precision: 2
}
```

### date
Selector de fecha.
```javascript
{
  type: 'date',
  format: 'YYYY-MM-DD',
  min: '2020-01-01',
  max: '2030-12-31'
}
```

### time
Selector de hora.
```javascript
{
  type: 'time',
  format: '24hr',  // o '12hr'
  step: 15         // minutos de incremento
}
```

### select
Lista desplegable.
```javascript
{
  type: 'select',
  options: ['Opción 1', 'Opción 2', 'Opción 3'],
  multiple: false,
  clearable: true
}
```

### checkbox
Casilla de verificación.
```javascript
{
  type: 'checkbox',
  trueValue: 'Sí',
  falseValue: 'No'
}
```

### textarea
Campo de texto multilínea.
```javascript
{
  type: 'textarea',
  rows: 3,
  maxlength: 500,
  placeholder: 'Ingrese descripción...'
}
```

### button
Botón de acción.
```javascript
{
  type: 'button',
  text: 'Acción',
  color: 'primary',
  icon: 'mdi-action',
  onClick: function({ item, value }) {
    // Lógica del botón
  }
}
```

### icon-button
Botón solo con icono.
```javascript
{
  type: 'icon-button',
  icon: 'mdi-delete',
  color: 'error',
  size: 'small',
  onClick: function({ item }) {
    // Lógica del botón
  },
  isShow: function(item) {
    return item.deletable === true
  }
}
```

### autocomplete
Campo de autocompletado.
```javascript
{
  type: 'autocomplete',
  items: ['Item 1', 'Item 2', 'Item 3'],
  searchable: true,
  multiple: false
}
```

## Estructura de Datos

### Formato de Items
Cada item en el array `data` debe seguir esta estructura:

```javascript
{
  label: 'Nombre del Item',      // Texto mostrado en navegación
  subLabel: 'Subtexto opcional', // Texto secundario (opcional)
  
  // Variables/valores de las celdas
  vars: {
    nombreVar: {
      value: 'Valor actual',     // Valor de la celda
      originalValue: 'Backup',   // Valor original (para cancelar ediciones)
      editable: true,            // Override de edición para esta celda
      visible: true              // Mostrar/ocultar celda
    }
  },
  
  // Items hijos (agrupamiento jerárquico)
  children: [
    {
      label: 'Item hijo',
      vars: { /* ... */ },
      children: [ /* nietos */ ]
    }
  ],
  
  // Estados del item
  selected: false,               // Seleccionado
  expanded: true,                // Expandido (mostrar hijos)
  edit: false,                   // En modo edición
  
  // Metadatos personalizados
  metadata: {
    id: 'unique-id',
    created: '2025-09-07',
    custom: 'valor personalizado'
  }
}
```

## Eventos y Callbacks

### Eventos del Componente

```vue
<template>
  <Marmota
    @selection-changed="onSelectionChanged"
    @item-clicked="onItemClicked"  
    @cell-edited="onCellEdited"
    @item-expanded="onItemExpanded"
  />
</template>

<script>
export default {
  methods: {
    onSelectionChanged(selectedItems) {
      console.log('Items seleccionados:', selectedItems)
    },
    
    onItemClicked({ item, level }) {
      console.log('Item clickeado:', item.label, 'Nivel:', level)
    },
    
    onCellEdited({ item, varName, oldValue, newValue }) {
      console.log('Celda editada:', varName, oldValue, '->', newValue)
    },
    
    onItemExpanded({ item, expanded }) {
      console.log('Item expandido:', item.label, expanded)
    }
  }
}
</script>
```

### Callbacks en Configuración

```javascript
const config = {
  nav: {
    onLabelClick: ({ item, level }) => {
      // Click en label de navegación
    }
  },
  
  header: [
    {
      vars: [
        {
          type: 'button',
          onClick: ({ item, varName, config }) => {
            // Click en botón de celda
          }
        }
      ]
    }
  ]
}
```

## Ejemplos Prácticos

### Tabla Simple de Usuarios
```javascript
const userTableConfig = {
  isSelectable: true,
  
  corner: {
    left: { label: 'Usuarios' }
  },
  
  header: [
    {
      label: 'Información Personal',
      vars: [
        { label: 'Nombre', varName: 'name', type: 'text' },
        { label: 'Email', varName: 'email', type: 'text' },
        { label: 'Edad', varName: 'age', type: 'number' }
      ]
    }
  ],
  
  data: [
    {
      label: 'Juan Pérez',
      vars: {
        name: { value: 'Juan Pérez' },
        email: { value: 'juan@email.com' },
        age: { value: 28 }
      }
    }
  ]
}
```

### Tabla con Acciones
```javascript
const actionTableConfig = {
  navRight: {
    label: 'Acciones',
    vars: [
      {
        type: 'icon-button',
        icon: 'mdi-pencil',
        onClick: ({ item }) => {
          item.edit = true
        }
      },
      {
        type: 'icon-button', 
        icon: 'mdi-delete',
        color: 'error',
        onClick: ({ item, parent, config }) => {
          // Lógica de eliminación
        }
      }
    ]
  }
}
```

---

> Esta documentación está en constante evolución. Si encuentras alguna opción no documentada o tienes dudas, por favor [abre un issue](https://github.com/brujo-rojas/marmota/issues).
