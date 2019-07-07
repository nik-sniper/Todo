var moduleCreateTodo = (function () {
    function CreateTodo(options) {
        this.createContainer = function (dataTodo) {

            return `<${options.container} class="todo container">
                        <div class="row">
                        ${this.createInputField()}
                    </div>
                    <div class="row">
                        <div class="col-6 text-center all">
                            Всего задач:
                            <span class="span-counter">${dataTodo.counterAll}</span>
                        </div>
                        <div class="col-6 text-center done">
                            Выполнено задач:
                            <span class="span-counter">${dataTodo.counterDone}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col todo-task">
                            ${this.createList(dataTodo.textTask, dataTodo.arrId, dataTodo.objId)}
                        </div>
                    </div>
                    </${options.container}>`;
        };


        this.createList = function (textTask, arrId, objId) {
            var me = this;

            return `
                <ul class="col-lg-6 col-8 mx-auto list">
                    ${
                (function () {
                    var arrTask = [];
                    
                    
                    for (var i = 0; i < textTask.length; i++) {
                        var task;
                        var checked = false;

                        if(objId[arrId[i]].checked === true) {
                            checked = true;
                        }

                        task = me.createTask(textTask[i], arrId[i], checked);

                        arrTask.push(task);
                    }
                    return arrTask.join("");
                }())
                }
                </ul>
                 `;
        };

        this.createTask = function (text, id, checked) {
            
            return `<li class="task${checked ? " made": ""}" data-id="${id}">
                        <div class="view">
                            <img src="img/icons8-drag-reorder-50.png" alt="перенести" class="drag">
                            <input type="checkbox" ${checked ? "checked" : ""}>
                            <label for="">${text}</label>
                            <button class="close"></button>
                        </div>
                    </li>`;
        };


        this.createInputField = function () {
            return  `<input class="form-control todo-input" placeholder="Введите элемент списка задач" value="">`;
        };

    }

    return new CreateTodo({
        container: "div"
    });
}());