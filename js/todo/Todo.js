class Todo extends DragDrop {
    constructor(option){
        super();
        this._container = option.container;

        this._data = {
            counterAll: 0,
            counterDone: 0,
            counterId: 0,
            task: {}
        };

        this.toast = window.toast;

        this.cookie = new Cookie({
            name: "dataTodo-" + option.container.getAttribute("id"),
        });

        this._data = this.parseData();

        this.createTodo = new CreateTodo({
            container: "div",
            dataTodo: this._data
        });

        this._start(this._container);

        this._data.elementsTodo = {
            inputTodo: this._container.querySelector(".todo-input"),
            list: this._container.querySelector(".list"),
            spanCounterDone: this._container.querySelector(".done .span-counter"),
            spanCounterAll: this._container.querySelector(".all .span-counter")
        };

        let me = this;

        document.addEventListener("keydown", function (ev) {
            me.addTask(ev);
        });

        this._container.addEventListener("mouseover", function (ev) {
            me.mouseOver(ev);
        });

        this._container.addEventListener("mouseout", function (ev) {
            me.mouseOut(ev);
        });

        this._container.addEventListener("click", function (ev) {
            me.removeTask(ev);
        });

        this._container.addEventListener("mousedown", function (ev) {
            me.mouseDown(ev);
        });

        this._container.addEventListener("change", function (ev) {
            me.toggleStatus(ev);
        });

        document.addEventListener("mousemove", function (ev) {
            me.mouseMove(ev);
        });

        document.addEventListener("mouseup", function (ev) {
            me.mouseUp(ev);
        })
    }

    parseData() {
        let dataTodo = {};
        dataTodo.task = JSON.parse(this.cookie.get_cookie("task"));

        if (dataTodo.task === null) return this._data;

        dataTodo.counterId = JSON.parse(this.cookie.get_cookie("counterId"));
        dataTodo.counterAll = JSON.parse(this.cookie.get_cookie("counterAll"));
        dataTodo.counterDone = JSON.parse(this.cookie.get_cookie("counterDone")) || 0;

        return dataTodo;
    };

    _start(container) {
        container.innerHTML = this.createTodo.createContainer();
    };

    addTask(e) {
        let input = this._data.elementsTodo.inputTodo;

        let activeElem = document.activeElement;

        if (input !== activeElem) return;

        let list = this._data.elementsTodo.list;

        if (e.keyCode === 13) {
            this._data.counterId++;

            let objTask = {
                textTask: input.value,
                id: this._data.counterId,
                checked: false
            };

            this._data.task[this._data.counterId] = objTask;

            this._data.counterAll++;
            this.countAll(this._data.counterAll);

            this.cookie.set_cookie("counterId", this._data.counterId);
            this.cookie.set_cookie("task", this._data.task);

            list.innerHTML += this.createTodo.createTask(objTask.textTask, objTask.id);

            input.value = "";

            this.toast.success("Задача добавлена успешно!");
        }
    };

    removeTask(e) {
        let target = this._targetElement(e, ".close");

        if (!target) return;

        let task = target.closest(".task");

        let id = task.getAttribute("data-id");

        delete this._data.task[id];

        this._data.counterAll--;
        this.countAll(this._data.counterAll);
        if (task.closest(".made")) this.countDone(false);
        this.cookie.set_cookie("task", this._data.task);

        task.parentNode.removeChild(task);

        this.toast.success("Задача успешно удалена!");
    };

    toggleStatus(e) {
        let target = this._targetElement(e, "input[type=checkbox]");

        let task = target.closest(".task");

        if (target.checked) {
            this.countDone(true);
            this._data.task[task.getAttribute("data-id")].checked = true;
            task.classList.add("made");
        } else {
            this.countDone(false);
            this._data.task[task.getAttribute("data-id")].checked = false;
            task.classList.remove("made");
        }
        this.cookie.set_cookie("task", this._data.task);
    };

    countAll(counter) {
        let all = this._data.elementsTodo.spanCounterAll;

        this.cookie.set_cookie("counterAll", this._data.counterAll);

        all.innerHTML = counter;
    };

    countDone(boolean) {
        let done = this._data.elementsTodo.spanCounterDone;

        let counter = this._data.counterDone;

        if (boolean) {
            this._data.counterDone = counter + 1;
        } else {
            this._data.counterDone = counter - 1;
        }

        this.cookie.set_cookie("counterDone", this._data.counterDone);

        done.innerHTML = this._data.counterDone;
    };

    mouseOver(e) {
        let target = this._targetElement(e, ".task");

        if (!target) return;

        target.classList.add("hove");

        this.elemTarget = target;
    };

    mouseOut(e) {
        let target = this._targetElement(e, ".task");

        if (!target) return;

        if (target === this.elemTarget) {
            target.classList.remove("hove");
        }
    };

    _targetElement(e, selector) {
        let target = e.target;

        return target.closest(selector);
    };
}