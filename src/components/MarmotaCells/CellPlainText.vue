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
      <v-tooltip
        content-class="v-tooltip--white-big elevation-10 complex-tooltip"
        top
        open-delay="200"
      >
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            {{ get(item, headerItem, 'value') }}
          </span>
        </template>
        {{ get(item, headerItem, 'value') }}
      </v-tooltip>
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
