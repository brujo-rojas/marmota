<template>
  <div class="corner" :class="{ right }">
    <template v-if="right">
      <div class="header-item-group">
        <div class="header-item-group-title" v-show="hasGroups">
          <div class="header-item-group-title-container">
            <v-tooltip content-class="v-tooltip--white-big elevation-10" top>
              <template v-slot:activator="{ on, attrs }">
                <span v-on="on" v-bind="attrs">
                  {{ config.navRight.label }}
                </span>
              </template>
              <span>
                {{ config.navRight.tooltip }}
              </span>
            </v-tooltip>
          </div>
        </div>
        <div class="header-item-container">
          <div
            v-show="hv.isShow ? hv.isShow({ edit: false }) : true"
            class="header-item"
            :class="[hv.background]"
            :style="getItemStyle(hv)"
            v-for="(hv, indexHv) in config.navRight.vars"
            :key="indexHv"
          >
            <span>
              {{ hv.label }}
            </span>
          </div>
        </div>
      </div>
    </template>

    <template v-if="!right">
      <div class="corner-item d-flex align-center">
        <v-checkbox
          class="ma-0 pa-0"
          color="white"
          v-if="isSelectable"
          dark
          v-model="isAllSelected"
          @change="changeSelectAllCheckbox()"
          hide-details
        ></v-checkbox>
        {{ config.corner[side].label }}
      </div>
    </template>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "MarmotaCorner",
  props: {
    disableSelection: { type: Boolean, default: false },
    config: { type: Object, default: null },
    right: { type: Boolean, default: false },
    hasGroups: { type: Boolean, default: false }
  },
  data() {
    return {
      isAllSelected: false
    };
  },
  computed: {
    side() {
      return this.right ? "right" : "left";
    },

    isSelectable() {
      return (
        !this.disableSelection &&
        this.config.isSelectable !== false &&
        this.config.corner[this.side].isAllSelectable !== false
      );
    }
  },
  watch: {
    config() {
      this.isAllSelected = false;
    }
  },
  methods: {
    changeSelectAllCheckbox() {
      this.config.data.forEach(item => {
        item.isSelected = this.isAllSelected;
      });
      this.$emit("changeSelection", {
        isAllSelected: this.isAllSelected,
        itemsSelected: _.filter(this.config.data, "isSelected")
      });
    },

    getItemStyle(headerItem) {
      let style = "";
      if (headerItem.width) {
        style += "width:" + headerItem.width + "px;";
        style += "min-width:" + headerItem.width + "px;";
        style += "flex: 0 0 " + headerItem.width + "px;";
      }
      return style;
    }
  }
};
</script>

<style></style>
