<template>
  <div class="v-application">
    <marmota style="height: 450px" ref="marmota"> </marmota>
  </div>
</template>
<script>
export default {
  data() {
    return {
      configTable: null,
    }
  },
  mounted() {
    let configTable = {
      isSelectable: false,

      corner: {
        left: {
          label: 'Items',
          isAllSelectable: false,
        },
      },

      nav: {
        textLabel: 'label',
        width: 150,
      },

      header: [
        {
          label: '',
          vars: [
            {
              label: 'variable 1',
              varName: 'var1',
              type: 'number',
            },
            {
              label: 'variable 2',
              varName: 'var2',
              type: 'number',
            },
            {
              label: 'variable 3',
              varName: 'var3',
              type: 'text',
            },
          ],
        },
      ],

      data: null,
    }
    configTable.data = _.map(new Array(2), (a, i) => {
      let children = _.map(new Array(2), (a, i) => {
        let grandChildren = _.map(new Array(3), (a, i) => {
          return {
            label: 'GC item ' + i,
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
          label: 'child item ' + i,
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
        label: 'item tem item ' + i,
        children: children,
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

    this.configTable = this.$refs.marmota.init(configTable)
  },
}
</script>
