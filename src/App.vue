<template>
      <div class="row" id="componentKoban">
        <app-picture
                imageUrl="src/assets/img/3687E8IOexk.jpg"
                textDescription="уважаемой Евгении посвящается"
        >

        </app-picture>

        <app-picture
                imageUrl="src/assets/img/KvDTLVW1n6s.jpg"
                textDescription="уважаемому Кабану посвящается"
                :callback="function(imgUrl, textImg) {
                  return `<img src='src/assets/img/Z6W8.gif'>
                            <img src=${imgUrl}>
                            <p>${textImg}</p>`
                }"
        >

        </app-picture>
      </div>
</template>

<script>
import Picture from "./components/Picture.vue"

export default {
  components: {
      appPicture: Picture
  }
}
</script>

<style>

</style>
