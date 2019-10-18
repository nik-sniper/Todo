<template>
        <div class="col text-center kabanStyle" v-if="!callback">
            <img src="src/assets/img/Z6W8.gif">
            <img :src="imageUrl">
            <p>{{textDescription}}</p>
        </div>
        <div class="col text-center kabanStyle" v-else v-html="link"></div>
</template>

<script>
    export default {
        data() {
            return {
                link: this.callback ? this.callback() : ""
            }
        },
        props: {
            textDescription: String,
            imageUrl: String,
            callback: Function
        }
    }
</script>

<style scoped>

</style>