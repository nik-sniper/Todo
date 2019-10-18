<template>
    <transition-group
            tag="div"
            class="containerToast"
            :class='positionClass'
            :duration="animationTime"
            :enter-active-class="animatedClassShow"
            :leave-to-class="animatedClassHidden"
            @after-enter="afterEnter"
    >
        <component v-for="(item, i) in toast" :key="item.id" :header="header" :is="item.type" :id="i">
            {{item.text}}
        </component>
    </transition-group>
</template>

<script>
    import {bus} from "../../main"
    import ToastError from "./Error"
    import ToastSuccess from "./Success"
    import ToastInfo from "./Info"
    import ToastWarning from "./Warning"


    export default {
        props: ["animationShow", "animationHidden", "header", "animationTime"],
        data() {
            return {
                toast: bus.toast
            }
        },
        computed: {
            positionClass() {
                if (this.position) {
                    let nameClass = this.position;
                    return {
                        nameClass: true
                    }
                } else {
                    return {
                        rightTop: true
                    }
                }
            },
            animatedClassShow() {
                return `animated ${this.animationShow}`
            },
            animatedClassHidden() {
                return `animated ${this.animationHidden}`
            }
        },
        methods: {
            afterEnter() {
                this.timerAnimation = setTimeout(() => {
                    this.toast.shift();
                }, 1000);
            },
            close(e) {
                let target = e.target;

                target = target.closest(".close-toast");

                if (!target) return;

                let id = target.getAttribute("data-id");

                this.toast.splice(+id, 1);
            },
            _cancelAnimation(e) {
                let target = e.target;

                target = target.closest(".toast");

                if (!target) return;

                clearTimeout(this.timerAnimation);
            }
        },
        components: {
            warning: ToastWarning,
            error: ToastError,
            info: ToastInfo,
            success: ToastSuccess
        },
        beforeMount() {
            document.addEventListener("click", (e) => {
                this._cancelAnimation(e);
                this.close(e);
            })
        }
    }
</script>

<style scoped>

</style>