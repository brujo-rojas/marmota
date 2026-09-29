<template>
  <v-app>
    <v-container fluid class="pa-4">
      <v-row>
        <v-col cols="12">
          <h1 class="mb-4">🐹 Marmota - Demo de Selección</h1>
          <v-alert type="info" class="mb-4">
            Prueba la funcionalidad de selección:
            <ul>
              <li>Selecciona filas individuales con los checkboxes</li>
              <li>Usa el checkbox "Seleccionar todo" en la esquina superior izquierda</li>
              <li>Verifica la consola para ver los items seleccionados</li>
            </ul>
          </v-alert>
          
          <v-card>
            <v-card-title>Items Seleccionados: {{ selectedCount }}</v-card-title>
            <v-card-text>
              <div v-if="selectedItems.length > 0">
                <v-chip
                  v-for="(item, index) in selectedItems"
                  :key="index"
                  class="ma-1"
                  color="primary"
                >
                  {{ item.label || 'Item ' + index }}
                </v-chip>
              </div>
              <div v-else class="text--secondary">
                No hay items seleccionados
              </div>
            </v-card-text>
          </v-card>

          <marmota
            ref="marmota"
            style="height: 600px; margin-top: 20px"
            @changeSelection="onChangeSelection"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'App',
  data() {
    return {
      selectedItems: [],
      configTable: null,
    }
  },
  computed: {
    selectedCount() {
      return this.selectedItems.length
    },
  },
  mounted() {
    this.initTable()
  },
  methods: {
    initTable() {
      const config = {
        isSelectable: true,

        corner: {
          left: {
            label: 'Sectores',
            isAllSelectable: true, // Habilitado para probar seleccionar todo
          },
          right: {
            label: 'Datos',
            showLabels: true,
          },
        },

        nav: {
          textLabel: 'label',
          subTextLabel: 'subLabel',
          editable: false,
          width: 200,
        },

        header: [
          {
            label: '',
            vars: [
              {
                label: 'ID',
                varName: 'id',
                type: 'number',
                width: 100,
              },
              {
                label: 'Orden',
                varName: 'orden',
                type: 'number',
                width: 100,
              },
              {
                label: 'Nombre',
                varName: 'nombre',
                type: 'text',
                width: 200,
              },
              {
                label: 'Fecha',
                varName: 'fecha',
                type: 'date',
                width: 150,
              },
            ],
          },
        ],

        data: [],
      }

      // Generar datos de prueba con estructura jerárquica
      config.data = _.map(new Array(5), (parentIndex) => {
        const children = _.map(new Array(3), (childIndex) => {
          return {
            label: `Item ${parentIndex}-${childIndex}`,
            subLabel: `Sub ${childIndex}`,
            isSelectable: true,
            vars: {
              id: {
                value: parentIndex * 1000 + childIndex * 100,
              },
              orden: {
                value: childIndex,
              },
              nombre: {
                value: `Nombre ${parentIndex}-${childIndex}`,
              },
              fecha: {
                value: '2024-01-01',
              },
            },
          }
        })

        return {
          label: `Sector ${parentIndex}`,
          subLabel: `Descripción sector ${parentIndex}`,
          isSelectable: true,
          children: children,
          vars: {
            id: {
              value: parentIndex * 1000,
            },
            orden: {
              value: parentIndex,
            },
            nombre: {
              value: `Sector ${parentIndex}`,
            },
            fecha: {
              value: '2024-01-01',
            },
          },
        }
      })

      this.configTable = this.$refs.marmota.init(config)
      console.log('Tabla inicializada:', this.configTable)
    },

    onChangeSelection({ item, itemsSelected, isAllSelected }) {
      console.log('🔔 Evento changeSelection recibido:', {
        item,
        itemsSelected,
        isAllSelected,
        count: itemsSelected ? itemsSelected.length : 0,
      })

      // Aplanar el array si tiene anidaciones (por seguridad)
      this.selectedItems = itemsSelected || []
      
      if (isAllSelected !== undefined) {
        console.log('✅ Selección masiva:', isAllSelected ? 'Seleccionado todo' : 'Deseleccionado todo')
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

