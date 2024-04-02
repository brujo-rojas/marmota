<template>
  <div
    class="t-row"
    :class="{
      'bg-edit': item.edit && !isDisabled,
      'has-error': item.hasError,
      large: item.isLarge,
    }"
  >
    <div
      class="t-col-group"
      v-for="(hg, indexHg) in config.header"
      v-show="hg.vars.length > 0" 
      :key="indexHg"
    >
      <div
        class="t-col"
        :style="getItemStyle(headerItem)"
        v-for="(headerItem, indexHv) in hg.vars"
        :key="indexHv"
        :class="[headerItem.background, getClassItem(item, headerItem)]"
      >
        <span class="preppend-cell">
          <slot
            name="preppendCell"
            v-bind="{
              item,
              headerItem,
              parent,
              config,
              value: get(item, headerItem, 'value'),
            }"
          ></slot>
        </span>

        <cell-button
          v-if="headerItem.type == 'button'"
          :headerItem="headerItem"
          :item="item"
          :parent="parent"
          :config="config"
          :isDisabled="isDisabled"
        >
        </cell-button>

        <cell-number
          v-if="headerItem.type == 'number'"
          :headerItem="headerItem"
          :item="item"
          :parent="parent"
          :config="config"
          :isDisabled="isDisabled"
        >
        </cell-number>

        <cell-checkbox
          v-if="headerItem.type == 'checkbox'"
          :headerItem="headerItem"
          :item="item"
          :parent="parent"
          :config="config"
          :isDisabled="isDisabled"
        >
        </cell-checkbox>

        <cell-plain-text
          v-if="headerItem.type == 'plain-text'"
          :headerItem="headerItem"
          :item="item"
          :parent="parent"
          :config="config"
          :isDisabled="isDisabled"
        >
        </cell-plain-text>

        <cell-text
          v-if="headerItem.type == 'text'"
          :headerItem="headerItem"
          :item="item"
          :parent="parent"
          :config="config"
          :isDisabled="isDisabled"
        >
        </cell-text>

        <cell-textarea
          v-if="headerItem.type == 'textarea'"
          :headerItem="headerItem"
          :item="item"
          :parent="parent"
          :config="config"
          :isDisabled="isDisabled"
        >
        </cell-textarea>

        <cell-date
          v-if="headerItem.type == 'date'"
          :headerItem="headerItem"
          :item="item"
          :parent="parent"
          :config="config"
          :isDisabled="isDisabled"
        >
        </cell-date>

        <cell-time
          v-if="headerItem.type == 'time'"
          :headerItem="headerItem"
          :item="item"
          :parent="parent"
          :config="config"
          :isDisabled="isDisabled"
        >
        </cell-time>

        <cell-select
          v-if="headerItem.type == 'select' && headerItem.itemsSelect"
          :headerItem="headerItem"
          :item="item"
          :parent="parent"
          :config="config"
          :isDisabled="isDisabled"
        >
        </cell-select>

        <cell-autocomplete
          v-if="headerItem.type == 'autocomplete' && headerItem.itemsSelect"
          :headerItem="headerItem"
          :item="item"
          :parent="parent"
          :config="config"
          :isDisabled="isDisabled"
        >
        </cell-autocomplete>

        <span class="append-cell">
          <slot
            name="appendCell"
            v-bind="{
              item,
              headerItem,
              parent,
              config,
              value: get(item, headerItem, 'value'),
            }"
          ></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import utils from './../../utils/utils.js'
import cellButton from './../MarmotaCells/CellButton.vue'
import cellNumber from './../MarmotaCells/CellNumber.vue'
import cellCheckbox from './../MarmotaCells/CellCheckbox.vue'
import cellPlainText from './../MarmotaCells/CellPlainText.vue'
import cellText from './../MarmotaCells/CellText.vue'
import cellTextarea from './../MarmotaCells/CellTextarea.vue'
import cellDate from './../MarmotaCells/CellDate.vue'
import cellSelect from './../MarmotaCells/CellSelect.vue'
import cellAutocomplete from './../MarmotaCells/CellAutocomplete.vue'
import cellTime from './../MarmotaCells/CellTime.vue'

export default {
  name: 'MarmotaRow',
  components: {
    cellButton,
    cellNumber,
    cellCheckbox,
    cellPlainText,
    cellText,
    cellTextarea,
    cellDate,
    cellSelect,
    cellAutocomplete,
    cellTime
  },
  props: {
    index: { type: Number, default: -1 },
    item: { type: Object, default: null },
    parent: { type: Object, default: null },
    config: { type: Object, default: null },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    isDisabled() {
      return this.disabled
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    get: utils.get,
    set: utils.set,

    getItemStyle(headerItem) {
      let style = ''
      if (headerItem.width) {
        style = `width: ${headerItem.width}px;
                  flex:  0 0 ${headerItem.width}px`
      }
      if (
        this.isMobile &&
        headerItem.responsive &&
        headerItem.responsive.width
      ) {
        style = `width: ${headerItem.responsive.width}px;
                  flex:  0 0 ${headerItem.responsive.width}px`
      }
      return style
    },

    getClassItem(item, headerItem) {
      let num = utils.get(item, headerItem, 'value')
      let className = ''
      if (this.config.classNameIfZero && parseFloat(num) === 0) {
        className += this.config.classNameIfZero + ' '
      }
      if (headerItem.className) {
        className += ' ' + headerItem.className
      }
      return className
    },
  },
}
</script>
