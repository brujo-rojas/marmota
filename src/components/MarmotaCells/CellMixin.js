import utils from './../../utils/utils.js'
import dayjs from 'dayjs'
import MarmotaEventBus from './../Marmota/MarmotaEventBus'

export default {
  props: {
    headerItem: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    parent: {
      type: Object,
      required: false,
    },
    config: {
      type: Object,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    get: utils.get,

    isEditable(headerItem) {
      return (
        !this.isDisabled &&
        headerItem.editable !== false &&
        this.item.editable !== false &&
        (this.item.edit || headerItem.editable)
      )
    },

    formatDate(date) {
      return dayjs(date).format('D MMM, YYYY')
    },

    changeInput(item, headerItem, newValue) {
      utils.set(item, headerItem, 'value', newValue)
      let eventParams = {
        item,
        headerItem,
        newValue,
        parent: this.parent,
        index: this.index,
      }
      MarmotaEventBus.$emit('change', eventParams)
      if (headerItem.onChange) {
        headerItem.onChange(eventParams)
      }
      item.hasError = utils.validateRowItem({ config: this.config, item })
    },
  },
}
