<template>
  <div class="t-row-group">
    <marmota-nav-row
      :item="item"
      :index="index"
      :disabled="disabled"
      :parent="parent"
      :config="config"
    >
      <template v-slot:preppendCell="props">
        <slot name="preppendCell" v-bind="props"></slot>
      </template>

      <template v-slot:appendCell="props">
        <slot name="appendCell" v-bind="props"></slot>
      </template>
    </marmota-nav-row>

    <template v-if="item.showChildren && item.children">
      <marmota-nav-row-group
        :config="config"
        :disabled="disabled"
        v-for="(child, index) in item.children"
        v-show="!child.isHidden"
        :key="index"
        :index="index"
        :parent="item"
        :item="child"
      >
        <template v-slot:preppendCell="props">
          <slot name="preppendCell" v-bind="props"></slot>
        </template>

        <template v-slot:appendCell="props">
          <slot name="appendCell" v-bind="props"></slot>
        </template>
      </marmota-nav-row-group>
    </template>
  </div>
</template>

<script>
import MarmotaNavRow from './../MarmotaNavRow/MarmotaNavRow'

export default {
  name: 'MarmotaNavRowGroup',

  props: {
    index: { type: Number, required: true, default: -1 },
    item: { type: Object, required: true },
    parent: { type: Object, default: null },
    config: { type: Object, required: true },
    disabled: { type: Boolean, default: false },
  },

  components: {
    MarmotaNavRow,
  },
}
</script>
