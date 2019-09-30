<template>
    <div class="col text-center kabanStyle" v-html="link"></div>
</template>

<script>
    export default {
        data() {
            return {
                link: this.render()
            }
        },
        props: {
            textDescription: String,
            imageUrl: String,
            callback: Function
        },
        methods: {
            defaultRender() {
                return `
                    <img src="src/assets/img/Z6W8.gif">
                    <img src=${this.imageUrl}>
                    <p>${this.textDescription}</p>`
            },
            render() {
                return this.callback ? this.callback(this.imageUrl, this.textDescription) : this.defaultRender();
            }
        }
    }
</script>

<style scoped>

</style>