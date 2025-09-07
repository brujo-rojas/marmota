# Tabla Básica

Este ejemplo muestra la configuración mínima necesaria para crear una tabla con Marmota, incluyendo agrupamiento jerárquico de datos y diferentes tipos de celda.

## Características

- Estructura básica de configuración
- Agrupamiento de datos en 3 niveles (item → child → grandchild)
- Tipos de celda: `number` y `text`
- Navegación lateral básica

## Demo Interactiva

<Demo componentName="examples-tableBasic" />

## Características del Ejemplo

- **Sin selección**: `isSelectable: false`
- **3 niveles jerárquicos**: Items principales, hijos y nietos
- **Navegación fija**: Ancho de 150px con etiquetas textuales
- **Datos generados**: Valores aleatorios para demostración
- **Esquina personalizada**: "Items" como etiqueta principal

## Estructura de Datos

```javascript
// Cada item tiene esta estructura
{
  label: 'item tem item 0',      // Texto mostrado en navegación
  children: [                    // Items hijos (nivel 2)
    {
      label: 'child item 0',
      children: [                // Items nietos (nivel 3)  
        {
          label: 'GC item 0',
          vars: {                // Valores de las celdas
            var1: { value: 42 },
            var2: { value: 1002 },
            var3: { value: '2020-01-01' }
          }
        }
      ],
      vars: { /* valores propios */ }
    }
  ],
  vars: { /* valores del item principal */ }
}
```

## Configuración de Columnas

```javascript
header: [
  {
    label: '',                    // Grupo de columnas sin título
    vars: [
      {
        label: 'variable 1',      // Nombre de columna
        varName: 'var1',          // Clave en data.vars
        type: 'number'            // Tipo de celda
      },
      {
        label: 'variable 2',
        varName: 'var2', 
        type: 'number'
      },
      {
        label: 'variable 3',
        varName: 'var3',
        type: 'text'
      }
    ]
  }
]
```

## Próximos Pasos

Una vez que entiendas este ejemplo básico:

1. **Experimenta** modificando los tipos de celda
2. **Agrega más columnas** en el array `vars`
3. **Cambia los valores** en la estructura de datos  
4. **Habilita la selección** con `isSelectable: true`
5. **Ve el [Ejemplo Completo](/components/table-example)** para características avanzadas

<SourceCode>
<<< @/docs/.vuepress/components/examples/tableBasic.vue
</SourceCode>

