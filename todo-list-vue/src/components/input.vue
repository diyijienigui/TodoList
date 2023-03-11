<template>
    <div class="input-wrapper" >
        <a-input 
            class="input"
            v-focus
            size="large"
            placeholder="请输入todo"
            v-model:value.trim="inputValue" 
            @keyup.enter="handleInput"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { addTodo } from '../common/api'
import { defineEmits } from 'vue'

let inputValue = ref<string>("");
const emit = defineEmits(['initTodo'])

function handleInput(){
    if(inputValue.value){
        addTodo({
            title:inputValue.value,
            done:false,
        })
        .then((res) => {
            console.log('成功', res);
            emit('initTodo')
        }
        )
        .catch((err) => {
            console.log('Fetch Error :-S', err);
        })

        inputValue.value = ""
    }else{
        alert("请输入")
    }
}
</script>
<style scoped>
.input{
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 0;
    border: none;
    background: transparent;
    /* border-bottom: 1px solid #11cdef; */
    color: #32325d;
    padding-right: 50px;
}
.input-wrapper{
    border-bottom: 1px solid #11cdef;
}
</style>