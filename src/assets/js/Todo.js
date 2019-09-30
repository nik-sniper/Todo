import Vue from 'vue'
import CreateTodo from "./CreateTodo"
import DragDrop from "./DragDrop"
import Cookie from "./Cookie"

export default {
    data: {
        optionsTodo: {
            counterAll: 0,
            counterDone: 0,
            counterId: 0,
            task: {}
        },
        elementsTodo: {}
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
        _start() {
            return this.createTodo.createContainer();
        },
        addTask(e) {
            let input = this.elementsTodo.inputTodo;

            let activeElem = document.activeElement;

            if (input !== activeElem) return;

            let list = this.elementsTodo.list;

            if (e.keyCode === 13) {
                this.optionsTodo.counterId++;

                let objTask = {
                    textTask: input.value,
                    id: this.optionsTodo.counterId,
                    checked: false
                };

                this.optionsTodo.task[this.optionsTodo.counterId] = objTask;

                this.optionsTodo.counterAll++;
                this.countAll(this.optionsTodo.counterAll);

                this.cookie.set_cookie("counterId", this.optionsTodo.counterId);
                this.cookie.set_cookie("task", this.optionsTodo.task);

                list.innerHTML += this.createTodo.createTask(objTask.textTask, objTask.id);

                input.value = "";

                window.toast.success("Задача добавлена успешно!");
            }
        },
        removeTask(e) {
            let target = this._targetElement(e, ".close");

            if (!target) return;

            let task = target.closest(".task");

            let id = task.getAttribute("data-id");

            delete this.optionsTodo.task[id];

            this.optionsTodo.counterAll--;
            this.countAll(this.optionsTodo.counterAll);
            if (task.closest(".made")) this.countDone(false);
            this.cookie.set_cookie("task", this.optionsTodo.task);

            task.parentNode.removeChild(task);

            window.toast.success("Задача успешно удалена!");
        },
        toggleStatus(e) {
            let target = this._targetElement(e, "input[type=checkbox]");

            let task = target.closest(".task");

            if (target.checked) {
                this.countDone(true);
                this.optionsTodo.task[task.getAttribute("data-id")].checked = true;
                task.classList.add("made");
            } else {
                this.countDone(false);
                this.optionsTodo.task[task.getAttribute("data-id")].checked = false;
                task.classList.remove("made");
            }
            this.cookie.set_cookie("task", this.optionsTodo.task);
        },
        countAll(counter) {
            let all = this.elementsTodo.spanCounterAll;

            this.cookie.set_cookie("counterAll", this.optionsTodo.counterAll);

            all.innerHTML = counter;
        },
        countDone(boolean) {
            let done = this.elementsTodo.spanCounterDone;

            let counter = this.optionsTodo.counterDone;

            if (boolean) {
                this.optionsTodo.counterDone = counter + 1;
            } else {
                this.optionsTodo.counterDone = counter - 1;
            }

            this.cookie.set_cookie("counterDone", this.optionsTodo.counterDone);

            done.innerHTML = this.optionsTodo.counterDone;
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
    template: "<div v-html='htmlTodo'></div>",
    beforeMount() {
        this.cookie = new Vue(Cookie);
        this.cookie.cookieName = this.$el.getAttribute("id");

        this.optionsTodo = this.parseData();

        this.createTodo = new Vue(CreateTodo);
        this.createTodo.data = this.optionsTodo;

        this.htmlTodo = this._start();
    },
    mounted() {
        this._data.elementsTodo = {
            inputTodo: this.$el.querySelector(".todo-input"),
            list: this.$el.querySelector(".list"),
            spanCounterDone: this.$el.querySelector(".done .span-counter"),
            spanCounterAll: this.$el.querySelector(".all .span-counter")
        };

        document.addEventListener("keydown", (ev) => {
            this.addTask(ev);
        });

        this.$el.addEventListener("mouseover", (ev) => {
            this.mouseOver(ev);
        });

        this.$el.addEventListener("mouseout", (ev) => {
            this.mouseOut(ev);
        });

        this.$el.addEventListener("click", (ev) => {
            this.removeTask(ev);
        });

        this.$el.addEventListener("change", (ev) => {
            this.toggleStatus(ev);
        });

        document.addEventListener("mousemove", (ev) => {
            this.mouseMove(ev);
        });

        document.addEventListener("mouseup", (ev) => {
            this.mouseUp(ev);
        });

        this.$el.addEventListener("mousedown", (ev) => {
            this.mouseDown(ev);
        });
    }
}