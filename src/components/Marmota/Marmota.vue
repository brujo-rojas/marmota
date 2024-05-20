<template lang="html">
  <div
    ref="table"
    class="marmota"
    :class="{ 'dark-theme': isDark, 'has-groups': hasGroups }"
    v-if="config"
  >
    <marmota-corner
      v-if="hasCornerLeft"
      :config="config"
      @changeSelection="changeSelection"
    >
      <template v-slot:appendCornerLeft="props">
        <slot name="appendCornerLeft" v-bind="props"></slot>
      </template>
    </marmota-corner>

    <marmota-corner-right
      v-if="hasCornerRight"
      :has-groups="hasGroups"
      :config="config"
    ></marmota-corner-right>

    <div class="table-container" ref="tableContainer">
      <marmota-header
        ref="marmotaHeader"
        :has-groups="hasGroups"
        :config="config"
      >
        <template v-slot:prependItemHeaderGroup="props">
          <slot name="prependItemHeaderGroup" v-bind="props"></slot>
        </template>
        <template v-slot:appendItemHeaderGroup="props">
          <slot name="appendItemHeaderGroup" v-bind="props"></slot>
        </template>

        <template v-slot:prependItemHeader="props">
          <slot name="prependItemHeader" v-bind="props"></slot>
        </template>
        <template v-slot:appendItemHeader="props">
          <slot name="appendItemHeader" v-bind="props"></slot>
        </template>
      </marmota-header>

      <nav v-if="hasNav">
        <marmota-nav-item-group
          v-for="(item, index) in config.data"
          v-show="!item.isHidden"
          :index="index"
          :config="config"
          :disabled="disabled"
          @changeSelection="changeSelection"
          :item="item"
          @changeLabel="changeLabel(item, $event)"
          :key="index"
          :has-zebra="zebra"
        >
          <template v-slot:prependItemNav="props">
            <slot name="prependItemNav" v-bind="props"></slot>
          </template>

          <template v-slot:inputItemNav="props">
            <slot name="inputItemNav" v-bind="props"></slot>
          </template>

          <template v-slot:appendItemNav="props">
            <slot name="appendItemNav" v-bind="props"></slot>
          </template>
        </marmota-nav-item-group>

        <marmota-nav-item-group
          v-if="config.footer"
          :index="-2"
          :config="config"
          :disabled="disabled"
          @changeSelection="changeSelection"
          :item="config.footer"
          footer
        >
        </marmota-nav-item-group>
      </nav>

      <nav class="nav-right table-mode" v-if="hasNavRight">
        <marmota-nav-row-group
          v-for="(item, index) in config.data"
          v-show="!item.isHidden"
          :key="index"
          :index="index"
          :disabled="disabled"
          :config="config"
          :item="item"
        >
          <template v-slot:preppendCell="props">
            <slot name="preppendCellNavRight" v-bind="props"></slot>
          </template>

          <template v-slot:appendCell="props">
            <slot name="appendCellNavRight" v-bind="props"></slot>
          </template>
        </marmota-nav-row-group>
        <marmota-nav-row
          :index="-2"
          v-if="config.footer"
          :item="config.footer"
          :config="config"
          :disabled="disabled"
          footer
        >
        </marmota-nav-row>
      </nav>

      <div class="table">
        <marmota-row-group
          v-for="(item, index) in config.data"
          v-show="!item.isHidden"
          :disabled="disabled"
          :key="index"
          :index="index"
          :config="config"
          :item="item"
          :has-zebra="zebra"
          :isDark="isDark"
        >
          <template v-slot:preppendCell="props">
            <slot name="preppendCell" v-bind="props"></slot>
          </template>

          <template v-slot:appendCell="props">
            <slot name="appendCell" v-bind="props"></slot>
          </template>
        </marmota-row-group>

        <marmota-row-group
          class="table-footer bottom-fixed"
          :disabled="disabled"
          :index="-2"
          :config="config"
          v-if="config.footer"
          :item="config.footer"
          :isDark="isDark"
        >
          <template v-slot:preppendCell="props">
            <slot name="preppendCell" v-bind="props"></slot>
          </template>

          <template v-slot:appendCell="props">
            <slot name="appendCell" v-bind="props"></slot>
          </template>
        </marmota-row-group>
      </div>
    </div>
  </div>
</template>

<script>
import utils from './../../utils/utils.js'
import _ from 'lodash'
import MarmotaNavItemGroup from './../MarmotaNavItemGroup'
import MarmotaCorner from './../MarmotaCorner'
import MarmotaCornerRight from './../MarmotaCornerRight'
import MarmotaHeader from './../MarmotaHeader'
import MarmotaRowGroup from './../MarmotaRowGroup'
import MarmotaNavRow from './../MarmotaNavRow'
import MarmotaNavRowGroup from './../MarmotaNavRowGroup'
import MarmotaEventBus from './MarmotaEventBus'

