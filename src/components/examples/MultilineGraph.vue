<template>
  <div>
    <cartesian-graph
      :width="width"
      :height="height"
      :margin="margin"
      :x-scale="xScale"
      :y-scale="yScale"
      :x-axis="{
        label: {
          text: 'Time'
        }
      }"
      :y-axis="{
        label: {
          text: '€ per sec'
        }
      }"
    >
      <zoom-container
        :width="innerWidth"
        :height="innerHeight"
        :x-scale="xScale"
        :y-scale="yScale"
        @newDomains="setDomains"
        @reset="resetDomains"
      >
        <!-- lines -->
        <line-sequence
          v-for="(d, i) in series"
          :key="`lines-${i}`"
          :sequence="d"
          :x="x"
          :y="y"
          :x-scale="xScale"
          :y-scale="yScale"
          :path-style="{}"
          :is-active="i === activeSeries"
          :active-style="{ stroke: 'red', strokeWidth: 2 }"
          :is-inactive="activeSeries !== -1 && activeSeries !== i"
          :inactive-style="{ stroke: 'rgba(0,0,0,0.2)' }"
        />

        <!-- voronoi paths -->
        <multi-sequence-voronoi
          :series="series"
          :x="x"
          :y="y"
          :x-scale="xScale"
          :y-scale="yScale"
          :width="innerWidth"
          :height="innerHeight"
          :move-handler="moveHandler"
          :out-handler="outHandler"
        />
      </zoom-container>
    </cartesian-graph>
  </div>
</template>
<script>
import { ZoomContainer } from '../zoom'
import { CartesianGraph } from '../graph'
import { LineSequence } from '../primitive'
import { genDateValue } from '../mock-data'
import { scaleTime, scaleLinear } from '../scale'
import { MultiSequenceVoronoi } from '../voronoi'
import { extent, max, merge } from 'd3-array'

export default {
  components: {
    CartesianGraph,
    LineSequence,
    MultiSequenceVoronoi,
    ZoomContainer
  },
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      series: [],
      activeSeries: -1,
      margin: { top: 20, left: 60, bottom: 60, right: 20 },
      customDomainX: null,
      customDomainY: null
    }
  },
  computed: {
    // scales
    xScale () {
      return scaleTime({
        range: [0, this.innerWidth],
        domain: this.computedXDomain
      })
    },
    yScale () {
      return scaleLinear({
        range: [this.innerHeight, 0],
        domain: this.computedYDomain
      })
    },

    computedXDomain () {
      return this.customDomainX || extent(merge(this.series), this.x)
    },
    computedYDomain () {
      return this.customDomainY || [0, 1.1 * max(merge(this.series), this.y)]
    },

    // dimensions
    innerWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    innerHeight () {
      return this.height - this.margin.top - this.margin.bottom
    }
  },
  beforeMount () {
    this.series = this.genLines(4)
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
    genLines (num) {
      return new Array(num).fill(1).map(() => {
        return genDateValue(25)
      })
    },

    // accessors
    x (d) {
      return d.date
    },
    y (d) {
      return d.value
    },

    // handlers
    moveHandler (point) {
      this.activeSeries = point.indexSeries
    },
    outHandler () {
      this.activeSeries = -1
    }
  }
}
</script>
