<template>
  <transition name="info">
    <div v-if="moviesPopular[activeIndex] && show" class="movie-info">
      <h2  class="movie-info-title">{{moviesPopular[activeIndex].title}}</h2>
      <p  class="movie-info-overview">{{moviesPopular[activeIndex].overview}}</p>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MovieInfo',
  data() {
    return {
      show: true
    }
  },
  computed: {
    ...mapGetters(['moviesPopular', 'activeIndex'])
  },
  watch: {
    activeIndex(v) {
      if (this.show) {
        this.show = false
        setTimeout(() => {
          this.show = true
        }, 500)
      }
    }
  }
}
</script>

<style lang="scss">
  .movie-info {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    color: white;
    justify-content: flex-end;

    &-title {
      position: relative;
    }

    &-overview {
      position: relative;
      color: red;
    }
  }

  .info-enter-active, .info-leave-active {
    transition: opacity 0.8s ease;
  }
  .info-enter, .info-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
