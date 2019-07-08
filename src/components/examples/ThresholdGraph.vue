<template>
  <div>
    <cartesian-graph
      :width="width"
      :height="height"
      :margin="margin"
      :x-scale="xScale"
      :y-scale="yScale"
    >
      <zoom-container
        :width="xMax"
        :height="yMax"
        :x-scale="xScale"
        :y-scale="yScale"
        @newDomains="setDomains"
        @reset="resetDomains"
      >
        <threshold
          :data="data"
          :x="date"
          :y0="sf"
          :y1="sf2"
          :x-scale="xScale"
          :y-scale="yScale"
          :clip-above-to="0"
          :clip-below-to="yMax"
          :below-area-style="{
            strokeWidth: 0,
            fill: 'red',
            fillOpacity: 0.4
          }"
          :above-area-style="{
            strokeWidth: 0,
            fill: 'green',
            fillOpacity: 0.4
          }"
        />
        <LinePath
          :data="data"
          :x="date"
          :y="sf"
          :x-scale="xScale"
          :y-scale="yScale"
          :curve="curveBasis"
          :path-style="{
            stroke: '#000',
            strokeWidth: 1.5,
            strokeOpacity: 0.8,
            strokeDasharray: '1,2',
            fill: 'none'
          }"
        />
        <LinePath
          :data="data"
          :x="date"
          :y="sf2"
          :x-scale="xScale"
          :y-scale="yScale"
          :curve="curveBasis"
          :path-style="{
            stroke: '#000',
            strokeWidth: 1.5,
            fill: 'none'
          }"
        />
      </zoom-container>
    </cartesian-graph>
  </div>
</template>
<script>
import { curveBasis } from '../curve'
import { CartesianGraph } from '../graph'
import { LinePath } from '../shape'
import { Threshold } from '../threshold'
import { scaleTime, scaleLinear } from '../scale'
import { cityTemperature } from '../mock-data'
import { ZoomContainer } from '../zoom'
import { timeParse } from 'd3-time-format'
export default {
  components: {
    LinePath, Threshold, CartesianGraph, ZoomContainer
  },
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    margin: {
      type: Object,
      default: () => { return { top: 30, bottom: 30, left: 30, right: 30 } }
    }
  },
  data () {
    return {
      customDomainX: null,
      customDomainY: null,
      data: cityTemperature,
      curveBasis
    }
  },
  computed: {
    parseDate () { return timeParse('%Y%m%d') },
    // bounds
    xMax () { return this.width - this.margin.left - this.margin.right },
    yMax () { return this.height - this.margin.top - this.margin.bottom },

    // domains
    xDomain () {
      return this.customDomainX || [Math.min(...this.data.map(this.date)), Math.max(...this.data.map(this.date))]
    },
    yDomain () {
      return this.customDomainY || [
        Math.min(...this.data.map(d => Math.min(this.ny(d), this.sf(d)))),
        Math.max(...this.data.map(d => Math.max(this.ny(d), this.sf(d))))
      ]
    },

    // scales
    xScale () {
      return scaleTime({
        range: [0, this.xMax],
        domain: this.xDomain
      })
    },
    yScale () {
      return scaleLinear({
        range: [this.yMax, 0],
        domain: this.yDomain,
        nice: true
      })
    }
  },
  methods: {
    setDomains (domains) {
      this.customDomainX = domains.x
      this.customDomainY = domains.y
    },
    resetDomains () {
      this.customDomainX = null
      this.customDomainY = null
    },
    // accessors
    date (d) { return this.parseDate(d.date) },
    ny (d) { return d['New York'] },
    sf (d) { return d['San Francisco'] },
    sf2 (d) { return d['San Francisco'] - 5 }
  }
}
</script>
