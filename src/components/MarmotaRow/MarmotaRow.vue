<template>
  <div
    class="t-row"
    :class="{
      'bg-edit': item.edit && !isDisabled,
      'has-error': item.hasError, 
      large: item.isLarge,
    }"
  >
    <div
      class="t-col-group"
      v-for="(hg, indexHg) in config.header"
      :key="indexHg"
    >
      <div
        class="t-col"
        :style="getItemStyle(headerItem)"
        v-for="(headerItem, indexHv) in hg.vars"
        :key="indexHv"
        :class="[headerItem.background, getClassItem(item, headerItem)]"
      >
        <span class="preppend-cell">
          <slot
            name="preppendCell"
            v-bind="{ item, headerItem, parent, config }"
          ></slot>
        </span>

        <!-- BUTTON -->
        <div
          v-if="headerItem.type == 'button'"
          class="justify-center d-flex flex-grow-1"
        >
          <v-btn
            small
            outlined
            :disabled="isDisabled || item.isLoading || (headerItem.enabler && !headerItem.enabler({item, config}))"
            @click="headerItem.onClick({ item, parent, config })"
            class="ma-0 pa-1"
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

        <!-- NUMBER -->
        <div
          v-if="headerItem.type == 'number'"
          class="d-flex flex-row align-center flex-grow-1"
        >
          <div>
            {{
              get(item, headerItem, 'value') != null
                ? get(item, headerItem, 'prefix')
                : ''
            }}
          </div>
          <input
            :key="item.key"
            :disabled="!isEditable(headerItem)"
            :readonly="item.isLoading"
            :class="{ 'has-error': get(item, headerItem, 'hasError') }"
            type="number"
            class="wide"
            @change="changeInput(item, headerItem, $event.target.value)"
            @focus="$event.target.select()"
            :value="get(item, headerItem, 'value')"
          />
          <div>
            {{
              get(item, headerItem, 'value') != null
                ? get(item, headerItem, 'suffix')
                : ''
            }}
          </div>
        </div>

        <div
          class="flex-grow-1 justify-center d-flex"
          v-if="headerItem.type == 'checkbox'"
        >
          <v-simple-checkbox
            :color="headerItem.color || 'accent'"
            :key="item.key"
            :disabled="item.isLoading || !isEditable(headerItem)"
            :value="get(item, headerItem, 'value')"
            @input="changeInput(item, headerItem, $event)"
            hide-details
          ></v-simple-checkbox>
        </div>

        <!-- TEXT -->
        <div
          v-if="headerItem.type == 'text'"
          class="d-flex flex-row align-center flex-grow-1"
        >
          <div>
            {{
              get(item, headerItem, 'value') != null
                ? get(item, headerItem, 'prefix')
                : ''
            }}
          </div>
          <input
            :key="item.key"
            :disabled="!isEditable(headerItem)"
            :readonly="item.isLoading"
            :class="{ 'has-error': get(item, headerItem, 'hasError') }"
            type="text"
            class="wide"
            @change="changeInput(item, headerItem, $event.target.value)"
            @focus="$event.target.select()"
            :value="get(item, headerItem, 'value')"
          />
          <div>
            {{
              get(item, headerItem, 'value') != null
                ? get(item, headerItem, 'suffix')
                : ''
            }}
          </div>
        </div>

        <!-- DATE -->
        <v-menu
          v-if="headerItem.type == 'date'"
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
              outlined
              :ripple="item.edit"
              :class="{ 'has-error': get(item, headerItem, 'hasError') }"
              v-on="on"
            >
              <span class="text-capitalize">
                {{
                  get(item, headerItem, 'value') != null
                    ? get(item, headerItem, 'prefix')
                    : ''
                }}
                {{ formatDate(get(item, headerItem, 'value')) }}
                {{
                  get(item, headerItem, 'value') != null
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
            no-title
            scrollable
          >
          </v-date-picker>
        </v-menu>

        <div
          v-if="headerItem.type == 'select' && headerItem.itemsSelect"
          class="flex flex-grow-1 py-1"
          >
        <v-select
          :key="item.key"
          :items="headerItem.itemsSelect"
          :disabled="!isEditable(headerItem) || item.isLoading"
          :class="{ 'has-error': get(item, headerItem, 'hasError') }"
          @change="changeInput(item, headerItem, $event)"
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

        <span class="append-cell">
          <slot
            name="appendCell"
            v-bind="{ item, headerItem, parent, config }"
          ></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import _ from 'lodash'
import utils from './../../utils/utils.js'
import MarmotaEventBus from './../Marmota/MarmotaEventBus'

export default {
  name: 'MarmotaRow',
  props: {
    index: { type: Number, default: -1 },
    item: { type: Object, default: null },
    parent: { type: Object, default: null },
    config: { type: Object, default: null },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    isDisabled() {
      return this.disabled
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    get: utils.get,
    set: utils.set,

    formatDate(date) {
      return dayjs(date).format('D MMM, YYYY')
    },

    changeInput(item, headerItem, newValue) {
      utils.set(item, headerItem, 'value', newValue)
      MarmotaEventBus.$emit('change', {
        item,
        headerItem,
        newValue,
        parent: this.parent,
        index: this.index,
      })
      item.hasError = utils.validateRowItem({ config: this.config, item })
    },

    isEditable(headerItem) {
      return (
        !this.isDisabled &&
        headerItem.editable !== false &&
        this.item.editable !== false &&
        (this.item.edit || headerItem.editable)
      )
    },

    getItemStyle(headerItem) {
      let style = ''
      if (headerItem.width) {
        style = `width: ${headerItem.width}px;
                  flex:  0 0 ${headerItem.width}px`
      }
      if (
        this.isMobile &&
        headerItem.responsive &&
        headerItem.responsive.width
      ) {
        style = `width: ${headerItem.responsive.width}px;
                  flex:  0 0 ${headerItem.responsive.width}px`
      }
      return style
    },

    getClassItem(item, headerItem) {
      let num = utils.get(item, headerItem, 'value')
      let className = ''
      if (this.config.classNameIfZero && parseFloat(num) === 0) {
        className += this.config.classNameIfZero + ' '
      }
      if(headerItem.className){
        className += " " + headerItem.className;
      }
      return className
    },

    getClassInput(item, headerItem) {
      return { 'has-error': utils.get(item, headerItem, 'hasError') }
    },
  },
}
</script>
