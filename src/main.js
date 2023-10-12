import * as components from './components'

const Marmota = {
  install(Vue) {
    // components
    for (const componentName in components) {
      const component = components[componentName]
      Vue.component(component.name, component)
    }
  },
}

export default Marmota

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Marmota)
}
