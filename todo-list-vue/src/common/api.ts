import request from '../utils/request'
import {TodoItem,NewTodoItem} from "@/types/index"

export function getTodoLists() {
  return request.get('http://localhost:3000/getTodoList')
}

export function addTodo(params:NewTodoItem) {
  return request.post('http://localhost:3000/addTodo',params)
}

export function updateTodo(params:TodoItem){
  return request.put('http://localhost:3000/updateTodo',params)
}

export function checkAllTodo(params:object){
  return request.put('http://localhost:3000/checkAllTodo',params)
}

export function deleteTodo(params:object) {
  return request.post('http://localhost:3000/deleteTodo',params)
}