import dayjs from 'dayjs';
import _ from 'lodash';

export default {
  
    validateRowItem(item) {
      //TODO min, max
      console.log("validateItem");
      item.hasError = false
      this.config.header.forEach((header) => {
        header.vars.forEach((headerItem) => {
          this.set(item, headerItem, 'hasError', false)

          if (headerItem.required && !item.vars[headerItem.varName].value) {
            item.hasError = true
            this.set(item, headerItem, 'hasError', true)
          }

          if (headerItem.beforeTo) {
            let dateHeaderItem = dayjs(item.vars[headerItem.varName].value)
            let dateBeforeTo = dayjs(item.vars[headerItem.beforeTo].value)
            if (!dateHeaderItem.isBefore(dateBeforeTo, 'day')) {
              item.hasError = true
              this.set(item, headerItem, 'hasError', true)
            }
          }

          if (headerItem.afterTo) {
            let dateHeaderItem = dayjs(item.vars[headerItem.varName].value)
            let dateAfterTo = dayjs(item.vars[headerItem.afterTo].value)
            if (!dateHeaderItem.isAfter(dateAfterTo, 'day')) {
              item.hasError = true
              this.set(item, headerItem, 'hasError', true)
            }
          }
        })
      })
      item.key+=1;
      return item.hasError
    },
    validateNavItem(item) {
      //TODO min, max
      //TODO TESTING-- navRight debe ser un atributo configurable
      item.hasError = false
      this.config.navRight.vars.forEach((navColumn) => {
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
      item.key+=1;
      return item.hasError
    },

    get(item, headerItem, varName = 'value') {
      if (item.vars && headerItem.varName) {
        return _.get(item.vars, headerItem.varName + '.' + varName)
      }
      return null
    },

    set(item, headerItem, varName, newValue) {
      return _.set(item.vars, headerItem.varName + '.' + varName, newValue)
    },


}
