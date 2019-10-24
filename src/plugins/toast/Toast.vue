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
        <div v-for="item in toast" :key="item.id" class="toast" :class="item.type">
            <div class="toast-header">
                <i class="glyphicon" :class="item.classIcon" aria-hidden="true"></i>
                <strong class="mr-auto">{{header}}</strong>
                <button type="button" class="ml-2 close-toast" data-dismiss="toast" aria-label="Close" :data-id="item.id">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="toast-body">
                {{item.text}}
            </div>
        </div>
    </transition-group>
</template>

<script>
    export default {
        props: ["animationShow", "animationHidden", "header", "animationTime"],
        data() {
            return {
                toast: this.$toast.toasts
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

                for (let i = 0; i < this.toast.length; i++) {
                    if (+id === this.toast[i].id) {
                        this.toast.splice(i, 1);
                        break;
                    }
                }
            },
            _cancelAnimation(e) {
                let target = e.target;

                target = target.closest(".toast");

                if (!target) return;

                clearTimeout(this.timerAnimation);
            }
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