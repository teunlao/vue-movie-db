import axios from 'axios'
import { API_KEY_V3 } from '@/config'

export default {
  baseURL: 'https://api.themoviedb.org/3/',
  imageW780: 'https://image.tmdb.org/t/p/w780/',
  imageW500: 'https://image.tmdb.org/t/p/w500/',
  imageOriginal: 'https://image.tmdb.org/t/p/original/',
  movies: {
    popular: 'movie/popular'
  }
}
