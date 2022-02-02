<template lang="html">
  <div
    ref="table"
    class="marmota"
    :class="{ 'dark-theme': isDark, 'has-groups': hasGroups }"
    v-if="localConfig"
  >
    <marmota-corner
      :config="localConfig"
      v-if="hasCornerLeft"
      @changeSelection="changeSelection"
    ></marmota-corner>

    <marmota-corner
      right
      disable-selection
      :has-groups="hasGroups"
      v-if="hasCornerRight"
      :config="localConfig"
    ></marmota-corner>

    <div class="table-container" ref="tableContainer">
      <marmota-header
        ref="marmotaHeader"
        :has-groups="hasGroups"
        :config="localConfig"
      >
        <template v-slot:appendItemHeaderGroup="props">
          <slot name="appendItemHeaderGroup" v-bind="props"></slot>
        </template>
      </marmota-header>

      <nav>
        <marmota-nav-item-group
          v-for="(item, index) in localConfig.data"
          v-show="!item.isHidden"
          :index="index"
          :config="localConfig"
          :disabled="disabled"
          @changeSelection="changeSelection"
          :item="item"
          @changeLabel="changeLabel(item, $event)"
          :key="index"
        >
          <template v-slot:prependItemNav="props">
            <slot name="prependItemNav" v-bind="props"></slot>
          </template>

          <template v-slot:appendItemNav="props">
            <slot name="appendItemNav" v-bind="props"></slot>
          </template>
        </marmota-nav-item-group>

        <marmota-nav-item-group
          v-if="localConfig.footer"
          :index="-2"
          :config="localConfig"
          :disabled="disabled"
          @changeSelection="changeSelection"
          :item="localConfig.footer"
          footer
        >
        </marmota-nav-item-group>
      </nav>

      <nav class="nav-right table-mode" v-if="hasNavRight">
        <marmota-nav-row-group
          v-for="(item, index) in localConfig.data"
          v-show="!item.isHidden"
          :key="index"
          :index="index"
          :disabled="disabled"
          :config="localConfig"
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
          v-if="localConfig.footer"
          :item="localConfig.footer"
          :config="localConfig"
          :disabled="disabled"
          footer
        >
        </marmota-nav-row>
      </nav>

      <div class="table">
        <marmota-row-group
          v-for="(item, index) in localConfig.data"
          v-show="!item.isHidden"
          :disabled="disabled"
          :key="index"
          :index="index"
          :config="localConfig"
          :item="item"
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
          :config="localConfig"
          v-if="localConfig.footer"
          :item="localConfig.footer"
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
//import utils from "@/utils/utils";
import dayjs from "dayjs";
import _ from "lodash";
import MarmotaNavItemGroup from "./../MarmotaNavItemGroup";
import MarmotaCorner from "./../MarmotaCorner";
import MarmotaHeader from "./../MarmotaHeader";
//import MarmotaRow           from '@/components/Marmota/components/MarmotaRow'
import MarmotaRowGroup from "./../MarmotaRowGroup";
import MarmotaNavRow from "./../MarmotaNavRow";
import MarmotaNavRowGroup from "./../MarmotaNavRowGroup";
import MarmotaEventBus from "./MarmotaEventBus";

