<template>
  <div
    class="flex flex-grow-1 py-1"
  >
    <v-select
      :key="item.key"
      :items="headerItem.itemsSelect"
      :disabled="!isEditable(headerItem) || item.isLoading"
      :class="{ 'has-error': get(item, headerItem, 'hasError') }"
      @input="changeInput(item, headerItem, $event)"
      :menu-props="{ closeOnContentClick: !headerItem.selectIsMultiple }"
      :value="get(item, headerItem, 'value')"
      return-object
      hide-details
      single-line
      outlined
      dense
      :multiple="headerItem.selectIsMultiple"
      :item-text="headerItem.itemText || 'label'"
      item-color="accent"
      color="accent"
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

      <template v-slot:selection="{ item: localItem, index }">
        <span v-if="index === 0" class="truncate">
          <span
            v-if="(get(item, headerItem, 'value') || []).length > 1"
            class="accent--text text-caption"
          >
            ({{ (get(item, headerItem, 'value') || []).length }})
          </span>
          {{ localItem[headerItem.itemText || 'label'] }}
        </span>
      </template>
    </v-select>
  </div>
</template>

<script>
import cellMixin from './CellMixin'
export default {
  mixins: [cellMixin],
}
</script>