export default {
  name: 'Marmota',
  props: {
    disabled: { type: Boolean, default: false },
    isDark: { type: Boolean, default: false },
    zebra: { type: Boolean, default: false },
  },
  components: {
    MarmotaNavItemGroup,
    MarmotaCorner,
    MarmotaCornerRight,
    MarmotaHeader,
    MarmotaRowGroup,
    MarmotaNavRow,
    MarmotaNavRowGroup,
  },
  data() {
    return {
      config: null,
      isAllSelected: false,
    }
  },
  computed: {
    hasGroups() {
      return this.config.header.length > 1 || this.config.forceShowGroup
    },
    hasCornerLeft() {
      return (
        this.config.corner &&
        this.config.corner.left &&
        this.config.corner.left.enabled !== false &&
        this.hasNav
      )
    },
    hasCornerRight() {
      return this.hasNavRight
    },
    hasNavRight() {
      return this.config.navRight && this.config.navRight.enabled !== false
    },
    hasNav() {
      return this.config.nav && this.config.nav.enabled !== false
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  watch: {
    isMobile() {
      this.prepareCssVariables()
    },
  },

  mounted() {
    this.$emit('mounted', this)
  },

  methods: {
    /**
    TODO ordenar por columnas
    TODO responsive
    TODO tooltip y notas en navLEft header y en celdas donde es necesario
    TODO inteligencia en seleccion de items
    */
    init(initialConfig) {
      if (initialConfig && initialConfig.data) {
        this.config = this.prepareConfig(initialConfig)

        this.addEvents()
        this.$nextTick(() => {
          this.prepareCssVariables()
          this.prepareScrollPosition()
        })
        return this.config
      }
    },

    prepareConfig(userConfig) {
      let defaultConfig = {
        isSelectable: true,
        selectType: 'leaf',
      }

      //let newConfig = utils.mergeObjects(defaultConfig, _.cloneDeep(userConfig));
      let userConfigClon = _.cloneDeep(userConfig)
      let newConfig = { ...defaultConfig, ...userConfigClon }
      newConfig.data = userConfigClon.data.map((item) => {
        return this.prepareItemDataConfig(item)
      })
      return newConfig
    },

    prepareItemDataConfig(item) {
      let defaultDataConfig = {
        key: 1,
        showChildren: true, // despliega o no hijos,
        edit: false, // si esta en edicion, cambia al editarse
        editable: true, // si tendra opcio de edicion
        isLoading: false, //si es que esta cargando, cambia en ejecucion
        isNew: false, // define si es nuevo, para items agregados desde tabla
        isLarge: false, // genera altura doble para fila
        isCloned: false, // define si es clonado de algun item distinto, usado para verificar autoguardado
        isSelected: false, // define si esta seleccionado o no un item, cambia en ejecucion
        isSelectable: true, // si un item es seleccionable
        hasError: false, // indica si una fila es valida o no, al momento de ser editada
        isHidden: false, // define si esta oculto o no
      }

      //let newItemConfig = utils.mergeObjects(defaultDataConfig, _.cloneDeep(item));
      let newItemConfig = { ...defaultDataConfig, ...item }

      if (newItemConfig.children) {
        newItemConfig.children = newItemConfig.children.map((item) => {
          return this.prepareItemDataConfig(item)
        })
      }
      return newItemConfig
    },

    reloadSelectAllCheckbox() {
      let itemsSelected = this.config.data.filter((i) => i.isSelected)

      if (itemsSelected.length == this.config.data.length) {
        this.isAllSelected = true
      } else {
        this.isAllSelected = false
      }
    },

    validateItem: (props) => utils.validateItem(props),
    validateItems() {
      let hasError = false
      this.config.data.forEach((item) => {
        hasError = this.validateItem({
          config: this.config,
          item,
        })
      })
      return hasError
    },

    addEvents() {
      MarmotaEventBus.$on('change', (payload) => this.$emit('change', payload))
      MarmotaEventBus.$on('changeLabel', (payload) =>
        this.$emit('change', payload)
      )
      MarmotaEventBus.$on('clickHeaderLabel', (payload) =>
        this.$emit('clickHeaderLabel', payload)
      )
    },

    prepareCssVariables() {
      let navRightWidth = this.getNavRightWidth() + 10
      this.setCssVar('--nav_right_width', navRightWidth + 'px')
      
      if(this.config.itemHeight){
        this.setCssVar('--item_height', this.config.itemHeight + 'px')
      }

      let navWidth = 0
      if (this.config.nav) {
        if (
          this.isMobile &&
          this.config.nav.mobile &&
          this.config.nav.mobile.width
        ) {
          navWidth = this.config.nav.mobile.width
        } else if (this.config.nav.width) {
          navWidth = this.config.nav.width
        }
      }
      this.setCssVar('--nav_width', navWidth + 'px')
    },

    prepareScrollPosition() {
      if (
        this.config.scroll &&
        this.config.scroll.moveToToday &&
        this.$refs.marmotaHeader &&
        this.$refs.marmotaHeader.$refs['marmota-today']
      ) {
        this.$refs.marmotaHeader.$refs['marmota-today'][0].scrollIntoView({
          inline: 'center',
          behavior: 'smooth',
        })
      } else if (this.config.scroll && this.config.scroll.moveToEnd) {
        let container = this.$refs.tableContainer
        container.scrollLeft = container.scrollWidth
      }
    },

    getCssVar(varName) {
      let $el = this.$refs.table
      if ($el) {
        let value = getComputedStyle($el).getPropertyValue(varName)
        return value
      }
      return null
    },

    setCssVar(varName, value) {
      let $el = this.$refs.table
      if ($el) {
        $el.style.setProperty(varName, value)
      }
    },

    getNavRightWidth() {
      if (this.config.navRight && this.config.navRight.vars) {
        let defaultWidth = this.getCssVar('--header_item_width')
        defaultWidth = parseFloat(defaultWidth)

        let navWidth = _.reduce(
          this.config.navRight.vars,
          (sum, navVar) => {
            let width = navVar.width || defaultWidth
            if (navVar.isShow) {
              sum += navVar.isShow() ? width : 0
            } else {
              sum += width
            }
            return sum
          },
          0
        )
        return navWidth
      }
      return 0
    },

    changeSelection(params) {
      this.$emit('changeSelection', params)
    },
    changeLabel(item, $event) {
      if (this.config.nav && this.config.nav.textLabel) {
        item[this.config.nav.textLabel] = $event
      }
    },
  },
}
</script>

<style lang="scss">
@import './../../scss/marmota.scss';
</style>
