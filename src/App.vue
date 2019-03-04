<template>
  <div id="app">
    <multiline-graph :width="width" :height="height" />
    <br><br>
    <multipoint-graph :width="width" :height="height" />
    <br><br>
    <bar-chart :width="width" :height="height" />
    <br><br>
    <bar-group-horizontal :width="width" :height="height" />
    <br><br>
    test
  </div>
</template>

<script>
import { TextComponent } from './components/text'
import { Group } from './components/group'
import BarChart from './components/examples/BarChart'
import MultilineGraph from './components/examples/MultilineGraph'
import MultipointGraph from './components/examples/MultipointGraph'
import BarGroupHorizontal from './components/examples/BarGroupHorizontal'

export default {
  name: 'app',
  data () {
    return {
      textWidth: 0,
      windowWidth: 0,
      rotate: 0
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
    MultilineGraph, MultipointGraph, BarChart, TextComponent, Group, BarGroupHorizontal
  }
}
</script>