export default {
  name:"Marmota",
  props: {
    config: { type: Object, required: true },
    disabled: { type: Boolean, default: false },
    isDark: { type: Boolean, default: false }
  },
  components: {
    MarmotaNavItemGroup,
    MarmotaCorner,
    MarmotaHeader,
    //MarmotaRow,
    MarmotaRowGroup,
    MarmotaNavRow,
    MarmotaNavRowGroup
  },
  data() {
    return {
      localConfig: null,
      isAllSelected: false
    };
  },
  computed: {
    hasGroups() {
      return (
        this.localConfig.header.length > 1 || this.localConfig.forceShowGroup
      );
    },
    hasCornerLeft() {
      return (
        this.localConfig.corner.left &&
        this.localConfig.corner.left.enabled !== false
      );
    },
    hasCornerRight() {
      return (
        this.localConfig.navRight && this.localConfig.navRight.enabled !== false
      );
    },
    hasNavRight() {
      return (
        this.localConfig.navRight && this.localConfig.navRight.enabled !== false
      );
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },
  watch: {
    config: {
      deep: true,
      handler() {
        this.init();
      }
    },
    isMobile() {
      this.prepareCssVariables();
    }
  },
  mounted() {
    this.init();
    MarmotaEventBus.$on("change", payload => this.$emit("change", payload));
    MarmotaEventBus.$on("changeLabel", payload =>
      this.$emit("change", payload)
    );
    MarmotaEventBus.$on("clickHeaderLabel", payload =>
      this.$emit("clickHeaderLabel", payload)
    );
  },
  methods: {
    /**
    TODO ordenar por columnas
    TODO responsive
    TODO tooltip y notas en navLEft header y en celdas donde es necesario
    TODO inteligencia en seleccion de items
    */
    init() {
      console.log("init table");
      this.localConfig = this.prepareConfig(this.config);
      this.$nextTick(() => {
        this.prepareCssVariables();
        this.prepareScrollPosition();
      });
    },

    prepareConfig(userConfig) {
      let defaultConfig = {
        isSelectable: true,
        selectType: "leaf"
      };

      //let newConfig = utils.mergeObjects(defaultConfig, _.cloneDeep(userConfig));
      let newConfig = { ...defaultConfig, ...userConfig };
      newConfig.data = userConfig.data.map(item => {
        return this.prepareItemDataConfig(item);
      });
      return newConfig;
    },

    prepareItemDataConfig(item) {
      let defaultDataConfig = {
        showChildren: true, // despliega o no hijos,
        edit: false, // si esta en edicion, cambia al editarse
        editable: true,
        isLoading: false, //si es que esta cargando, cambia en ejecucion
        isNew: false, // define si es nuevo, para items agregados desde tabla
        isLarge: false, // genera altura doble para fila
        isCloned: false, // define si es clonado de algun item distinto, usado para verificar autoguardado
        isSelected: false, // define si esta seleccionado o no un item, cambia en ejecucion
        isSelectable: true, // si un item es seleccionable
        hasError: false // indica si una fila es valida o no, al momento de ser editada
      };

      //let newItemConfig = utils.mergeObjects(defaultDataConfig, _.cloneDeep(item));
      let newItemConfig = { ...defaultDataConfig, ...item };

      if (newItemConfig.children) {
        newItemConfig.children = newItemConfig.children.map(item => {
          return this.prepareItemDataConfig(item);
        });
      }
      return newItemConfig;
    },

    reloadSelectAllCheckbox() {
      let itemsSelected = this.localConfig.data.filter(i => i.isSelected);

      if (itemsSelected.length == this.localConfig.data.length) {
        this.isAllSelected = true;
      } else {
        this.isAllSelected = false;
      }
    },

    validateItems() {
      this.localConfig.data.forEach(item => {
        this.validateItem(item);
      });
    },

    prepareCssVariables() {
      let navRightWidth = this.getNavRightWidth() + 10;
      this.setCssVar("--nav_right_width", navRightWidth + "px");

      if (this.localConfig.nav.width) {
        let navWidth = this.localConfig.nav.width;
        this.setCssVar("--nav_width", navWidth + "px");
      }
    },

    prepareScrollPosition() {
      if (
        this.config.scroll &&
        this.config.scroll.moveToToday &&
        this.$refs.marmotaHeader &&
        this.$refs.marmotaHeader.$refs["marmota-today"]
      ) {
        this.$refs.marmotaHeader.$refs[
          "marmota-today"
        ][0].scrollIntoView({ inline: "center", behavior: "smooth" });
      } else if (this.config.scroll && this.config.scroll.moveToEnd) {
        let container = this.$refs.tableContainer;
        container.scrollLeft = container.scrollWidth;
      }
    },

    getCssVar(varName) {
      let $el = this.$refs.table;
      if ($el) {
        let value = getComputedStyle($el).getPropertyValue(varName);
        return value;
      }
      return null;
    },

    setCssVar(varName, value) {
      let $el = this.$refs.table;
      if ($el) {
        $el.style.setProperty(varName, value);
      }
    },

    getNavRightWidth() {
      if (this.localConfig.navRight && this.localConfig.navRight.vars) {
        let defaultWidth = this.getCssVar("--header_item_width");
        defaultWidth = parseFloat(defaultWidth);

        let navWidth = _.reduce(
          this.localConfig.navRight.vars,
          (sum, navVar) => {
            let width = navVar.width || defaultWidth;
            if (navVar.isShow) {
              sum += navVar.isShow() ? width : 0;
            } else {
              sum += width;
            }
            return sum;
          },
          0
        );
        return navWidth;
      }
      return 0;
    },

    validateItem(item) {
      //TODO min, max
      item.hasError = false;
      this.localConfig.header.vars.forEach(headerItem => {
        item.vars[headerItem.varName].hasError = false;

        if (headerItem.required && !item.vars[headerItem.varName].value) {
          item.hasError = true;
          item.vars[headerItem.varName].hasError = true;
        }

        if (headerItem.beforeTo) {
          let dateHeaderItem = dayjs(item.vars[headerItem.varName].value);
          let dateBeforeTo = dayjs(item.vars[headerItem.beforeTo].value);
          if (!dateHeaderItem.isBefore(dateBeforeTo, "day")) {
            item.hasError = true;
            item.vars[headerItem.varName].hasError = true;
          }
        }

        if (headerItem.afterTo) {
          let dateHeaderItem = dayjs(item.vars[headerItem.varName].value);
          let dateAfterTo = dayjs(item.vars[headerItem.afterTo].value);
          if (!dateHeaderItem.isAfter(dateAfterTo, "day")) {
            item.hasError = true;
            item.vars[headerItem.varName].hasError = true;
          }
        }
      });
      return item.hasError;
    },

    changeSelection(params) {
      this.$emit("changeSelection", params);
    },
    changeLabel(item, $event) {
      item[this.config.nav.textLabel] = $event;
    }
  }
};
</script>

<style lang="scss">
@import "./../../scss/marmota.scss";
</style>