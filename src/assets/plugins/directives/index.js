
import Vue from 'vue'

// custom directives
import VToggle from './v-toggle.js'
import VMySelect from './v-my-select.js'

Vue.directive('toggle', VToggle)
Vue.directive('my-select', VMySelect)

