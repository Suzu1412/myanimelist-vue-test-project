<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useAnimeAPI } from '@/composables/useAnimeAPI'
import { useRoute, useRouter } from 'vue-router'
import '../assets/main.css'

const route = useRoute()
const router = useRouter();
const year = ref(route.params.year as string)
const season = ref(route.params.season as string)
const page = ref(parseInt(route.query.page as string) || 1)

const currentYear = new Date().getFullYear()
const years: number[] = []

for (let y = 1980; y <= currentYear + 1; y++) {
  years.push(y)
}
const selectedYear = ref(currentYear)

const seasons = ['winter', 'spring', 'summer', 'fall']

const { animeList, loading, error, fetchAnimeList } = useAnimeAPI()
const expanded = ref(false)

const seasonLabel = computed(() => {
  const s = (season.value as string)?.toLowerCase()
  return s.charAt(0).toUpperCase() + s.slice(1)
})

const selectedSeason = computed({
  get: () => route.params.season as string,
  set: (newSeason: string) => {
    router.push({
      name: 'SeasonAnime',
      params: {
        year: route.params.year,
        season: newSeason
      },
      query: route.query
    })
  }
})

watch(
  () => [route.params.year, route.params.season, route.query.page],
  () => {
    year.value = route.params.year as string
    season.value = route.params.season as string
    page.value = parseInt(route.query.page as string) || 1
    fetchAnimeList(year.value, season.value, page.value)
  },
  { immediate: true }
)

const changePage = (newPage: number) => {
  if (newPage < 1) return
  router.push({
    name: 'SeasonAnime',
    params: { year: year.value, season: season.value },
    query: { page: newPage.toString() }
  })
}

const searchSeasonAnime = () => {
  if (!selectedYear.value || !selectedSeason.value) return
  router.push({
    name: 'SeasonAnime',
    params: {
      year: selectedYear.value.toString(),
      season: selectedSeason.value.toLowerCase()
    },
    query: { page: '1' }
  })
}

</script>

<template>
    <h1 class="text-4xl font-bold text-emerald-400 text-center mb-8">
        {{ seasonLabel }} - {{ year }}
    </h1>

    <div class="mb-8">
    <form @submit.prevent="searchSeasonAnime" class="flex flex-wrap items-center justify-center gap-4">
      <select v-model="selectedSeason" class="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600">
        <option disabled value="">Select Season</option>
        <option v-for="season in seasons" :key="season" :value="season">{{ season }}</option>
      </select>

      <select v-model="selectedYear" class="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600">
        <option disabled value="">Select Year</option>
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </select>

      <button
        type="submit"
        class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded"
      >
        Search
      </button>
    </form>
  </div>

<!-- Spinner while loading -->
  <div v-if="loading" class="flex items-center justify-center h-screen">
    <div class="flex flex-col items-center space-y-4">
      <!-- Spinner Icon -->
      <svg
        class="animate-spin h-8 w-8 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    <span class="text-gray-700 font-medium">Loading anime...</span>
    </div>
  </div>


  <div v-else-if="error">Error: {{ error }}</div>

  <div class="p-6" v-else>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div
        v-for="anime in animeList"
        :key="anime.node.id"
        class="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105"
      >
        <img
          :src="anime.node.main_picture.medium"
          :alt="anime.node.title"
          class="w-full h-60 object-cover"
        />
        <div class="p-4">
            <h2 class="text-lg font-semibold text-gray-600">{{ anime.node.title }}</h2>
            <p class="text-sm text-gray-600">
            Genre:
            <span
                v-for="(genre, index) in anime.node.genres"
                :key="genre.id"
                class="italic"
            >
                {{ genre.name }}<span v-if="index < anime.node.genres.length - 1">, </span>
            </span>
            </p>
        
            <p
                class="text-sm text-gray-700 mt-2 transition-all duration-300"
                :class="expanded ? '' : 'line-clamp-3'"
                >
                {{ anime.node.synopsis }}
            </p>
            <button
                class="text-blue-500 hover:underline mt-1 text-sm"
                @click="expanded = !expanded"
                >
                {{ expanded ? 'Show less' : 'Show more' }}
            </button>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center gap-4 mt-6">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        :disabled="page <= 1"
        @click="changePage(page - 1)"
      >
        Previous
      </button>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        @click="changePage(page + 1)"
      >
        Next
      </button>
    </div>
</template>