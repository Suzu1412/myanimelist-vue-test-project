import { ref, watch, type ComputedRef, type Ref } from 'vue'
import axios from '@/services/api'
import { useRoute, useRouter } from 'vue-router'

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

  const route = useRoute()
  const router = useRouter()

  const limit = 10

  const animeList = ref<AnimeWrapper[]>([])
  const animeDetails = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAnimeList = async (year: string, season: string, page: number) => {
    loading.value = true
    error.value = null
    try {
      const offset = (page - 1) * limit
      const response = await axios.get(
        `/anime/season/${year}/${season}?limit=${limit}&offset=${offset}&fields=id,title,main_picture,synopsis,genres`,
      )
      animeList.value = response.data.data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchAnimeById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`/anime/${id}`)
      animeDetails.value = response.data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    animeList,
    animeDetails,
    loading,
    error,
    fetchAnimeList,
    fetchAnimeById,
  }
}
