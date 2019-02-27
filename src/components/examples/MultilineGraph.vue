<template>
  <div>
    <cartesian-graph
      :width="width" :height="height"
      :margin="margin"
      :xScale="xScale" :yScale="yScale"
      xLabel="Time" yLabel="€ per sec"
    >
      <!-- lines -->
      <line-sequence
        v-for="(d, i) in series"
        :key="`lines-${i}`"
        :sequence="d"
        :x="x" :y="y"
        :xScale="xScale" :yScale="yScale"
        :pathStyle="{}"
        :isActive="i === activeSeries"
        :activeStyle="{ stroke: 'red', strokeWidth: 2 }"
        :isInactive="activeSeries !== -1 && activeSeries !== i"
        :inactiveStyle="{ stroke: 'rgba(0,0,0,0.2)' }"
        :curve="curve"
      />

      <!-- voronoi paths -->
      <multi-sequence-voronoi
        :series="series"
        :x="x" :y="y"
        :xScale="xScale" :yScale="yScale"
        :innerWidth="innerWidth" :innerHeight="innerHeight"
        :paths="{
          hoverHandler
        }"
        :outHandler="outHandler"
      />
    </cartesian-graph>
    <button @click="series[0].push(genValue())">Click Me Please</button>
    <button @click="voronoiCounter++">Re-Compute Voronoi</button>
  </div>
</template>
<script>
import { CartesianGraph } from '../graph'
import { LineSequence } from '../primitive'
import { genDateValue } from '../mock-data'
import { scaleTime, scaleLinear } from '../scale'
import { MultiSequenceVoronoi } from '../voronoi'
import { curveBasis } from '../curve'
import { extent, max, merge } from 'd3-array'

export default {
  props: {
    width: Number,
    height: Number
  },
  data () {
    return {
      series: [],
      activeSeries: -1,
      margin: { top: 20, left: 60, bottom: 60, right: 20 },
      voronoiCounter: 0
    }
  },
  beforeMount () {
    this.series = this.genLines(4)
  },
  computed: {
    curve () {
      return curveBasis
    },

    // scales
    xScale () {
      return scaleTime({
        range: [0, this.innerWidth],
        domain: extent(merge(this.series), this.x)
      })
    },
    yScale () {
      return scaleLinear({
        range: [this.innerHeight, 0],
        domain: [0, 1.1 * max(merge(this.series), this.y)]
      })
    },

    // dimensions
    innerWidth () { return this.width - this.margin.left - this.margin.right },
    innerHeight () { return this.height - this.margin.top - this.margin.bottom }
  },
  methods: {
    genLines (num) {
      return new Array(num).fill(1).map(() => {
        return genDateValue(25)
      })
    },
    genValue () {
      return genDateValue(1)[0]
    },

    // accessors
    x (d) { return d.date },
    y (d) { return d.value },

    // handlers
    hoverHandler (point) { this.activeSeries = point.indexSeries },
    outHandler () { this.activeSeries = -1 }
  },
  components: {
    CartesianGraph, LineSequence, MultiSequenceVoronoi
  }
}
</script>
