import dayjs from 'dayjs'
import _ from 'lodash'

export default {
  validateItem({ config, item }) {
    let isValidLabel = this.validateLabelItem({ config, item })
    let isValidRow = this.validateRowItem({ config, item })
    let isValidNav = this.validateNavItem({ config, item })

    item.hasError = isValidLabel || isValidRow || isValidNav

    setTimeout(() => {
      item.key++
    }, 1)

    return item.hasError
  },

  validateLabelItem({ config, item }) {
    let hasError = false
    if (config.nav && config.nav.requiredLabel && item.label.trim() == '') {
      hasError = true
    }

    if (hasError) {
      item.hasLabelError = true
    }

    return hasError
  },
  validateRowItem({ config, item }) {
    //TODO min, max
    let hasError = false
    config.header.forEach((header) => {
      header.vars.forEach((headerItem) => {
        if (this.validateRowHeaderItem({ config, item, headerItem })) {
          hasError = true
        }
      })
    })

    item.hasError = hasError
    return hasError
  },
  validateRowHeaderItem({ config, item, headerItem }) {
    let hasError = false

    if (headerItem.required && !item.vars[headerItem.varName].value) {
      hasError = true
    }

    if (headerItem.beforeTo) {
      let dateHeaderItem = dayjs(item.vars[headerItem.varName].value)
      let dateBeforeTo = dayjs(item.vars[headerItem.beforeTo].value)
      if (!dateHeaderItem.isBefore(dateBeforeTo, 'day')) {
        hasError = true
      }
    }

    if (headerItem.afterTo) {
      let dateHeaderItem = dayjs(item.vars[headerItem.varName].value)
      let dateAfterTo = dayjs(item.vars[headerItem.afterTo].value)
      if (!dateHeaderItem.isAfter(dateAfterTo, 'day')) {
        hasError = true
      }
    }
    this.set(item, headerItem, 'hasError', hasError)
    return hasError
  },

  validateNavItem({ config, item }) {
    //TODO min, max
    item.hasError = false
    if(config.navRight && config.navRight.vars){
      config.navRight.vars.forEach((navColumn) => {
        this.set(navColumn, 'hasError', false)

        if (navColumn.required && !item.vars[navColumn.varName].value) {
          item.hasError = true
          this.set(navColumn, 'hasError', true)
        }

        if (navColumn.beforeTo) {
          let dateNavItem = dayjs(item.vars[navColumn.varName].value)
          let dateBeforeTo = dayjs(item.vars[navColumn.beforeTo].value)
          if (!dateNavItem.isBefore(dateBeforeTo, 'day')) {
            item.hasError = true
            this.set(navColumn, 'hasError', true)
          }
        }

        if (navColumn.afterTo) {
          let dateNavItem = dayjs(item.vars[navColumn.varName].value)
          let dateAfterTo = dayjs(item.vars[navColumn.afterTo].value)
          if (!dateNavItem.isAfter(dateAfterTo, 'day')) {
            item.hasError = true
            this.set(navColumn, 'hasError', true)
          }
        }
      })
    }
    return item.hasError
  },

  get(item, headerItem, varName = 'value') {
    if (item.vars && headerItem.varName) {
      return _.get(item.vars, headerItem.varName + '.' + varName);
    }
    return null
  },

  set(item, headerItem, varName, newValue) {
    return _.set(item.vars, headerItem.varName + '.' + varName, newValue)
  },
}
