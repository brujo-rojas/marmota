<template>
  <div class="flex flex-grow-1 py-1">
    <v-autocomplete
      :key="item.key + 'a'"
      :items="headerItem.itemsSelect"
      :disabled="!isEditable(headerItem) || item.isLoading"
      :class="{ 'has-error': get(item, headerItem, 'hasError') }"
      @input="changeInput(item, headerItem, $event)"
      :value="get(item, headerItem, 'value')"
      return-object
      hide-details
      single-line
      :solo-inverted="isDark && isEditable(headerItem) || item.isLoading"
      :solo="!isDark && isEditable(headerItem) || item.isLoading"
      outlined
      dense
      flat
      :item-text="headerItem.itemText || 'label'"
      :item-color="isDark ? 'white' : 'accent'"
      :color="isDark ? 'white' : 'accent'"
    >
      <template v-slot:prepend-item>
        <div v-if="headerItem.nulleable">
          <v-list-item ripple @click="changeInput(item, headerItem, null)">
            <v-list-item-content>
              <v-list-item-title>
                {{ headerItem.itemNulleableText || 'No Asignar' }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mt-2"></v-divider>
        </div>
      </template>
    </v-autocomplete>
  </div>
</template>
<script>
import cellMixin from './CellMixin'
export default {
  mixins: [cellMixin],
}
</script>
