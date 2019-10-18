import "./assets/css/style.css"
import Vue from 'vue'
import App from './App.vue'
import Toast from "./components/toast/Toast"

export const bus = new Vue({
    data: {
      toast: []
    }
});

Vue.component("app-toast", Toast);

new Vue({
  el: '#app',
  render: h => h(App)
});