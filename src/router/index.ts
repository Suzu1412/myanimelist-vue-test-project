import { createRouter, createWebHistory } from 'vue-router'
import AnimeListView from '@/views/AnimeListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/season/2025/fall',
    },
    {
      path: '/season/:year/:season',
      name: 'SeasonAnime',
      component: AnimeListView,
    }
  ],
})

export default router
