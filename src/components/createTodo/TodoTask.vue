<template>
    <li class="task" :class="{'made': checked}" :data-id="id">
    <div class="view">
        <img src="src/assets/img/icons8-drag-reorder-50.png" alt="перенести" class="drag">
        <input type="checkbox" :checked="checked">
        <label>
            <slot>

            </slot>
        </label>
        <button class="close"></button>
    </div>
    </li>
</template>

<script>
    export default {
        props: ["checked","id"]
    }
</script>

<style scoped>

</style>