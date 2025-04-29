<script lang="ts" setup>
import { onMounted } from 'vue'
import { useAnimeAPI } from '@/composables/useAnimeAPI'

const { animeList, loading, error, fetchAnimeList } = useAnimeAPI()

onMounted(() => {
  fetchAnimeList()
})
</script>

<template>
  <div>
    <div v-if="loading">Loading anime...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <ul v-else>
      <li v-for="anime in animeList" :key="anime.node.id">
        {{ anime.node.title }}
      </li>
    </ul>
  </div>
</template>