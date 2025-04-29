<script lang="ts" setup>
defineProps<{
  msg: string
}>()

import { ref, onMounted } from 'vue';
import api from '@/services/api';


const fetchAnimeList = async () => {
  try {
    const response = await api.get('/anime?q=one&limit=4'); // automatically goes to '/api/anime'
    console.log(response);
    //animeList.value = response.data;
  } catch (err: any) {
    console.log(err);
    //error.value = err.message;
  }
};

onMounted(() => {
  fetchAnimeList();
});


</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
