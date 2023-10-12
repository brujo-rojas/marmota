<template>
  <div class="flex-grow-1 justify-center d-flex">
    <v-simple-checkbox
      :color="headerItem.color || 'accent'"
      :key="item.key"
      :disabled="item.isLoading || !isEditable(headerItem)"
      :value="get(item, headerItem, 'value')"
      @input="changeInput(item, headerItem, $event)"
      hide-details
    ></v-simple-checkbox>
  </div>
</template>
<script>
import cellMixin from './CellMixin'
export default {
  mixins: [cellMixin],
}
</script>

<style></style>
