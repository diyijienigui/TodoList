<template>
    <div class="footer-wrapper" >
        <span  v-show="!!todoLists.length" class="footer-check">
            <a-checkbox v-model:checked="allCheck" >Check All</a-checkbox>
        </span>
        <span v-show="hasComplete" class="footer-del" @click="handleClearAll()">
            <span>
                Clear completed
            </span>
            <svg t="1677580354945"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3740" id="mx_n_1677580354946" width="16" height="16"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72z m504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" fill="#1890ff" p-id="3741"></path></svg>
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref,computed } from "vue";
import { TodoItem } from "@/types/index"
import { checkAllTodo,deleteTodo } from '../common/api'

const emit = defineEmits(['initTodo'])
const props = defineProps<{
    todoLists: TodoItem[],
}>()
// let allCheck = ref<boolean>(false)
// let hasComplete = ref<boolean>(false)
let allCheck = computed({
    get(){
        if(props.todoLists.every((todo:TodoItem) => todo.done) && props.todoLists.length){
            return true
        } else {
            return false
        }
    },
    set(value){
        if(value){
            checkAllTodo({check:true})
            .then(res => emit('initTodo')
            )
            .catch(err => console.log('Fetch Error :-S', err))
        } else {
            checkAllTodo({check:false})
            .then(res => emit('initTodo')
            )
            .catch(err => console.log('Fetch Error :-S', err))
        }
    }
})

let hasComplete = computed(() =>{
    if(props.todoLists.some((todo:TodoItem) => todo.done) && props.todoLists.length){
        return true
    } else {
        return false
    }    
})
function handleClearAll(){
    const arr = props.todoLists.map(item => {
        if(item.done) return item.id
    })
    deleteTodo({deleteArr:arr})
    .then(res => emit('initTodo')
    )
    .catch(err => console.log('Fetch Error :-S', err))
}

</script>
<style scoped>
.footer-wrapper{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.footer-check{
    color: #1890ff;
    cursor: pointer;
}
/* .footer-check:hover{
    
} */
.footer-del{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1890ff;
    cursor: pointer;
}
.footer-del:hover{
    color: #096fce;
}
</style>