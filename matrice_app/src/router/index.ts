import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '@/views/Accueil.vue'
import DemandeIntervention from '@/views/DemandeIntervention.vue'
import Escalade from '@/views/Escalade.vue'

const routes = [
  { path: '/', name: 'Accueil', component: Accueil },
  { path: '/demande-intervention', name: 'DemandeIntervention', component: DemandeIntervention },
  { path: '/escalade', name: 'Escalade', component: Escalade }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
