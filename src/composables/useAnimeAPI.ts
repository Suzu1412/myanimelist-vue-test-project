import { ref, watch } from 'vue';
import axios from '@/services/api';
import AnimeList from '@/components/AnimeList.vue';
import { useRoute, useRouter } from 'vue-router'

export function useAnimeAPI(year: string, season: string, page: number) {
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

  const route = useRoute()

  const limit = 20
  const offset = (page - 1) * limit


  const animeList = ref<AnimeWrapper[]>([]);
  const animeDetails = ref<any | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAnimeList = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`/anime/season/${year}/${season}?limit=${limit}&offset=${offset}&fields=id,title,main_picture,synopsis,genres`);
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

  // Re-fetch when the query param changes
  watch(() => route.query.page, fetchAnimeList)

  return {
    animeList,
    animeDetails,
    loading,
    error,
    fetchAnimeList,
    fetchAnimeById,
  };
}