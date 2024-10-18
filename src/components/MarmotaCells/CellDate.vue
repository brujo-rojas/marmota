<template>
  <v-menu
    ref="menu"
    :value="get(item, headerItem, 'menu')"
    :disabled="!isEditable(headerItem) || item.isLoading"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        small
        outlined
        :ripple="item.edit"
        :class="{ 'has-error': get(item, headerItem, 'hasError') }"
        v-on="on"
      >
        <span class="text-capitalize">
          {{
            get(item, headerItem, 'prefix') != null
              ? get(item, headerItem, 'prefix')
              : ''
          }}
          {{ formatDate(get(item, headerItem, 'value')) }}
          {{
            get(item, headerItem, 'suffix') != null
              ? get(item, headerItem, 'suffix')
              : ''
          }}
        </span>
      </v-btn>
    </template>
    <v-date-picker
      :value="get(item, headerItem, 'value')"
      @input="changeInput(item, headerItem, $event)"
      first-day-of-week="1"
      locale-first-day-of-year="4"
      no-title
      scrollable
    >
    </v-date-picker>
  </v-menu>
</template>
<script>
import cellMixin from './CellMixin'
export default {
  mixins: [cellMixin],
}
</script>
