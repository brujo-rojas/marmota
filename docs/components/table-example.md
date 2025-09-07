# Ejemplo Completo

Este ejemplo avanzado demuestra todas las capacidades de Marmota, incluyendo selección múltiple, navegación editable, botones de acción personalizados y configuraciones complejas.

## Características Demostradas

- **Selección múltiple** con esquinas configurables
- **Navegación editable** con modo de edición inline
- **Botones de acción** (editar, eliminar, guardar, cancelar)
- **Navegación derecha** con variables adicionales
- **Iconos personalizados** usando Material Design Icons
- **Responsive design** adaptativo

## Demo Interactiva

<Demo componentName="examples-table-example-doc" />

## Funcionalidades Interactivas

### Modo Edición
- **Activar**: Click en el botón de lápiz (✏️)
- **Guardar**: Click en el botón de guardar (💾)
- **Cancelar**: Click en el botón de cancelar (✖️)
- **Estados**: Los botones cambian según el modo actual

### Eliminación de Items
- **Confirmar eliminación** con diálogo nativo
- **Eliminación jerárquica** que respeta la estructura de datos
- **Actualización automática** de la vista

### Selección Múltiple
- **Selección individual** por fila
- **Selección masiva** desde las esquinas (si está habilitada)
- **Estado visual** claro de elementos seleccionados

## Configuraciones Avanzadas

### Esquinas Personalizadas

```javascript
corner: {
  left: {
    label: 'corner text',        // Texto de la esquina izquierda
    isAllSelectable: false       // Deshabilitada selección masiva
  },
  right: {
    label: 'corner Right text', // Texto de la esquina derecha  
    showLabels: true            // Mostrar etiquetas de columna
  }
}
```

### Navegación con Subetiquetas

```javascript
nav: {
  textLabel: 'label',           // Campo principal
  subTextLabel: 'subLabel',     // Campo secundario
  editable: true,               // Habilita edición
  width: 200,                   // Ancho fijo en píxeles
  onLabelClick({ item }) {      // Callback al hacer click
    // Lógica personalizada
  }
}
```

### Botones de Acción Dinámicos

```javascript
{
  label: '',
  width: 50,                    // Ancho de la columna
  type: 'icon-button',          // Tipo de celda
  icon: mdiPencil,              // Icono MDI
  onClick({ item }) {           // Callback del click
    item.edit = true            // Cambiar estado
  },
  isShow(item) {                // Mostrar condicionalmente
    return !item.edit           // Solo si no está en edición
  }
}
```

## Tipos de Celda Utilizados

| Tipo | Descripción | Uso en el Ejemplo |
|------|-------------|-------------------|
| `text` | Campo de texto editable | Variables de navegación derecha |
| `icon-button` | Botón con icono | Acciones de editar/eliminar/guardar |
| `conditional` | Mostrar/ocultar según estado | Todos los botones de acción |

## Iconos Utilizados

Importados desde `@mdi/js`:
- `mdiPencil` - Editar
- `mdiDelete` - Eliminar  
- `mdiContentSave` - Guardar
- `mdiClose` - Cancelar

## Consejos de Implementación

1. **Estado de edición**: Usa propiedades como `item.edit` para controlar modos
2. **Backup de datos**: Guarda `originalVars` antes de editar para poder cancelar
3. **Confirmaciones**: Usa `confirm()` para acciones destructivas
4. **Visibilidad condicional**: Aprovecha `isShow()` para UX dinámica
5. **Callbacks contextuales**: Los eventos reciben `{ item, parent, config }`

## Consideraciones Importantes

- **Rendimiento**: Con muchos botones, considera virtualización
- **Accesibilidad**: Los iconos deben tener tooltips descriptivos
- **Estados consistentes**: Maneja todos los casos de edición/cancelación
- **Validación**: Implementa validación antes de guardar cambios

<SourceCode>
<<< @/docs/.vuepress/components/examples/table-example-doc.vue
</SourceCode>
