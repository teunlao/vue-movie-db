<script>

export default {
  name: 'Adaptive',
  data() {
    return {
      size: {
        iw: window.innerWidth,
        ih: window.innerHeight,
        card: {
          w: 500,
          h: 750,
          m: 60,
          default: {
            offset: 100
          },
          alternative: {
            offset: 0
          }
        }
      }
    }
  },
  created() {
    this.size.card.alternative.offset = -((this.size.card.h + this.size.card.m) / 2 + this.size.card.default.offset)

    window.addEventListener('resize', () => {
      this.size.iw = window.innerWidth
      this.size.ih = window.innerHeight
    })
  },
  provide() {
    return {
      size: this.size
    }
  },
  render() {
    return this.$slots.default[0]
  }
}
</script>
