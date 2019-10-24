import Toast from "./Toast.vue"

export default {
    install(Vue, options) {
        Vue.component("app-toast", Toast);

        Vue.prototype.$toast = {
            toasts: [],

            success(value) {
                this.toasts.push({
                    classIcon: "glyphicon-ok",
                    text: value,
                    type: "success",
                    id: (new Date()).getTime()
                })
            },
            warning(value) {
                this.toasts.push({
                    classIcon: "glyphicon-alert",
                    text: value,
                    type: "warning",
                    id: (new Date()).getTime()
                })
            },
            error(value) {
                this.toasts.push({
                    classIcon: "glyphicon-remove",
                    text: value,
                    type: "error",
                    id: (new Date()).getTime()
                })
            },
            info(value) {
                this.toasts.push({
                    classIcon: "glyphicon-info-sign",
                    text: value,
                    type: "info",
                    id: (new Date()).getTime()
                })
            }
        }
    }
}