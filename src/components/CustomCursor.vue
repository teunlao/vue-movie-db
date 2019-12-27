<template>
  <div class="cursor small">
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import paper from 'paper'
import SimplexNoise from 'simplex-noise'
export default {
  name: 'CustomCursor',
  data () {
    return {
      clientX: -100,
      clientY: -100
    }
  },
  methods: {
    initCursor () {
      document.addEventListener('mousemove', evt => {
        this.clientX = evt.clientX
        this.clientY = evt.clientY
      })
      requestAnimationFrame(this.render)
    },
    render () {
      this.$el.style.transform = `translate(${this.clientX}px, ${this.clientY}px)`
      requestAnimationFrame(this.render)
    }
  },
  mounted () {
    this.initCursor()
  }
}
</script>

<style scoped lang="scss">
  .cursor {

    position: fixed;
    left: 0;
    top: 0;
    border-radius: 50%;
    border: 2px solid black;
    pointer-events: none;
    z-index: 11000;
  }

  .small {
    width: 12px;
    height: 12px;
    left: -6px;
    top: -6px;
    background: #ffffff;
  }

  .canvas {
    width: 100vw;
    height: 100vh;
    z-index: 12000;
  }
</style>
