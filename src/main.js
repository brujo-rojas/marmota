import * as components from './components'

const Marmota = {
  install(Vue) {
    // components
    for (const componentName in components) {
      const component = components[componentName]
      console.log('Marmota register component: ', component.name)
      Vue.component(component.name, component)
    }
  },
}

export default Marmota

if (typeof window !== 'undefined' && window.Vue) {
  console.log("resgister global");
  window.Vue.use(Marmota)
}
