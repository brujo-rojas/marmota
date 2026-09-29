<template>
  <div class="corner">
    <div class="corner-item d-flex align-center flex-grow-1">
      <v-checkbox
        class="ma-0 pa-0"
        color="white"
        v-if="isSelectable"
        dark
        v-model="isAllSelected"
        @change="changeSelectAllCheckbox()"
        hide-details
      ></v-checkbox>
      <span class="mr-4">
        {{ config.corner.left.label }}
      </span>
    </div>

    <span class="append-corner-left">
      <slot
        name="appendCornerLeft"
        v-bind="{
          config,
        }"
      ></slot>
    </span>

    <div class="aux-inset-children" v-if="hasInset"></div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'MarmotaCorner',
  props: {
    disableSelection: { type: Boolean, default: false },
    config: { type: Object, default: null },
  },
  data() {
    return {
      isAllSelected: false,
    }
  },
  computed: {
    isSelectable() {
      return (
        !this.disableSelection &&
        this.config.isSelectable !== false &&
        this.config.corner.left.isAllSelectable !== false
      )
    },
    hasInset() {
      return this.config.corner.left.insetMenuPadding || false
    },
  },
  watch: {
    config() {
      this.isAllSelected = false
    },
  },
  methods: {
    changeSelectAllCheckbox() {
      const setSelectedDeep = (node, isSelected) => {
        node.isSelected = isSelected
        if (node.children && node.children.length) {
          node.children.forEach((child) => setSelectedDeep(child, isSelected))
        }
        if (node.insetChildren && node.insetChildren.length) {
          node.insetChildren.forEach((child) => setSelectedDeep(child, isSelected))
        }
      }

      this.config.data.forEach((item) => {
        setSelectedDeep(item, this.isAllSelected)
      })

      const collectSelected = (array) => {
        let out = []
        array.forEach((n) => {
          if (n.isSelected) out.push(n)
          if (n.children && n.children.length) out = out.concat(collectSelected(n.children))
          if (n.insetChildren && n.insetChildren.length) out = out.concat(collectSelected(n.insetChildren))
        })
        return out
      }

      this.$emit('changeSelection', {
        isAllSelected: this.isAllSelected,
        itemsSelected: collectSelected(this.config.data),
      })
    },
  },
}
</script>

<style></style>
