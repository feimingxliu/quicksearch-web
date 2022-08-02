import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import ElementPlus from 'element-plus'
import JsonViewer from 'vue-json-viewer'
import 'element-plus/dist/index.css'
import 'vue-json-viewer/style.css'

const app = createApp(App)

app.use(router)

//app.use(ElementPlus)

app.use(JsonViewer)

app.mount('#app')
