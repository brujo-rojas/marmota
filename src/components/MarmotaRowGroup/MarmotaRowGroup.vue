<template>
  <div class="t-row-group" :class="{ 'is-inset': inset, 't-row-zebra': hasZebra && !inset }">
    <marmota-row
      v-if="item && !item.insetChildren"
      :item="item"
      :index="index"
      :parent="parent"
      :disabled="disabled"
      :config="config"
    >
      <template v-slot:preppendCell="props">
        <slot name="preppendCell" v-bind="props"></slot>
      </template>

      <template v-slot:appendCell="props">
        <slot name="appendCell" v-bind="props"></slot>
      </template>
    </marmota-row>

    <template v-if="item && item.insetChildren">
      <marmota-row-group
        inset
        :config="config"
        :disabled="disabled"
        v-for="(child, index) in item.insetChildren"
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
      </marmota-row-group>
    </template>

    <template v-if="item && item.showChildren && item.children">
      <marmota-row-group
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
      </marmota-row-group>
    </template>
  </div>
</template>

<script>
import MarmotaRow from './../MarmotaRow/MarmotaRow'

export default {
  name: 'MarmotaRowGroup',
  props: {
    index: { type: Number, default: -1 },
    item: { type: Object, default: null, required: true },
    parent: { type: Object, default: null },
    config: { type: Object, default: null, required: true },
    inset: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    hasZebra: { type: Boolean, default: false},
  },
  components: {
    MarmotaRow,
  },
}
</script>
