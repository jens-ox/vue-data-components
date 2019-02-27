<template>
  <cartesian-graph
    :width="width" :height="height"
    :margin="margin"
    :xScale="xScale" :yScale="yScale"
    xLabel="Time" yLabel="€ per sec"
  >
    <!-- points -->
    <point-sequence
      v-for="(d, i) in series"
      :key="`points-${i}`"
      :points="d"
      :x="x" :y="y"
      :r="() => 4"
      :xScale="xScale" :yScale="yScale"
      :isActive="i === activeSeries"
      :activePoint="activePoint"
      :isInactive="activeSeries !== -1 && activeSeries !== i"
      :pointStyle="{
        fill: 'rgba(0, 0, 0, 0.5)'
      }"
      :activePointStyle="{ fill: 'red' }"
      :sameIndexStyle="{ fill: 'orange' }"
      :inactiveStyle="{ fill: 'rgba(0,0,0,0.2)' }"
    />

    <!-- voronoi paths -->
    <multi-sequence-voronoi
      :series="series"
      :x="x" :y="y"
      :xScale="xScale" :yScale="yScale"
      :width="innerWidth" :height="innerHeight"
      :moveHandler="moveHandler" :outHandler="outHandler"
    />
  </cartesian-graph>
</template>
<script>
import { CartesianGraph } from '../graph'
import { PointSequence } from '../primitive'
import { genDateValue } from '../mock-data'
import { scaleTime, scaleLinear } from '../scale'
import { MultiSequenceVoronoi } from '../voronoi'
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
      activePoint: -1,
      margin: { top: 20, left: 60, bottom: 60, right: 20 }
    }
  },
  beforeMount () {
    this.series = this.genLines(2)
  },
  computed: {

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

    // accessors
    x (d) { return d.date },
    y (d) { return d.value },

    // handlers
    moveHandler (point) {
      this.activeSeries = point.indexSeries
      this.activePoint = point.indexPoints
    },
    outHandler () { this.activeSeries = -1 }
  },
  components: {
    CartesianGraph, PointSequence, MultiSequenceVoronoi
  }
}
</script>
