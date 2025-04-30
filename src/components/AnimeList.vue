<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useAnimeAPI } from '@/composables/useAnimeAPI'
import { useRoute, useRouter } from 'vue-router'
import '../assets/main.css'

const route = useRoute()
const year = route.params.year as string // 
const season = route.params.season as string
const page = parseInt(route.query.page as string) || 1

const { animeList, loading, error, fetchAnimeList } = useAnimeAPI(year, season, page)
const expanded = ref(false)

onMounted(() => {
  fetchAnimeList()
})

watch(() => route.query.page, fetchAnimeList)

</script>

<template>
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
    <h1 class="text-2xl font-bold mb-4">Anime List</h1>
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
</template>