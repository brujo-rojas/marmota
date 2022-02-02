<template>
  <header>
    <div
      class="header-item-group"
      :style="getGroupStyle(headerGroup)"
      :ref="headerGroup.isToday ? 'marmota-today' : ''"
      v-for="(headerGroup, index) in config.header"
      :key="index"
    >
      <div class="header-item-group-top" v-show="hasGroups">
        <v-tooltip
          content-class="v-tooltip--white-big elevation-10"
          top
          :disabled="!headerGroup.tooltip"
          open-delay="200"
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              class="header-item-group-top-container"
              :class="{ 'has-one-column': headerGroup.vars.length == 1 }"
              v-bind="attrs"
              v-on="on"
            >
              <div
                class="header-item-group-title"
                :class="headerGroup.isToday ? 'active' : ''"
              >
                <span>
                  {{ headerGroup.label }}
                </span>
              </div>
            </div>
          </template>
          <span>
            {{ headerGroup.tooltip }}
          </span>
        </v-tooltip>
        <slot
          name="appendItemHeaderGroup"
          v-bind="{ headerGroup, config }"
        ></slot>
      </div>
      <div class="header-item-container">
        <div
          class="header-item truncate"
          :class="[
            headerItem.background,
            headerItem.clickeable ? 'header-item-clickeable' : '',
          ]"
          :style="getItemStyle(headerItem)"
          v-for="(headerItem, indexHeaderGroup) in headerGroup.vars"
          @click="onLabelClick(headerItem)"
          :key="indexHeaderGroup"
        >
          <v-tooltip
            content-class="v-tooltip--white-big elevation-10"
            bottom
            open-delay="200"
            :disabled="!headerItem.tooltip"
          >
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" class="d-block">
                {{ headerItem.label }}
              </span>
            </template>
            <span>
              {{ headerItem.tooltip }}
            </span>
          </v-tooltip>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import MarmotaEventBus from './../Marmota/MarmotaEventBus'
import _ from 'lodash'
export default {
  name: 'MarmotaHeader',
  props: {
    config: { type: Object, default: null },
    hasGroups: { type: Boolean, default: false },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    getGroupStyle(headerGroup) {
      let headerItem = _.first(headerGroup.vars)
      let style = ''
      if (headerGroup.vars.length == 1 && headerItem.width) {
        style = `width:     ${headerItem.width + 2}px;
                  flex:      1 0 ${headerItem.width}px`
        if (
          this.isMobile &&
          headerItem.responsive &&
          headerItem.responsive.width
        ) {
          style = `width: ${headerItem.responsive.width + 2}px;
                    flex:  1 0 ${headerItem.responsive.width}px`
        }
      }
      return style
    },
    getItemStyle(headerItem) {
      let style = ''
      if (headerItem.width) {
        style = `width:     ${headerItem.width}px;
                  min-width: ${headerItem.width}px;
                  flex:      0 0 ${headerItem.width}px`
      }
      if (
        this.isMobile &&
        headerItem.responsive &&
        headerItem.responsive.width
      ) {
        style = `width: ${headerItem.responsive.width}px;
                  min-width: ${headerItem.responsive.width}px;
                  flex:  0 0 ${headerItem.responsive.width}px`
      }
      return style
    },
    onLabelClick(headerItem) {
      MarmotaEventBus.$emit('clickHeaderLabel', {
        headerItem,
      })
    },
  },
}
</script>
