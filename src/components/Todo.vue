<template>
    <todo-container
            :data="optionsTodo"
            ref="container"
    >

    </todo-container>
</template>

<script>
    import Vue from "vue"
    import TodoContainer from "./createTodo/todoContainer"
    import Cookie from "./Cookie"
    import DragDrop from "./DragDrop"
    import {bus} from "../main"

    export default {
        props: ["id"],
        data() {
            return {
                optionsTodo: {
                    counterAll: 0,
                    counterDone: 0,
                    counterId: 0,
                    task: []
                },
                elementsTodo: {

                }
            }
        },
        methods: {
            parseData() {
                let dataTodo = {};
                dataTodo.task = JSON.parse(this.cookie.get_cookie("task"));

                if (dataTodo.task === null) return this.optionsTodo;

                dataTodo.counterId = JSON.parse(this.cookie.get_cookie("counterId"));
                dataTodo.counterAll = JSON.parse(this.cookie.get_cookie("counterAll"));
                dataTodo.counterDone = JSON.parse(this.cookie.get_cookie("counterDone")) || 0;

                return dataTodo;
            },
            addTask(e) {
                let input = this.elementsTodo.inputTodo;

                let activeElem = document.activeElement;

                if (input !== activeElem) return;

                if (e.keyCode === 13) {
                    this.optionsTodo.counterId++;

                    let objTask = {
                        textTask: input.value,
                        idTask: this.optionsTodo.counterId,
                        checked: false
                    };

                    this.optionsTodo.task.push(objTask);

                    this.optionsTodo.counterAll++;
                    this.countAll(this.optionsTodo.counterAll);

                    this.cookie.set_cookie("counterId", this.optionsTodo.counterId);
                    this.cookie.set_cookie("task", this.optionsTodo.task);

                    input.value = "";

                    bus.toast.push({
                        text: "Задача добавлена успешно!",
                        type: "success",
                        id: this.optionsTodo.counterId,
                        header: "TodoList"
                    });
                }
            },
            removeTask(e) {
                let target = this._targetElement(e, ".close");

                if (!target) return;

                let task = target.closest(".task");

                let id = task.getAttribute("data-id");

                for (let i = 0; i < this.optionsTodo.task.length; i++) {
                    if (+id === this.optionsTodo.task[i].idTask) {
                        this.optionsTodo.task.splice(i, 1);
                        break;
                    }
                }

                this.optionsTodo.counterAll--;
                this.countAll();
                if (task.closest(".made")) this.countDone(false);
                this.cookie.set_cookie("task", this.optionsTodo.task);

                bus.toast.push({
                    name: "success",
                    text: "Задача удалена успешно!",
                    id: this.optionsTodo.counterId++,
                    type: "success",
                    header: "TodoList"
                });
            },
            toggleStatus(e) {
                let target = this._targetElement(e, "input[type=checkbox]");

                let task = target.closest(".task");
                let id = task.getAttribute("data-id");

                for (let i = 0; i < this.optionsTodo.task.length; i++) {
                    if (+id !== this.optionsTodo.task[i].idTask) continue;

                    if (target.checked) {
                        this.countDone(true);
                        this.optionsTodo.task[i].checked = true;
                    } else {
                        this.countDone(false);
                        this.optionsTodo.task[i].checked = false;
                    }
                }

                this.cookie.set_cookie("task", this.optionsTodo.task);
            },
            countAll() {
                this.cookie.set_cookie("counterAll", this.optionsTodo.counterAll);
            },
            countDone(boolean) {

                let counter = this.optionsTodo.counterDone;

                if (boolean) {
                    this.optionsTodo.counterDone = counter + 1;
                } else {
                    this.optionsTodo.counterDone = counter - 1;
                }

                this.cookie.set_cookie("counterDone", this.optionsTodo.counterDone);
            },
            mouseOver(e) {
                let target = this._targetElement(e, ".task");

                if (!target) return;

                target.classList.add("hove");

                this.elemTarget = target;
            },
            mouseOut(e) {
                let target = this._targetElement(e, ".task");

                if (!target) return;

                if (target === this.elemTarget) {
                    target.classList.remove("hove");
                }
            },
            _targetElement(e, selector) {
                let target = e.target;

                return target.closest(selector);
            }
        },
        mixins: [DragDrop],
        components: {
            todoContainer: TodoContainer
        },
        beforeMount() {
            this.cookie = new Vue(Cookie);
            this.cookie.cookieName = this.id;

            this.optionsTodo = this.parseData();
        },
        mounted() {
            this.elementsTodo = {
                container: this.$refs.container.$el,
                inputTodo: this.$refs.container.$refs.inputTodo.$el,
                spanCounterDone: this.$refs.container.$refs.counterDone,
                spanCounterAll: this.$refs.container.$refs.counterDone
            };

            document.addEventListener("keydown", (ev) => {
                this.addTask(ev);
            });

            this.elementsTodo.container.addEventListener("mouseover", (ev) => {
                this.mouseOver(ev);
            });

            this.elementsTodo.container.addEventListener("mouseout", (ev) => {
                this.mouseOut(ev);
            });

            this.elementsTodo.container.addEventListener("click", (ev) => {
                this.removeTask(ev);
            });

            this.elementsTodo.container.addEventListener("change", (ev) => {
                this.toggleStatus(ev);
            });

            document.addEventListener("mousemove", (ev) => {
                this.mouseMove(ev);
            });

            document.addEventListener("mouseup", (ev) => {
                this.mouseUp(ev);
            });

            this.elementsTodo.container.addEventListener("mousedown", (ev) => {
                this.mouseDown(ev);
            });
        }
    }
</script>

<style scoped>

</style>