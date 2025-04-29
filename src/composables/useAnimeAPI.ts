import { ref } from 'vue';
import axios from '@/services/api';
import AnimeList from '@/components/AnimeList.vue';

export function useAnimeAPI() {
  interface AnimeNode {
    id: number
    title: string
    main_picture: {
      medium: string
      large: string
    }
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
      const response = await axios.get('/anime?q=limit=10');
      animeList.value = response.data.data;
      console.log(JSON.stringify(response.data, null, 2))
      animeList.value.forEach((item, index) => {
        console.log(`Item #${index}:`, item);
        console.log(`Keys:`, Object.keys(item));
        console.log(`Node:`, item.node.id);
      })

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