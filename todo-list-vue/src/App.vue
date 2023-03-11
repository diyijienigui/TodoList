<script setup lang="ts">
import todoList from "./components/todoList.vue"
import myInput from "./components/input.vue"
import myfooter from "./components/footer.vue"
import category from "./components/category.vue"
import { ref } from "vue";
import {TodoItem} from "@/types/index"
import { getTodoLists } from './common/api'


let active = ref<number>(0);
const todoLists = ref<TodoItem[]>([])

const initTodo = () => {
  getTodoLists()
    .then((res) => {
          todoLists.value = res.data
      }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    })
}
const changeActive = (num:number) => {
  active.value = num
}
initTodo()
</script>

<template>
  <div class="app-main">
    <div class="todoList-wrapper">
      <myInput @initTodo="initTodo" />
      <todoList
        :todo-lists=todoLists
        :active=active
        @initTodo="initTodo"
      >
      </todoList>
      <myfooter @initTodo="initTodo" :todo-lists=todoLists></myfooter>
      <category
        :todo-lists=todoLists
        @changeActive="changeActive"
        :active=active
      >
      </category>
    </div>
  </div>
</template>

<style scoped>
.app-main{
  height: 100%;
}
.todoList-wrapper{
  margin: 4rem auto;
  padding: 2rem 3rem 3rem;
  max-width: 750px;
  background: #fff;
  color: #32325d;
  box-shadow: 0 0 19px 10px rgba(100, 100, 100, 0.2);
  overflow: visible;
}
</style>
