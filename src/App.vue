<template>
    <div id="hero">
        <div class="container">
            <div class="row" id="componentKoban">
                <app-picture
                        imageUrl="src/assets/img/3687E8IOexk.jpg"
                        textDescription="уважаемой Евгении посвящается"
                >

                </app-picture>

                <app-picture
                        :callback="templatePicture"
                >

                </app-picture>
            </div>
            <h1 class="display-2 text-center">TodoList</h1>

            <todo-list
                    :id="'todo1'"
            >

            </todo-list>

            <app-toast
                    animationShow="fadeInDown"
                    animationHidden="fadeOut"
                    header="TodoList"
                    animationTime="1000"

            >

            </app-toast>
        </div>
    </div>
</template>

<script>
import Picture from "./components/Picture.vue"
import Todo from "./components/Todo"

export default {
  methods: {
      templatePicture() {
          return `<img src='src/assets/img/Z6W8.gif'>
                  <img src='src/assets/img/KvDTLVW1n6s.jpg'>
                  <p>уважаемому Кабану посвящается</p>`
      }
  },

  components: {
      appPicture: Picture,
      todoList: Todo
  }
}
</script>

<style>

</style>
