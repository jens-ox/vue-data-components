<template>
  <div id="app">
    <multiline-graph :width="width" :height="height"></multiline-graph>
  </div>
</template>

<script>
import MultilineGraph from './components/examples/MultilineGraph'

export default {
  name: 'app',
  data () {
    return {
      windowWidth: 0
    }
  },
  beforeMount () {
    this.windowWidth = window.innerWidth
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    })
  },
  computed: {
    width: function () {
      return this.windowWidth > 800 ? 800 : this.windowWidth - 16
    },
    height: function () {
      return 0.618 * this.width
    }
  },
  components: {
    MultilineGraph
  }
}
</script>
