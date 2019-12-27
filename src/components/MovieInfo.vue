<template>
  <transition name="info">
    <div v-if="moviesPopular[activeIndex] && show" class="movie-info">
      <div class="title-vote-wrap">
        <h2  class="movie-info-title">{{moviesPopular[activeIndex].title}}</h2>
        <span  class="movie-info-vote">{{moviesPopular[activeIndex].vote_average}}</span>
      </div>
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
    font-family: Verdana;
    display: flex;

    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    color: #E6E6E6;
    justify-content: flex-end;

    .title-vote-wrap {
      display: flex;
      max-width: 980px;
      flex-direction: row;
      align-items: center;
    }

    &-title {
      font-size: 28px;
      margin-left: 50px;
      position: relative;
    }

    &-tmdb {
      margin-left: 30px;
      font-size: 24px;
      font-weight: normal;
    }

    &-vote {
      margin-left: 25px;
      font-size: 28px;
      font-weight: bold;
      color: green;
    }

    &-overview {
      font-size: 22px;
      margin-left: 50px;
      margin-bottom: 120px;
      max-width: 980px;
      position: relative;
    }
  }

  .info-enter-active, .info-leave-active {
    transition: opacity 0.8s ease;
  }
  .info-enter, .info-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
