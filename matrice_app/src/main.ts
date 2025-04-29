import { createApp } from 'vue'
import { createPinia } from 'pinia'  // Importer Pinia
import './style.css'
import App from './App.vue'

const app = createApp(App)

const pinia = createPinia()  // Créer l'instance Pinia
app.use(pinia)  // Ajouter Pinia à votre application

app.mount('#app')
