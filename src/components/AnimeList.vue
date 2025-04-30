<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useAnimeAPI } from '@/composables/useAnimeAPI'
import '../assets/main.css'

const { animeList, loading, error, fetchAnimeList } = useAnimeAPI()
const expanded = ref(false)

onMounted(() => {
  fetchAnimeList()
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Anime List</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
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