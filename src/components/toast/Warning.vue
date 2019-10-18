<template>
    <div class="toast warning">
        <div class="toast-header">
            <i class="glyphicon glyphicon-alert" aria-hidden="true"></i>
            <strong class="mr-auto">{{header}}</strong>
            <button type="button" class="ml-2 close-toast" data-dismiss="toast" aria-label="Close" :data-id="id">
                <span aria-hidden="true">×</span>
            </button>
        </div>
        <div class="toast-body">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["header", "id"]
    }
</script>

<style scoped>

</style>