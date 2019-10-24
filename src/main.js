import "./assets/css/style.css"
import Vue from 'vue'
import App from './App.vue'
import Toast from "./plugins/toast"
import Cookie from "./plugins/Cookie"

Vue.use(Cookie);
Vue.use(Toast);

new Vue({
  el: '#app',
  render: h => h(App)
});