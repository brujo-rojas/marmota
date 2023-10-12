<template>
  <div class="d-flex flex-row align-center flex-grow-1">
    <div class="prefix">
      {{
        get(item, headerItem, 'prefix') != null
          ? get(item, headerItem, 'prefix')
          : ''
      }}
    </div>
    <div class="plain-text">
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
