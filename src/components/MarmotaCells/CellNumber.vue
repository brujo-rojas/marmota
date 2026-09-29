<template>
  <div class="d-flex flex-row align-center flex-grow-1">
    <div class="prefix">
      {{
        get(item, headerItem, 'prefix') != null
          ? get(item, headerItem, 'prefix')
          : ''
      }}
    </div>
    <input
      :key="item.key"
      v-if="isEditable(headerItem)"
      :readonly="item.isLoading"
      :class="{ 'has-error': get(item, headerItem, 'hasError') }"
      type="number"
      onwheel="this.blur()"
      min="0"
      class="wide"
      @input="changeInput(item, headerItem, $event.target.value)"
      @focus="$event.target.select()"
      :value="get(item, headerItem, 'value')"
    />
    <div class="plain-text" v-else>
      {{ formattedValue }}
    </div>
    <div class="suffix">
      {{
        get(item, headerItem, 'suffix') != null
          ? get(item, headerItem, 'suffix')
          : ''
      }}
    </div>
  </div>
</template>

<script>
import cellMixin from './CellMixin'
export default {
  mixins: [cellMixin],
  computed: {
    formattedValue() {
      const value = this.get(this.item, this.headerItem, 'value')
      return this.headerItem.displayFormatter
        ? this.headerItem.displayFormatter({ value, item: this.item, headerItem: this.headerItem })
        : value
    },
  },
}
</script>
