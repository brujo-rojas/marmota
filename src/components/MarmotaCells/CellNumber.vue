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
      v-if="isEditable(item, headerItem)"
      :readonly="item.isLoading"
      :class="{ 'has-error': get(item, headerItem, 'hasError') }"
      type="number"
      class="wide"
      :step="headerItem.step || 0.01"
      @input="changeInput(item, headerItem, $event.target.value)"
      @focus="$event.target.select()"
      :value="get(item, headerItem, 'value')"
    />
    <div class="plain-text" v-else>
      {{ get(item, headerItem, 'value') }}
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
}
</script>
