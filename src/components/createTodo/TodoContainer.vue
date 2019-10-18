<template>
    <div class="todo container">
        <div class="row">
            <todo-input ref="inputTodo">

            </todo-input>
        </div>
        <div class="row">
            <div class="col-6 text-center all">
                Всего задач:
                <span class="span-counter" ref="counterAll">{{data.counterAll}}</span>
            </div>
            <div class="col-6 text-center done">
                Выполнено задач:
                <span class="span-counter" ref="counterDone">{{data.counterDone}}</span>
            </div>
        </div>
        <div class="row">
            <div class="col todo-task">
                <ul class="col-lg-6 col-8 mx-auto list">
                    <todo-task
                            v-for="task in dataTask"
                            :key="task.idTask"
                            :checked="task.checked"
                            :id="task.idTask"
                    >
                        {{task.textTask}}
                    </todo-task>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import TodoInput from "./TodoInput"
    import TodoTask from "./TodoTask"

    export default {
        props: ["data"],
        name: "todo-container",
        components: {
            todoInput: TodoInput,
            todoTask: TodoTask
        },
        computed: {
            dataTask() {
                return this.data.task
            }
        }
    }
</script>

<style scoped>

</style>