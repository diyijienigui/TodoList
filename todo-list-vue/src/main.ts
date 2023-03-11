import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import directives from "./common/directives";
import { Checkbox,Input } from 'ant-design-vue';

const app = createApp(App)

app.use(directives);
app.use(Checkbox,Input);

app.mount('#app')


