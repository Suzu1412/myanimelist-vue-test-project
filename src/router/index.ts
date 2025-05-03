import { createRouter, createWebHistory } from 'vue-router'
import AnimeListView from '@/views/AnimeListView.vue'

function getCurrentSeasonAndYear() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // JS months are 0-indexed

  let season = 'winter'
  if (month >= 4 && month <= 6) season = 'spring'
  else if (month >= 7 && month <= 9) season = 'summer'
  else if (month >= 10 && month <= 12) season = 'fall'

  return { year, season }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const { year, season } = getCurrentSeasonAndYear()
        return `/season/${year}/${season}`
      },
    },
    {
      path: '/season/:year/:season',
      name: 'SeasonAnime',
      component: AnimeListView,
    },
  ],
})

export default router
