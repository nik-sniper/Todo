class Todo extends DragDrop {
    constructor(option){
        super();
        this._data = {
            counterAll: 0,
            textTask: [],
            arrId: [],
            objId: {},
            counterDone: 0,
            counterId: 0
        };

        this._container = option.container;
        this._idContainer = option.container.getAttribute("id");

        let dataTodo = JSON.parse(moduleCookie.get_cookie("dataTodo" + "-" + this._idContainer));

        if (dataTodo) {
            this.start(this._container, dataTodo);
            this._data = dataTodo;
        } else {
            this.start(this._container, this._data);
        }

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

    start(container, option) {
        container.innerHTML = moduleCreateTodo.createContainer(option);
    };

    addTask(e) {
        let input = this._container.querySelector(".todo-input");

        let activeElem = document.activeElement;
        if (input !== activeElem) return;

        let list = this._container.querySelector(".list");

        if (e.keyCode === 13) {
            this._data.textTask.push(input.value);

            this._data.counterId++;
            this._data.arrId.push(this._data.counterId);

            this._data.objId[this._data.counterId] = {
                checked: false
            };

            this._data.counterAll = this._data.textTask.length;
            this.countAll(this._data.counterAll);
            moduleCookie.cookie(this._idContainer,this._data);


            list.innerHTML += moduleCreateTodo.createTask(this._data.textTask[this._data.textTask.length - 1],this._data.counterId);


            input.value = "";
        }

    };

    removeTask(e) {
        let target = this._targetElement(e, ".close");

        if (!target) return;

        let task = target.closest(".task");
        let label = task.querySelector("label");

        for (let i = 0; i < this._data.textTask.length; i++) {
            if (label.innerHTML === this._data.textTask[i]) {
                delete this._data.objId[task.getAttribute("data-id")];
                this._data.textTask.splice(i,1);
                this._data.arrId.splice(i,1);
                break;
            }
        }

        this._data.counterAll = this._data.textTask.length;
        this.countAll(this._data.counterAll);
        if (task.closest(".made")) this.countDone(false);
        moduleCookie.cookie(this._idContainer,this._data);

        task.parentNode.removeChild(task);
    };

    toggleStatus(e) {
        let target = this._targetElement(e, "input[type=checkbox]");

        let task = target.closest(".task");

        if (target.checked) {
            this.countDone(true);
            this._data.objId[task.getAttribute("data-id")].checked = true;
            task.classList.add("made");
        } else {
            this.countDone(false);
            this._data.objId[task.getAttribute("data-id")].checked = false;
            task.classList.remove("made");
        }
        moduleCookie.cookie(this._idContainer,this._data);
    };

    countAll(counter) {
        let all = this._container.querySelector(".all .span-counter");

        all.innerHTML = counter;
    };

    countDone(boolean) {
        let done = this._container.querySelector(".done .span-counter");

        let counter = this._data.counterDone;

        if (boolean) {
            this._data.counterDone = counter + 1;
        } else {
            this._data.counterDone = counter - 1;
        }

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