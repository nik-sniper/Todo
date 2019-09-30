import "./assets/css/style.css"
import Vue from 'vue'
import App from './App.vue'
import Toast from "./assets/js/Toast"
import Todo from "./assets/js/Todo"

window.toast = new Vue(Toast);

new Vue(Todo).$mount("#appTodo");

new Vue({
  el: '#app',
  render: h => h(App)
});
