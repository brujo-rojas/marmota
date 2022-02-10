<template>
  <div
    class="t-row"
    :class="{
      'bg-edit': item.edit,
      large: item.isLarge,
      'bottom-fixed': footer,
    }"
  >
    <div class="t-col-group">
      <div
        class="t-col text-center"
        v-for="(navColumn, indexVar) in config.navRight.vars"
        :key="indexVar"
        :style="getItemStyle(navColumn)"
        v-show="navColumn.isShow ? navColumn.isShow(item) : true"
      >
        <span class="preppend-cell">
          <slot
            name="preppendCell"
            v-bind="{ item, navColumn, parent, config }"
          ></slot>
        </span>

        <v-btn
          small
          icon
          :disabled="isDisabled"
          v-if="navColumn.type == 'icon-button'"
          @click="navColumn.onClick({ item, parent, config, index, validateRowItem})"
          class="my-0 mx-auto pa-1"
          color="white"
        >
          <v-icon>
            {{ navColumn.icon }}
          </v-icon>
        </v-btn>

        <v-btn
          small
          text
          :disabled="isDisabled"
          v-if="navColumn.type == 'button'"
          @click="navColumn.onClick({ item, parent, config, index, validateRowItem})"
          class="ma-0 pa-1"
          color="white"
        >
          {{ navColumn.label }}
        </v-btn>

        <div
          v-if="navColumn.type == 'number'"
          class="d-flex flex-row align-center"
        >
          <div>
            {{ get(navColumn, 'value') ? get(navColumn, 'prefix') : '' }}
          </div>
          <input
            :disabled="isDisabledInput"
            :class="{ 'has-error': get(navColumn, 'hasError') }"
            type="number"
            class="wide"
            @change="changeInput(item, navColumn, $event.target.value)"
            :value="get(navColumn, 'value')"
          />
          <div>
            {{ get(navColumn, 'value') ? get(navColumn, 'suffix') : '' }}
          </div>
        </div>

        <div
          v-if="navColumn.type == 'text'"
          class="d-flex flex-row align-center"
        >
          <div>
            {{ get(navColumn, 'value') ? get(navColumn, 'prefix') : '' }}
          </div>
          <input
            :disabled="isDisabledInput"
            :class="{ 'has-error': get(navColumn, 'hasError') }"
            type="text"
            class="wide"
            @input="changeInput(item, navColumn, $event.target.value)"
            :value="get(navColumn, 'value')"
          />
          <div>
            {{ get(navColumn, 'value') ? get(navColumn, 'suffix') : '' }}
          </div>
        </div>

        <v-menu
          v-if="navColumn.type == 'date'"
          ref="menu"
          :value="get(navColumn, 'menu')"
          :disabled="!item.edit"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              text
              :ripple="item.edit"
              :disabled="isDisabledInput"
              :class="{ 'has-error': get(navColumn, 'hasError') }"
              v-on="on"
            >
              <span class="text-capitalize">
                {{ get(navColumn, 'value') ? get(navColumn, 'prefix') : '' }}
                {{ formatDate(get(navColumn, 'value')) }}
                {{ get(navColumn, 'value') ? get(navColumn, 'suffix') : '' }}
              </span>
            </v-btn>
          </template>
          <v-date-picker
            :value="get(navColumn, 'value')"
            @change="changeInput(item, navColumn, $event)"
            first-day-of-week="1"
            no-title
            scrollable
          >
          </v-date-picker>
        </v-menu>

        <span class="append-cell">
          <slot
            name="appendCell"
            v-bind="{ item, navColumn, parent, config }"
          ></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import _ from 'lodash';
import utils from "./../../utils/utils.js";

export default {
  name: 'MarmotaNavRow',
  props: {
    index: { type: Number, required: true, default: -1 },
    item: { type: Object, required: true },
    parent: { type: Object, default: null },
    config: { type: Object, required: true },
    footer: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    isDisabledInput() {
      return !this.item.edit || this.disabled
    },
    isDisabled() {
      return this.disabled
    },
  },
  methods: {
    validateRowItem: utils.validateRowItem,
    get: utils.get,
    set: utils.set,

    formatDate(date) {
      return dayjs(date).format('D MMM, YYYY')
    },
    changeInput(item, navColumn, newValue) {
      utils.set(navColumn, 'value', newValue)
      this.validateNavItem(item)
    },

    getItemStyle(headerItem) {
      let style = ''
      if (headerItem.width) {
        style += 'width:' + headerItem.width + 'px;'
        //style += "min-width:"+headerItem.width + "px;";
        style += 'flex: 0 0 ' + headerItem.width + 'px;'
      }
      return style
    },

    validateItems() {
      let hasErrors = false;
      this.config.data.forEach((item) => {
        if( utils.validateNavItem(item)){
          hasErrors = true;
        }
      })
      return hasErrors;
    },

  },
}
</script>

<style></style>
