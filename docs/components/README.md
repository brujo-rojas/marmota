# Ejemplos y Componentes

Esta sección contiene ejemplos prácticos de implementación de Marmota, desde casos básicos hasta configuraciones avanzadas con todas las características disponibles.

## Guía de Ejemplos

### [Tabla Básica](/components/table-basic)
Configuración mínima para empezar a usar Marmota:
- Estructura básica de datos
- Configuración simple de columnas
- Datos agrupados en 3 niveles

### [Ejemplo Completo](/components/table-example)  
Demostración de todas las capacidades de Marmota:
- Selección múltiple
- Navegación editable
- Botones de acción personalizados
- Tipos de celda avanzados
- Esquinas configurables

## Tipos de Configuración

Todos los ejemplos siguen la estructura de configuración estándar de Marmota:

```javascript
const config = {
  isSelectable: boolean,     // Habilita selección múltiple
  corner: {                  // Configuración de esquinas
    left: { ... },
    right: { ... }
  },
  nav: { ... },             // Navegación lateral izquierda
  navRight: { ... },        // Navegación lateral derecha  
  header: [ ... ],          // Definición de columnas
  data: [ ... ]             // Datos jerárquicos
}
```

## Personalización

Cada ejemplo muestra diferentes aspectos de personalización:

- **Temas**: Modo claro y oscuro
- **Estilos**: Integración con Vuetify 2
- **Interactividad**: Eventos y callbacks
- **Responsividad**: Adaptación a diferentes tamaños

## Consejos para Usar los Ejemplos

1. **Copia el código completo** de los ejemplos como punto de partida
2. **Modifica gradualmente** las configuraciones según tus necesidades  
3. **Experimenta con los tipos** de celda disponibles
4. **Usa la consola del navegador** para debuggear configuraciones
5. **Combina características** de diferentes ejemplos
