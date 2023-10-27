<template>
  <div
    class="nav-item-group"
    :class="{
      'bottom-fixed': footer,
      'is-inset': inset,
      'has-inset-children': !!item.insetChildren,
      'nav-item-group-zebra' : hasZebra && !inset
    }"
  >
    <div
      class="nav-item d-flex flex-row"
      :class="{
        'bg-edit': item.edit,
        large: item.isLarge,
      }"
    >
      <div
        class="nav-item-container d-flex align-center clickeable"
        v-show="!item.isHidden"
      >
        <v-icon
          :class="{ rotate: item.showChildren }"
          @click="toggleShowNavItem(item)"
          v-if="item.children && !inset"
          class="ml-1"
        >
          {{ icons.expandMore }}
        </v-icon>

        <div
          class="space-icon"
          v-show="isChild && !item.children && !inset"
        ></div>

        <v-checkbox
          class="ml-2 my-0 pa-0"
          color="white"
          :disabled="isDisabled"
          dark
          v-model="item.isSelected"
          v-show="!item.isLoading"
          v-if="item.isSelectable && config.isSelectable"
          @change="changeSelection(item)"
          hide-details
        >
        </v-checkbox>

        <v-progress-circular
          v-show="item.isLoading"
          :size="24"
          :width="3"
          color="white"
          class="mx-2"
          indeterminate
        >
        </v-progress-circular>

        <slot name="prependItemNav" v-bind="{ item, config }" v-if="!isChild"></slot>

        <v-tooltip
          content-class="v-tooltip--white-big elevation-10"
          right
          open-delay="200"
          :disabled="!item.tooltip"
          v-if="!item.edit || inset"
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              @click="onClickLabel(item)"
              class="nav-item-label d-flex flex-column truncate"
            >
              <span class="nav-label truncate">
                {{ item[textLabel] }}
              </span>
              <span v-if="item[subTextLabel]" class="nav-sub-label truncate">
                {{ item[subTextLabel] }}
              </span>
            </div>
          </template>
          <span>{{ item.tooltip }}</span>
        </v-tooltip>

        <slot name="appendItemNav" v-bind="{ item, config }" v-if="!isChild"></slot>
        <slot name="inputItemNav" v-bind="{ item, config, inset, isDisabledInput }" v-if="!isChild">
          <input
            v-show="item.edit && !inset"
            :disabled="isDisabledInput"
            type="text"
            :class="{ 'has-error': item.hasLabelError }"
            :key="item.key"
            class="wide"
            :value="getLabel(item)"
            @change="setLabel(item, $event.target.value)"
          />
        </slot>
      </div>

      <template v-if="item.insetChildren">
        <div class="inset-children">
          <marmota-nav-item-group
            v-for="(child, index) in item.insetChildren"
            v-show="!child.isHidden"
            is-child
            inset
            :key="index"
            :config="config"
            @changeLabel="item[textLabel] = $event"
            :parent="item"
            :item="child"
          >
            <template v-slot:appendItemNav="props">
              <slot name="appendItemNav" v-bind="props"></slot>
            </template>

            <template v-slot:prependItemNav="props">
              <slot name="prependItemNav" v-bind="props"></slot>
            </template>
          </marmota-nav-item-group>
        </div>
      </template>
    </div>

    <template v-if="item.showChildren">
      <marmota-nav-item-group
        v-for="(child, index) in item.children"
        v-show="!child.isHidden"
        is-child
        :key="index"
        :config="config"
        @changeLabel="item[textLabel] = $event"
        :parent="item"
        :item="child"
      >
        <template v-slot:appendItemNav="props">
          <slot name="appendItemNav" v-bind="props"></slot>
        </template>

        <template v-slot:prependItemNav="props">
          <slot name="prependItemNav" v-bind="props"></slot>
        </template>
      </marmota-nav-item-group>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
import utils from './../../utils/utils.js'
import MarmotaEventBus from './../Marmota/MarmotaEventBus'
import { mdiChevronDown } from '@mdi/js'

export default {
  name: 'MarmotaNavItemGroup',
  props: {
    index: { type: Number, default: -1 },
    item: { type: Object, default: null },
    parent: { type: Object, default: null },
    config: { type: Object, default: null },
    isChild: { type: Boolean, default: false },
    inset: { type: Boolean, default: false },
    footer: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    hasZebra: { type: Boolean, default: false},
  },
  data() {
    return {
      icons: {
        expandMore: mdiChevronDown,
      },
    }
  },
  computed: {
    textLabel() {
      return this.config.nav.textLabel || 'label'
    },
    subTextLabel() {
      return this.config.nav.subTextLabel || 'subLabel'
    },
    isDisabledInput() {
      return (
        !this.item.edit ||
        this.disabled ||
        !this.config.nav.editable ||
        this.item.isLoading
      )
    },
    isDisabled() {
      return this.disabled
    },
  },
  methods: {
    toggleShowNavItem(item) {
      if (item.children) {
        item.showChildren = !item.showChildren
      }
    },
    changeSelection(item) {
      this.$emit('changeSelection', {
        item,
        itemsSelected: this.getItemsSelected(this.config.data),
      })
    },
    getItemsSelected(arrayData) {
      let selected = []
      arrayData.forEach((item) => {
        if (item.isSelected) {
          selected.push(item)
        }
        if (item.children) {
          selected = [...selected, this.getItemsSelected(item.children)]
        }
      })
      return selected
    },
    onClickLabel(item) {
      if (this.config.nav.onLabelClick) {
        this.config.nav.onLabelClick({
          item,
          config: this.config,
        })
      }
    },

    getLabel(item) {
      // get var from item
      return _.get(item, this.textLabel)
    },

    setLabel(item, newValue) {
      item.hasLabelError = false

      this.$set(item, this.textLabel, newValue)
      this.$emit('changeLabel', newValue)
      MarmotaEventBus.$emit('change', { item, index: this.index })
      utils.validateLabelItem({ config: this.config, item })
    },
  },
}
</script>
