<template>
  <div class="v-application">
    <marmota style="height: 450px" ref="marmota" >
    </marmota>
  </div>
</template>
<script>
import { mdiClose, mdiContentSave, mdiDelete, mdiPencil } from '@mdi/js'
export default {
  data() {
    return {
      configTable: null,
    }
  },
  mounted() {
    this.initTable()
  },
  methods: {
    initTable() {
      let config = {
        isSelectable: true,

        corner: {
          left: {
            label: 'corner text',
            isAllSelectable: false,
          },
          right: {
            label: 'corner Right text',
            showLabels: true,
          },
        },

        nav: {
          textLabel: 'label',
          subTextLabel: 'subLabel',
          editable: true,
          width: 200,
          onLabelClick({ item }) {},
        },

        navRight: {
          label:'Nav Right',
          vars: [
            {
              label: 'Var 1',
              varName: 'var1',
              type: 'text',
            },
            {
              label: '',
              width: 50,
              type: 'icon-button',
              icon: mdiPencil,
              onClick({ item }) {
                item.edit = true
                item.originalVars = _.cloneDeep(item.vars)
              },
              isShow(item) {
                if (item == undefined) return true
                return !item.edit
              },
            },
            {
              label: '',
              width: 50,
              type: 'icon-button',
              icon: mdiDelete,
              onClick({ item, parent, config }) {
                if (confirm('delete?')) {
                  let list = parent ? parent.children : config.data
                  let index = _.findIndex(list, (i) => i == item)
                  vm.$delete(list, index)
                }
              },
              isShow(item) {
                if (item == undefined) return true
                return !item.edit
              },
            },
            {
              label: '',
              width: 50,
              type: 'icon-button',
              icon: mdiContentSave,
              onClick({ item }) {
                item.edit = false
                item.originalVars = item.vars
                delete item.originalVars
              },
              isShow(item) {
                if (item == undefined) return false
                return item.edit
              },
            },
            {
              label: '',
              width: 50,
              type: 'icon-button',
              icon: mdiClose,
              onClick({ item }) {
                item.edit = false
                item.vars = item.originalVars
                delete item.originalVars
              },
              isShow(item) {
                if (item == undefined) return false
                return item.edit
              },
            },
          ],
        },

        footer: {
          label: 'Footer',
          vars: {
            var1: {
              value: 1 * 10 + 1,
            },
            var2: {
              value: 1 * 10 + 2,
            },
            var3: {
              value: '2020-01-01',
            },
          },
        },

        header: [
          {
            label: 'group width flex',
            vars: [
              {
                label: 'VAR 1',
                varName: 'var1',
                type: 'number',
              },
              {
                label: 'VAR 2',
                varName: 'var2',
                type: 'number',
              },
              {
                label: 'VAR 3',
                varName: 'var3',
                type: 'date',
              },
            ],
          },
          {
            label: 'group width 50 70 120',
            vars: [
              {
                label: 'VAR 1',
                width: 50,
                varName: 'var1',
                type: 'number',
              },
              {
                label: 'VAR 2',
                width: 70,
                varName: 'var2',
                type: 'text',
              },
              {
                label: 'VAR 3',
                width: 120,
                varName: 'var3',
                type: 'date',
              },
            ],
          },
          {
            label: 'group with big items',
            vars: [
              {
                label: 'VAR 1',
                width: 200,
                varName: 'var1',
                type: 'number',
              },
              {
                label: 'VAR 2',
                width: 300,
                varName: 'var2',
                type: 'text',
              },
              {
                label: 'VAR 3',
                width: 450,
                varName: 'var3',
                type: 'date',
              },
            ],
          },
        ],

        data: [],
      };


      //set Fake Data

      config.data = _.map(new Array(3), (a, i) => {
        let children = _.map(new Array(3), (a, i) => {
          let grandChildren = _.map(new Array(3), (a, i) => {
            return {
              label: 'GrandChild ' + i,
              vars: {
                var1: {
                  value: _.random(0, 100),
                },
                var2: {
                  value: i + 1 * 1000 + 2,
                },
                var3: {
                  value: '2020-01-01',
                },
              },
            }
          })

          return {
            label: 'child ' + i,
            children: grandChildren,
            vars: {
              var1: {
                value: i + 1 * 100 + 1,
              },
              var2: {
                value: i + 1 * 100 + 2,
              },
              var3: {
                value: '2020-01-01',
              },
            },
          }
        })

        return {
          label: 'Foo Parent' + i,
          subLabel: 'subLabel' + i,
          isLarge: true,
          hasInsetChildren: i == 0,
          children: children,
          tooltip: 'lorem ipsum dolor sit amen',
          vars: {
            var1: {
              value: i + 1 * 10 + 1,
            },
            var2: {
              value: i + 1 * 10 + 2,
            },
            var3: {
              value: '2020-01-01',
            },
          },
        }
      })

      this.configTable = this.$refs.marmota.init(config);
    },
  },
}
</script>
