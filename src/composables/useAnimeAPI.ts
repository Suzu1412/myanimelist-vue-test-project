import { ref } from 'vue';
import axios from '@/services/api';
import AnimeList from '@/components/AnimeList.vue';

export function useAnimeAPI() {
  interface Genre {
    id: number
    name: string
  }

  interface AnimeNode {
    id: number
    title: string
    main_picture: {
      medium: string
      large: string
    }
    genres: Genre[]
    synopsis: string
  }

  interface AnimeWrapper {
    node: AnimeNode
  }


  const animeList = ref<AnimeWrapper[]>([]);
  const animeDetails = ref<any | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAnimeList = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get('/anime/season/2025/winter?limit=100&fields=id,title,main_picture,synopsis,genres,nsfw');
      animeList.value = response.data.data;
      console.log(animeList.value);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchAnimeById = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`/anime/${id}`);
      animeDetails.value = response.data;
      console.log(animeDetails.value);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    animeList,
    animeDetails,
    loading,
    error,
    fetchAnimeList,
    fetchAnimeById,
  };
}