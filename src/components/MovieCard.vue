<template>
  <div class="movie-card">
    <div v-if="!disable" class="movie-title">{{title}}</div>
    <div class="movie-img-wrap">
      <img :src="w500" alt="movie">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api'
export default {
  name: 'MovieCard',
  props: {
    src: String,
    title: String,
    disable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['activeIndex']),
    w500() {
      return api.imageW500 + this.src
    }
  }
}
</script>

<style lang="scss">
  .movie-card {
    display: flex;
    min-height: 750px;
    position: relative;

    .movie-title {
      position: relative;
      min-width: 40px;
      color: #E6E6E6;
      text-align: right;
      font-size: 26px;
      letter-spacing: 0.5px;
      font-family: Verdana, sans-serif;
      right: 20px;
      writing-mode: tb-rl;
      transform: rotate(180deg);
      overflow: hidden;;
      text-overflow: ellipsis; /* Многоточие */
    }

    .movie-img-wrap {

      overflow: hidden;
    }

    img {
      display: block;
      object-fit: scale-down;
      transition: transform .4s;

      &:hover {
        transform: scale(1.1);
        transition: transform 1.2s;
      }
    }
  }

</style>
