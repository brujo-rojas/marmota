<template>
  <div
    class="t-row"
    :class="{
      'bg-edit': item.edit && !isDisabled,
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

        <v-btn
          small
          text
          :disabled="isDisabled"
          v-if="headerItem.type == 'button'"
          @click="headerItem.onClick({ item, parent, config })"
          class="ma-0 pa-1"
        >
          {{ headerItem.label }}
        </v-btn>

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
            :disabled="!isEditable(headerItem)"
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
            :disabled="!isEditable(headerItem)"
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

        <v-menu
          v-if="headerItem.type == 'date'"
          ref="menu"
          :value="get(item, headerItem, 'menu')"
          :disabled="!isEditable(headerItem)"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              text
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
    formatDate(date) {
      return dayjs(date).format('D MMM, YYYY')
    },

    changeInput(item, headerItem, newValue) {
      this.set(item, headerItem, 'value', newValue)
      MarmotaEventBus.$emit('change', {
        item,
        headerItem,
        newValue,
        parent: this.parent,
        index: this.index,
      })
      this.validateItem(item)
    },

    validateItems() {
      this.config.data.forEach((item) => {
        this.validateItem(item)
      })
    },

    isEditable(headerItem) {
      return (
        !this.isDisabled &&
        headerItem.editable !== false &&
        this.item.editable !== false &&
        (this.item.edit || headerItem.editable)
      )
    },

    get(item, headerItem, varName = 'value') {
      if (item.vars && headerItem.varName) {
        return _.get(item.vars, headerItem.varName + '.' + varName)
      }
      return null
    },

    set(item, headerItem, varName, newValue) {
      // get var from item
      return _.set(item.vars, headerItem.varName + '.' + varName, newValue)
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
      let num = this.get(item, headerItem, 'value')
      let className = ''
      if (this.config.classNameIfZero && parseFloat(num) === 0) {
        className += this.config.classNameIfZero + ' '
      }
      return className
    },

    validateItem(item) {
      //TODO min, max
      item.hasError = false
      this.config.header.forEach((header) => {
        header.vars.forEach((headerItem) => {
          this.set(this.item, headerItem, 'hasError', false)

          if (headerItem.required && !item.vars[headerItem.varName].value) {
            item.hasError = true
            this.set(this.item, headerItem, 'hasError', true)
          }

          if (headerItem.beforeTo) {
            let dateHeaderItem = dayjs(item.vars[headerItem.varName].value)
            let dateBeforeTo = dayjs(item.vars[headerItem.beforeTo].value)
            if (!dateHeaderItem.isBefore(dateBeforeTo, 'day')) {
              item.hasError = true
              this.set(this.item, headerItem, 'hasError', true)
            }
          }

          if (headerItem.afterTo) {
            let dateHeaderItem = dayjs(item.vars[headerItem.varName].value)
            let dateAfterTo = dayjs(item.vars[headerItem.afterTo].value)
            if (!dateHeaderItem.isAfter(dateAfterTo, 'day')) {
              item.hasError = true
              this.set(this.item, headerItem, 'hasError', true)
            }
          }
        })
      })
      return item.hasError
    },
  },
}
</script>
