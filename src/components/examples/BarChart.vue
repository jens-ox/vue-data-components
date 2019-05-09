<template>
  <div>
    <cartesian-graph
      :width="width"
      :height="height"
      :margin="margin"
      :xScale="xScale"
      :yScale="yScale"
      :grid="{
        linesVertical: {
          hide: true
        }
      }"
      :xAxis="{
        label: {
          text: 'Time',
          offset: 60
        },
        ticks: {
          label: {
            rotate: 45,
            y: 5,
            width: 50
          }
        }
      }"
      :yAxis="{
        label: {
          text: '€ per sec',
          offset: 30
        },
        ticks: {
          label: {
            dx: -5
          }
        }
      }"
    >
      <bar
        v-for="(letter, i) in data"
        :key="i"
        :x="xScale(x(letter))"
        :y="yScale(y(letter))"
        :width="xScale.bandwidth()"
        :height="innerHeight - yScale(y(letter))"
      />
    </cartesian-graph>
  </div>
</template>
<script>
import { Bar } from '../shape'
import { CartesianGraph } from '../graph'
import { letterFrequency } from '../mock-data'
import { scaleBand, scaleLinear } from '../scale'

export default {
  props: {
    width: Number,
    height: Number
  },
  data() {
    return {
      margin: { top: 10, left: 70, bottom: 100, right: 10 }
    }
  },
  computed: {
    // data
    data() {
      return letterFrequency.slice(20)
    },
    // scales
    xScale() {
      return scaleBand({
        rangeRound: [0, this.innerWidth],
        domain: this.data.map(this.x),
        padding: 0.4
      })
    },
    yScale() {
      return scaleLinear({
        range: [this.innerHeight, 0],
        domain: [0, Math.max(...this.data.map(this.y))]
      })
    },

    // dimensions
    innerWidth() {
      return this.width - this.margin.left - this.margin.right
    },
    innerHeight() {
      return this.height - this.margin.top - this.margin.bottom
    }
  },
  methods: {
    // accessors
    x(d) {
      return d.letter + ' blasd laknsd asd'
    },
    y(d) {
      return d.frequency
    }
  },
  components: {
    CartesianGraph,
    Bar
  }
}
</script>
