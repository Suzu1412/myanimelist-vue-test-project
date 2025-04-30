import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
      props: route => ({
        year: route.params.year,
        season: route.params.season,
        page: parseInt(route.query.page as string) || 1
      })
    }
  ],
})

export default router
