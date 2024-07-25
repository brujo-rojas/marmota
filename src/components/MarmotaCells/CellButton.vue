<template>
  <div class="justify-center d-flex flex-grow-1">
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
}
</script>

<style></style>
