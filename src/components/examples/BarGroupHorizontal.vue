<template>
  <div :style="{ position: 'relative', width: width + 'px', height: height + 'px', margin: '0 auto' }">
    <svg
      :width="width"
      :height="height"
    >
      <rect
        :x="0"
        :y="0"
        :width="width"
        :height="height"
        fill="#eaedff"
        :rx="14"
      />
      <Grid
        :top="margin.top"
        :left="margin.left"
        :xScale="xScale"
        :yScale="yScale"
        :width="xMax"
        :height="yMax"
        stroke="black"
        :strokeOpacity="0.1"
        :xOffset="xScale.bandwidth() / 2"
      />
      <BarStack
        :top="margin.top"
        :left="margin.left"
        :data="data"
        :keys="keys"
        :height="yMax"
        :x="x"
        :xScale="xScale"
        :yScale="yScale"
        :zScale="zScale"
        @move="mouseMoveHandler"
        @mouseleave.native="mouseLeaveHandler"
      />
      <Axis
        orientation="bottom"
        :scale="xScale"
        :top="yMax + margin.top"
        :left="margin.left"
        stroke="#a44afe"
        tickStroke="#a44afe"
        :tickLabelProps="{
          'fill': '#a44afe',
          'font-size': 11,
          'text-anchor': 'middle'
        }"
      />
    </svg>
    <div
      :style="{
        position: 'absolute',
        top: `${margin.top / 2 - 10}px`,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '14px'
      }"
    >
      <LegendOrdinal
        :scale="zScale"
        :domain="keys"
        direction="row"
        label-margin="0 15px 0 0"
      />
    </div>

    <Tooltip
      v-if="tooltipOpen"
      :top="tooltipTop"
      :left="tooltipLeft"
      :style="{
        minWidth: 60,
        backgroundColor: 'rgba(0,0,0,0.9)',
        color: 'white'
      }"
    >
      <div :style="{ color: zScale(tooltipData.key) }">
        <strong>{{ tooltipData.key }}</strong>
      </div>
      <div>{{ tooltipData.value }} °F</div>
      <div>
        <small>{{ formatDate(tooltipData.date) }}</small>
      </div>
    </Tooltip>
  </div>
</template>
<script>
import { BarStack } from '../shape'
import { Grid } from '../grid'
import { Axis } from '../axis'
import { cityTemperature } from '../mock-data'
import { scaleBand, scaleLinear, scaleOrdinal } from '../scale'
import { timeParse, timeFormat } from 'd3-time-format'
import { withTooltip, Tooltip } from '../tooltip'
import { LegendOrdinal } from '../legend'
import { max } from 'd3-array'

export default {
  components: {
    BarStack, Grid, Axis, Tooltip, LegendOrdinal
  },
  mixins: [withTooltip],
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
      default: () => { return { top: 10, bottom: 10, left: 10, right: 10 } }
    }
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    parseDate () { return timeParse('%Y%m%d') },
    format () { return timeFormat('%b %d') },
    formatDate () { return date => this.format(this.parseDate(date)) },

    keys () { return Object.keys(this.data[0]).filter(d => d !== 'date') },
    totals () {
      return this.data.reduce((ret, cur) => {
        const t = this.keys.reduce((dailyTotal, k) => {
          dailyTotal += +cur[k]
          return dailyTotal
        }, 0)
        ret.push(t)
        return ret
      }, [])
    },

    // scales
    xScale () {
      return scaleBand({
        rangeRound: [0, this.xMax],
        domain: this.data.map(this.x),
        padding: 0.2,
        tickFormat: () => val => this.formatDate(val)
      })
    },
    yScale () {
      return scaleLinear({
        rangeRound: [this.yMax, 0],
        nice: true,
        domain: [0, max(this.totals)]
      })
    },
    zScale () {
      return scaleOrdinal({
        domain: this.keys,
        range: ['#6c5efb', '#c998ff', '#a44afe']
      })
    },

    // bounds
    xMax () { return this.width - this.margin.left - this.margin.right },
    yMax () { return this.height - this.margin.top - this.margin.bottom }
  },
  beforeMount () {
    this.data = cityTemperature.slice(0, 12)
  },
  methods: {
    // accessors
    x (d) { return d.date },
    y (d) { return d.value },

    // event handlers
    mouseLeaveHandler () {
      this.tooltipTimeout = setTimeout(() => {
        this.hideTooltip()
      }, 300)
    },
    mouseMoveHandler (response) {
      this.showTooltip({
        tooltipData: response.data,
        tooltipTop: response.clientY,
        tooltipLeft: this.xScale(this.x(response.data)) + 0.9 * (this.xMax / this.data.length)
      })
    }
  }
}
</script>
