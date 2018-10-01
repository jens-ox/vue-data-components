<template>
  <cartesian-graph
    :width="width" :height="height"
    :margin="margin"
    :xScale="xScale" :yScale="yScale"
    xLabel="Time" yLabel="€ per sec"
  >
    <!-- lines -->
    <line-path
      v-for="(d, i) in series"
      :key="`lines-${i}`"
      :data="d"
      :x="x" :y="y"
      :xScale="xScale" :yScale="yScale"
      :pathStyle="{}"
      :isActive="i === activeSeries"
      :activeStyle="{ stroke: 'red', strokeWidth: 2 }"
      :isInactive="activeSeries !== -1 && activeSeries !== i"
      :inactiveStyle="{ stroke: 'rgba(0,0,0,0.2)' }"
    />

    <!-- voronoi paths -->
    <multiline-voronoi
      :series="series"
      :x="x" :y="y"
      :xScale="xScale" :yScale="yScale"
      :innerWidth="innerWidth" :innerHeight="innerHeight"
      :hoverHandler="hoverHandler" :outHandler="outHandler"
    />
  </cartesian-graph>
</template>
<script>
import { CartesianGraph } from '../graph'
import { LinePath } from '../shape'
import { genDateValue } from '../mock-data'
import { scaleTime, scaleLinear } from '../scale'
import { MultilineVoronoi } from '../voronoi'
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
      margin: { top: 20, left: 60, bottom: 60, right: 20 }
    }
  },
  beforeMount () {
    this.series = this.genLines(4)
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
    hoverHandler (point) { this.activeSeries = point.indexSeries },
    outHandler () { this.activeSeries = -1 }
  },
  components: {
    CartesianGraph, LinePath, MultilineVoronoi
  }
}
</script>
