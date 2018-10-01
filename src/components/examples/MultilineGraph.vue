<template>
  <svg :width="width" :height="height">
    <group class="graph-outer">
      <AxisLeft
        :top="margin.top"
        :left="margin.left"
        :scale="yScale"
        hideZero
        :numTicks="numTicksForHeight"
        :labelOffset="40"
        label="Axis Left Label"
      />
      <AxisBottom
        :top="height - margin.bottom"
        :left="margin.left"
        :scale="xScale"
        :numTicks="numTicksForWidth"
        :tickRotate="45"
        :tickLabelProps="{
          'dx': '0.75em',
          'dy': '0.25em'
        }"
        :labelOffset="25"
        label="Time"
      >
      </AxisBottom>
    </group>
    <group class="graph-inner" :top="margin.top" :left="margin.left">

      <!-- grid -->
      <grid
        :xScale="xScale"
        :yScale="yScale"
        :width="innerWidth"
        :height="innerHeight"
        :numTicksRows="numTicksForHeight"
        :numTicksColumns="numTicksForWidth"
      />

      <!-- lines -->
      <line-path
        v-for="(d, i) in series"
        :key="`lines-${i}`"
        :data="d"
        :xScale="xScale"
        :yScale="yScale"
        :x="x"
        :y="y"
        :pathStyle="{
          stroke: 'orange',
          strokeWidth: 1,
          fill: 'none'
        }"
        :isActive="i === activeSeries"
        :activeStyle="{
          stroke: 'red',
          strokeWidth: 2
        }"
        :isInactive="activeSeries !== -1 && activeSeries !== i"
        :inactiveStyle="{
          stroke: 'rgba(0,0,0,0.2)'
        }"
      />

      <!-- voronoi paths -->
      <multiline-voronoi
        :series="series"
        :x="x"
        :y="y"
        :xScale="xScale"
        :yScale="yScale"
        :innerWidth="width - margin.right - margin.left"
        :innerHeight="height - margin.top - margin.bottom"
        :hoverHandler="hoverHandler"
        :outHandler="outHandler"
      />
    </group>
  </svg>
</template>
<script>
import { Group } from '../group'
import { LinePath } from '../shape'
import { AxisBottom, AxisLeft } from '../axis'
import { Grid } from '../grid'
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
      margin: { top: 20, left: 60, bottom: 60, right: 20 },
      activeSeries: -1
    }
  },
  beforeMount () {
    this.series = this.genLines(4)
  },
  computed: {

    // scales
    xScale: function () {
      return scaleTime({
        range: [0, this.innerWidth],
        domain: extent(merge(this.series), this.x)
      })
    },
    yScale: function () {
      return scaleLinear({
        range: [this.innerHeight, 0],
        domain: [0, 1.1 * max(merge(this.series), this.y)]
      })
    },

    innerWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    innerHeight () {
      return this.height - this.margin.top - this.margin.bottom
    },

    // dynamic ticks
    numTicksForHeight () {
      if (this.height <= 300) return 3
      if (this.height > 300 && this.height <= 600) return 5
      return 10
    },
    numTicksForWidth () {
      if (this.width <= 300) return 2
      if (this.width > 300 && this.width <= 400) return 5
      return 10
    }
  },
  methods: {
    genLines (num) {
      return new Array(num).fill(1).map(() => {
        return genDateValue(25)
      })
    },
    x (d) { return d.date },
    y (d) { return d.value },
    hoverHandler (point) {
      this.activeSeries = point.indexSeries
    },
    outHandler () {
      this.activeSeries = -1
    }
  },
  components: {
    Group, LinePath, AxisBottom, AxisLeft, MultilineVoronoi, Grid
  }
}
</script>
