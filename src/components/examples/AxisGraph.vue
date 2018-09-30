<template>
  <svg :width="width" :height="height" v-if="width >= 10">
    <Grid
      :top="margin.top"
      :left="margin.left"
      :xScale="xScale"
      :yScale="yScale"
      :width="xMax"
      :height="yMax"
      :numTicksRows="numTicksForHeight(height)"
      :numTicksColumns="numTicksForWidth(width)"
      hideYLines
    />
    <Group :top="margin.top" :left="margin.left">
      <LinePath
        :data="data"
        :xScale="xScale"
        :yScale="yScale"
        :x="x"
        :y="y"
        :pathStyle="{
          stroke: 'red',
          strokeWidth: 2,
          fill: 'none'
        }"
      />
    </Group>
    <Group :left="margin.left">
      <AxisLeft
        :top="margin.top"
        :scale="yScale"
        hideZero
        :numTicks="numTicksForHeight(height)"
        :labelOffset="40"
        label="Axis Left Label"
      />
      <AxisBottom
        :top="height - margin.bottom"
        :scale="xScale"
        :numTicks="numTicksForWidth(width)"
        :tickRotate="45"
        :tickLabelProps="{
          'dx': '0.75em',
          'dy': '0.25em'
        }"
        :labelOffset="25"
        label="Time"
      >
      </AxisBottom>
    </Group>
  </svg>
</template>
<script>
import { Grid } from '../grid'
import { Group } from '../group'
import { curveBasis } from '../curve'
import { GradientOrangeRed } from '../gradient'
import { genDateValue } from '../mock-data'
import { AxisLeft, AxisRight, AxisBottom } from '../axis'
import { AreaClosed, LinePath, LineShape } from '../shape'
import { scaleTime, scaleLinear } from '../scale'
import { extent, max } from 'd3-array'

export default {
  props: {
    width: Number,
    height: Number,
    margin: {
      type: Object,
      default: () => { return { top: 10, bottom: 10, left: 10, right: 10 } }
    }
  },
  data () {
    return {
      curveBasis,
      data: []
    }
  },
  computed: {
    // maxes
    xMax () { return this.width - this.margin.left - this.margin.right },
    yMax () { return this.height - this.margin.top - this.margin.bottom },

    // scales
    xScale () {
      return scaleTime({
        range: [0, this.xMax],
        domain: extent(this.data, this.x)
      })
    },
    yScale () {
      return scaleLinear({
        range: [this.yMax, 0],
        domain: [0, max(this.data, this.y)],
        nice: true
      })
    }
  },
  methods: {
    // accessors
    x (d) { return d.date },
    y (d) { return d.value },

    // dynamic ticks
    numTicksForHeight (height) {
      if (height <= 300) return 3
      if (height > 300 && height <= 600) return 5
      return 10
    },
    numTicksForWidth (width) {
      if (width <= 300) return 2
      if (width > 300 && width <= 400) return 5
      return 10
    }
  },
  beforeMount () {
    this.data = genDateValue(20)
  },
  components: {
    Grid, Group, GradientOrangeRed, AxisLeft, AxisRight, AxisBottom, AreaClosed, LinePath, LineShape
  }
}
</script>
