<template>
  <div>

    <svg :width="width" :height="height">
      <Group :left="margin.left" :top="margin.top">
        <Grid :xScale="xScale" :yScale="yScale" :width="xMax" :height="yMax" />
        <Axis orientation="bottom" :top="yMax" :scale="xScale" :numTicks="width > 520 ? 10 : 5" />
        <Axis orientation="left" :scale="yScale" />
        <text :x="-70" :y="15" transform="rotate(-90)" :font-size="10">
          Temperature (°F)
        </text>
        <Threshold
          :data="data"
          :x="date"
          :y0="sf"
          :y1="sf2"
          :xScale="xScale"
          :yScale="yScale"
          :clipAboveTo="0"
          :clipBelowTo="yMax"
          :curve="curveBasis"
          :belowAreaStyle="{
            strokeWidth: 0,
            fill: 'red',
            fillOpacity: 0.4
          }"
          :aboveAreaStyle="{
            strokeWidth: 0,
            fill: 'green',
            fillOpacity: 0.4
          }"
        />
        <LinePath
          :data="data"
          :curve="curveBasis"
          :x="date"
          :y="sf"
          :xScale="xScale"
          :yScale="yScale"
          :pathStyle="{
            stroke: '#000',
            strokeWidth: 1.5,
            strokeOpacity: 0.8,
            strokeDasharray: '1,2',
            fill: 'none'
          }"
        />
        <LinePath
          :data="data"
          :curve="curveBasis"
          :x="date"
          :y="sf2"
          :xScale="xScale"
          :yScale="yScale"
          :pathStyle="{
            stroke: '#000',
            strokeWidth: 1.5,
            fill: 'none'
          }"
        />
      </Group>
    </svg>
  </div>
</template>
<script>
import { Group } from '../group'
import { curveBasis } from '../curve'
import { LinePath } from '../shape'
import { Threshold } from '../threshold'
import { scaleTime, scaleLinear } from '../scale'
import { Axis } from '../axis'
import { Grid } from '../grid'
import { cityTemperature } from '../mock-data'
import { timeParse } from 'd3-time-format'
export default {
  props: {
    width: Number,
    height: Number,
    margin: {
      type: Object,
      default: () => { return { top: 30, bottom: 30, left: 30, right: 30 } }
    }
  },
  data () {
    return {
      curveBasis,
      data: cityTemperature
    }
  },
  computed: {
    parseDate () { return timeParse('%Y%m%d') },
    // bounds
    xMax () { return this.width - this.margin.left - this.margin.right },
    yMax () { return this.height - this.margin.top - this.margin.bottom },
    // scales
    xScale () {
      return scaleTime({
        range: [0, this.xMax],
        domain: [Math.min(...this.data.map(this.date)), Math.max(...this.data.map(this.date))]
      })
    },
    yScale () {
      return scaleLinear({
        range: [this.yMax, 0],
        domain: [
          Math.min(...this.data.map(d => Math.min(this.ny(d), this.sf(d)))),
          Math.max(...this.data.map(d => Math.max(this.ny(d), this.sf(d))))
        ],
        nice: true
      })
    }
  },
  methods: {
    // accessors
    date (d) { return this.parseDate(d.date) },
    ny (d) { return d['New York'] },
    sf (d) { return d['San Francisco'] },
    sf2 (d) { return d['San Francisco'] - 5 }
  },
  components: {
    Group, LinePath, Threshold, Axis, Grid
  }
}
</script>