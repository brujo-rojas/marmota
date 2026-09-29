import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import Marmota from './main.js'
import App from './App.vue'

Vue.use(Vuetify)
Vue.use(Marmota)

new Vue({
  vuetify: new Vuetify({
    theme: {
      dark: false,
    },
    icons: {
      iconfont: 'mdi',
    },
  }),
  render: (h) => h(App),
}).$mount('#app')

