<template>
  <div class="flex flex-grow-1 py-1">
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

      <template v-slot:item="{ item: localItem }">
        <div class="v-list-item__action" v-if="headerItem.selectIsMultiple">
          <v-simple-checkbox
            v-if="headerItem.selectIsMultiple"
            :value="(get(item, headerItem, 'value') || []).includes(localItem)"
          ></v-simple-checkbox>
        </div>
        <div class="v-list-item__content">
          <div class="v-list-item__title">
            {{ localItem[headerItem.itemText || 'label'] }}
          </div>
        <slot
          name="preppendSelectItem"
          v-bind="{
            item,
            headerItem,
            parent,
            config,
            value: get(item, headerItem, 'value'),
            localItem,
          }"
        ></slot>
        </div>
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
