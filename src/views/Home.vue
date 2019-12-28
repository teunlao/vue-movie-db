<template>
    <div class="home">
      <MovieInfo />
      <div class="container">
        <MoviesSlider class="ms-fake"
                      disable
                      v-show="false"
                      :pos-y="wheelPos"
                      :animation-duration="4000"
        />
        <MoviesSlider :movies="moviesPopular"
                      class="ms-first"
                      disable
                      :delta-y="5"
                      :pos-y="wheelPos"
                      :animation-duration="3200"
                      easing="easeOutQuint"
                      :default-offset="100"
        />
        <MoviesSlider :movies="moviesPopular"
                      class="ms-second"
                      disable
                      :delta-y="3"
                      :pos-y="wheelPos"
                      reverse
                      easing="easeOutQuint"
                      :animation-duration="2700"
        />
        <MoviesSlider :movies="moviesPopular"
                      class="ms-third"
                      :pos-y="wheelPos"
                      easing="easeOutQuint"
                      :animation-duration="2300"
                      :default-offset="100"
        />

      </div>
    </div>

</template>

<script>
import VueLoop from 'vue-loop'
import { mapActions, mapGetters } from 'vuex'
import anime from 'animejs'
import MovieCard from '@/components/MovieCard'
import MoviesSlider from '@/components/MoviesSlider'
import MovieInfo from '@/components/MovieInfo'
export default {
  name: 'home',
  data() {
    return {
      wheelPos: 0,
      wheelDisable: false,
      wheelDelay: 0,
      page: 1
    }
  },
  components: { MovieInfo, MoviesSlider },
  computed: {
    ...mapGetters(['moviesPopular'])
  },
  methods: {
    ...mapActions({ getMoviesPopular: 'GET_MOVIES_POPULAR' })
  },
  mounted() {
    this.getMoviesPopular(this.page)
    window.addEventListener('wheel', evt => {
      let delta
      if (evt.deltaY < 0) {
        delta = -1
      } else {
        delta = 1
      }
      if (this.wheelPos + delta > -1) {
        this.wheelPos += delta
      }
    })
  },
  watch: {
    wheelPos(v) {
      if (v < 0) this.wheelPos = 0
      if (v > this.moviesPopular.length - 5) {
        this.page++
        this.getMoviesPopular(this.page)
      }
      // if (v >= this.moviesPopular.length) this.wheelPos = this.moviesPopular.length - 1
    }
  }

  // components: { MovieCard },
  // inject: ['size'],
  // data () {
  //   return {
  //     right: false,
  //     one: true,
  //     two: true,
  //     animationStart: null,
  //     posYStart: 0,
  //     rbPosY: 0,
  //     mdPosY: 0,
  //     lbPosY: 0,
  //     deltaY: 0,
  //     animeFrames: 0,
  //     animation: null
  //   }
  // },
  // computed: {
  //   ...mapGetters(['moviesPopular', 'moviesPopularReverse'])
  // },
  // methods: {
  //   ...mapActions(['GET_MOVIES_POPULAR']),
  //   animate (target, pos) {
  //     this.animeFrames++
  //     setTimeout(() => {
  //       this.animeFrames--
  //     }, 450)
  //     this.animation = anime({
  //       targets: target,
  //       translateY: pos,
  //       duration: 450,
  //       easing: 'easeInSine'
  //     })
  //   }
  // },
  // mounted () {
  //   this.$el.addEventListener('wheel', evt => {
  //     console.log(this.$refs.rb)
  //     if (!this.animeFrames) {
  //       if (evt.deltaY < 0) {
  //         this.rbPosY += 810
  //         this.mdPosY -= 810
  //         this.lbPosY += 810
  //       } else {
  //         this.rbPosY -= 810
  //         this.mdPosY += 810
  //         this.lbPosY -= 810
  //       }
  //       this.animate(this.$refs.rb, this.rbPosY)
  //       this.animate(this.$refs.mb, this.mdPosY)
  //       this.animate(this.$refs.lb, this.lbPosY)
  //     }
  //   })
  //   this.GET_MOVIES_POPULAR()
  // },
  // watch: {
  //
  // }
}
</script>

<style lang="scss">
  .home {
    position: relative;
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .container {
    position: relative;
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow: hidden;
    > div {
      left: -200px;
    }

    .ms-first {
      margin-right: 180px;
    }
    .ms-second {
      margin-right: 140px;
    }
  }
</style>
