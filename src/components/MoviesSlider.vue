<template>
  <div class="movies-slider">
    <MovieCard :style="{marginBottom: `${size.card.m}px`}"
               :disable="disable"
               :class="{disable}"
               v-for="(movie, index) in moviesArray"
               :key="index" :src="movie.poster_path"
               :title="movie.title" />
  </div>

</template>

<script>
import { mapMutations } from 'vuex'
import anime from 'animejs'
import MovieCard from '@/components/MovieCard'
export default {
  name: 'MoviesSlider',
  components: { MovieCard },
  inject: ['size'],
  props: {
    posY: {
      type: Number,
      default: 0
    },
    deltaY: {
      type: Number,
      default: 0
    },
    animationDuration: {
      type: Number,
      default: 500
    },
    easing: {
      type: String,
      default: ''
    },
    delay: {
      type: Number,
      default: 0
    },
    movies: {
      type: Array,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: () => false
    },
    disable: {
      type: Boolean,
      default: () => false
    },
    defaultOffset: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      cards: 20,
      animation: null,
      stopAnimation: false
    }
  },
  computed: {
    moviesArray() {
      if (!this.reverse) return this.movies
      return [...this.movies].reverse()
    },
    // eslint-disable-next-line vue/return-in-computed-property
    totalPosY() {
      if (!this.reverse) return (-this.size.card.h - this.size.card.m) * (this.deltaY + this.posY) + this.size.card.default.offset
      return -(this.cards * (this.size.card.h + this.size.card.m)) - ((this.deltaY + this.posY) * (-this.size.card.h - this.size.card.m)) - this.size.card.alternative.offset
    }
  },
  methods: {
    ...mapMutations({ setActiveIndex: 'SET_ACTIVE_INDEX' }),
    startOffset() {
      if (!this.reverse) return (-this.size.card.h - this.size.card.m) * (this.deltaY + this.posY) + this.size.card.default.offset
      return -(this.cards * this.size.card.h) - ((this.deltaY + this.posY) * (-this.size.card.h - this.size.card.m))
    },

    animationTick() {
      console.log(this.size.card.alternative.offset)
      const options = {
        targets: this.$el,
        top: this.totalPosY,
        duration: this.animationDuration,
        delay: this.delay
      }

      if (this.easing) options.easing = this.easing
      if (this.reverse) {
        if (this.totalPosY === -16505) {
          this.stopAnimation = true
          this.$el.style.top = `${this.totalPosY - (2 * this.size.card.h)}px`
        }
      }
      if (parseInt(this.$el.style.top) === -16505 - (2 * this.size.card.h)) {
        this.stopAnimation = false
      }

      if (!this.stopAnimation) {
        this.animation = anime(options)
      }
    }
  },
  mounted() {
    this.$el.style.top = `${this.totalPosY}px`
  },
  watch: {
    totalPosY (v, o) {
      this.animationTick()
    },
    movies(v) {
      if (v.length > 20) {
        this.cards += 20
      }
      // if (this.reverse) { this.$el.style.top = `${-(20 * this.size.cardH)}px` }
    },
    posY(v) {
      if (!this.disable) {
        this.setActiveIndex(v)
      }
    }
  }
}
</script>

<style lang="scss">
  .movies-slider {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 500px;

    > div {

    }
  }

  .disable {
    pointer-events: none;
    filter: grayscale(80%);
    opacity: 0.06;
  }
</style>
