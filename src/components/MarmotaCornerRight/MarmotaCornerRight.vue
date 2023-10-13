<template>
  <div class="corner right">
    <div class="header-item-group">
      <div class="header-item-group-title" v-show="hasGroups">
        <div class="header-item-group-title-container">
          <v-tooltip content-class="v-tooltip--white-big elevation-10" top>
            <template v-slot:activator="{ on, attrs }">
              <span v-on="on" v-bind="attrs">
                {{ config.navRight.label }}
              </span>
            </template>
            <span>
              {{ config.navRight.tooltip }}
            </span>
          </v-tooltip>
        </div>
      </div>
      <div class="header-item-container">
        <div
          v-for="(hv, indexHv) in config.navRight.vars"
          :key="indexHv"
          v-show="hv.isShow ? hv.isShow({ edit: false }) : true"
          class="header-item"
          :class="[hv.background]"
          :style="getItemStyle(hv)"
        >
          <span>
            {{ hv.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'MarmotaCorner',
  props: {
    config: { type: Object, default: null },
    hasGroups: { type: Boolean, default: false },
  },
  methods: {
    getItemStyle(headerItem) {
      let style = ''
      if (headerItem.width) {
        style += 'width:' + headerItem.width + 'px;'
        style += 'min-width:' + headerItem.width + 'px;'
        style += 'flex: 0 0 ' + headerItem.width + 'px;'
      }
      return style
    },
  },
}
</script>

<style></style>
