<!--
  A cartesian graph usually contains the following components:
  - 0, 1, or 2 axes (with optional label)
  - grid
  - crosshair
  - tooltip
  - markers
  - hidden voronoi tessellation for selection

-->
<template>
  <svg :width="width" :height="height">
    <group class="graph-outer">

      <!-- two options for y axis -->
      <axis-left v-if="!yHideAxis && !yRight"
        :top="margin.top"
        :left="margin.left"
        :scale="yScale"
        :hideZero="yHideZero"
        :numTicks="yTicks || yTickCount"
        :labelOffset="yLabelOffset"
        :label="yLabel"
      />
      <axis-right v-if="!yHideAxis && yRight"
        :top="margin.top"
        :left="width - margin.right"
        :scale="yScale"
        :hideZero="xHideZero"
        :numTicks="yTicks || yTickCount"
        :labelOffset="xLabelOffset"
        :label="yLabel"
      />

      <!-- two options for x axis -->
      <axis-bottom v-if="!xHideAxis && !xTop"
        :top="height - margin.bottom"
        :left="margin.left"
        :scale="xScale"
        :numTicks="xTicks || xTickCount"
        :tickRotate="45"
        :tickLabelProps="{
          'dx': '0.75em',
          'dy': '0.25em'
        }"
        :labelOffset="25"
        :label="xLabel"
      />
      <axis-top v-if="!xHideAxis && xTop"
        :top="margin.top"
        :left="margin.left"
        :scale="xScale"
        :numTicks="xTicks || xTickCount"
        :tickRotate="45"
        :tickLabelProps="{
          'dx': '0.75em',
          'dy': '0.25em'
        }"
        :labelOffset="25"
        :label="xLabel"
      />
    </group>
    <group class="graph-inner" :top="margin.top" :left="margin.left">

      <!-- grid -->
      <grid v-if="!hideGrid"
        :xScale="xScale"
        :yScale="yScale"
        :width="innerWidth"
        :height="innerHeight"
        :numTicksRows="yTicks || yTickCount"
        :numTicksColumns="xTicks || xTickCount"
      />

      <slot></slot>
    </group>
  </svg>
</template>
<script>
import { Group } from '../group'
import { Grid } from '../grid'
import { AxisLeft, AxisBottom, AxisTop, AxisRight } from '../axis'

export default {
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
      default: () => {
        return {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }
    },
    hideGrid: {
      type: Boolean,
      default: false
    },
    hideLinesY: {
      type: Boolean,
      default: false
    },
    hideLinesX: {
      type: Boolean,
      default: false
    },
    xHideAxis: {
      type: Boolean,
      default: false
    },
    yHideAxis: {
      type: Boolean,
      default: false
    },
    xScale: Function,
    yScale: Function,
    xTicks: Number,
    yTicks: Number,
    xLabel: {
      type: String,
      default: 'X'
    },
    yLabel: {
      type: String,
      default: 'Y'
    },
    xTop: {
      type: Boolean,
      default: false
    },
    yRight: {
      type: Boolean,
      default: false
    },
    xHideZero: {
      type: Boolean,
      default: false
    },
    yHideZero: {
      type: Boolean,
      default: false
    },
    xLabelOffset: {
      type: Number,
      default: 40
    },
    yLabelOffset: {
      type: Number,
      default: 40
    }
  },
  computed: {

    // dimensions
    innerWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    innerHeight () {
      return this.height - this.margin.top - this.margin.bottom
    },

    // ticks
    yTickCount () {
      if (this.height <= 300) return 3
      if (this.height > 300 && this.height <= 600) return 5
      return 10
    },
    xTickCount () {
      if (this.width <= 300) return 2
      if (this.width > 300 && this.width <= 400) return 5
      return 10
    }
  },
  components: {
    Group, Grid, AxisLeft, AxisBottom, AxisTop, AxisRight
  }
}
</script>
