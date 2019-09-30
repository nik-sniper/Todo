export default {
    methods: {
        createContainer() {
            return `<div class="todo container">
                        <div class="row">
                        ${this.createInputField()}
                    </div>
                    <div class="row">
                        <div class="col-6 text-center all">
                            Всего задач:
                            <span class="span-counter">${this.data.counterAll}</span>
                        </div>
                        <div class="col-6 text-center done">
                            Выполнено задач:
                            <span class="span-counter">${this.data.counterDone}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col todo-task">
                            ${this.createList(this.data.task)}
                        </div>
                    </div>
                    </div>`;
        },
        createList(task) {
            let me = this;

            return `
                <ul class="col-lg-6 col-8 mx-auto list">
                    ${
                (function () {
                    let arrTask = [];

                    for (let key in task) {
                        let tasks = me.createTask(task[key].textTask, task[key].id, task[key].checked);

                        arrTask.push(tasks);
                    }
                    return arrTask.join("");
                }())
                }
                </ul>
                 `;
        },
        createTask(text, id, checked) {
            return `<li class="task${checked ? " made": ""}" data-id="${id}">
                        <div class="view">
                            <img src="src/assets/img/icons8-drag-reorder-50.png" alt="перенести" class="drag">
                            <input type="checkbox" ${checked ? "checked" : ""}>
                            <label for="">${text}</label>
                            <button class="close"></button>
                        </div>
                    </li>`;
        },
        createInputField() {
            return  `<input class="form-control todo-input" placeholder="Введите элемент списка задач" value="">`;
        }
    }
}