import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import GuestView from '@/pages/GuestView.vue'
import RoomView from '@/pages/RoomView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/room/:code', name: 'room', component: RoomView, props: true },
  { path: '/guest/:code', name: 'guest', component: GuestView, props: true },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
