<template>
  <div :class="contentClass">
    <v-btn
      small
      outlined
      :disabled="
        isDisabled ||
        item.isLoading ||
        (headerItem.enabler && !headerItem.enabler({ item, config }))
      "
      @click="
        headerItem.onClick({
          item,
          parent,
          config,
          event: $event,
          isEditable: isEditable(headerItem),
        })
      "
      class="ma-0 pa-1"
      :width="headerItem.widthButton"
    >
      <span
        v-html="
          headerItem.labelFormatter
            ? headerItem.labelFormatter({
                config,
                parent,
                item,
                headerItem,
              })
            : headerItem.label
        "
      >
      </span>
    </v-btn>
  </div>
</template>
<script>
import cellMixin from './CellMixin'
export default {
  mixins: [cellMixin],
  computed: {
    contentClass() {
      let classNames = ''
      if (!this.headerItem.align || this.headerItem.align === 'center') {
        classNames += 'justify-center d-flex flex-grow-1'
      }
      if (this.headerItem.align === 'right') {
        classNames += 'justify-end d-flex flex-grow-1'
      }
      if (this.headerItem.align === 'left') {
        classNames += 'justify-start d-flex flex-grow-1'
      }
      if (this.item.cellClassName) {
        classNames += ' ' + this.item.cellClassName
      }
      return classNames
    },
  },
}
</script>

<style></style>
