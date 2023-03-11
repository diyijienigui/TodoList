<template>
    <div v-if="active === 0">
        <item v-for="(todo,index) in todoLists" :initTodo="initTodo" :key="todo.id" :todo="todo" :index="index"/>
    </div>
    <div v-else-if="active === 1">
        <item v-for="(todo,index) in penddingTodoList" :initTodo="initTodo" :key="todo.id" :todo="todo" :index="index"/>
    </div>
    <div v-else >
        <item v-for="(todo,index) in completeTodoList" :initTodo="initTodo" :key="todo.id" :todo="todo" :index="index"/>
    </div>
</template>

<script setup lang="ts">
import { reactive,onBeforeUpdate } from "vue";
import item from "./item.vue"
import {TodoItem} from "@/types/index"

const emit = defineEmits(['initTodo'])
const props = defineProps<{
    todoLists: TodoItem[],
    active:Number,
}>()
let penddingTodoList = reactive<TodoItem[]>([])
let completeTodoList = reactive<TodoItem[]>([])
const initTodo = () => {
    emit('initTodo')
}
onBeforeUpdate(() => {
    penddingTodoList = props.todoLists.filter(todo => !todo.done)
    completeTodoList = props.todoLists.filter(todo => todo.done)
})

</script>