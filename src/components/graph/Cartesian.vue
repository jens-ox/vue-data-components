<template>
  <svg :width="width" :height="height">
    <group class="graph-outer">

      <!-- y axis -->
      <axis v-if="!yHideAxis"
        :orientation="yRight ? 'right' : 'left'"
        :top="margin.top"
        :left="margin.left"
        :scale="yScale"
        :hideZero="yHideZero"
        :ticks="{
          count: yTicks || yTickCount,
          label: {
            dx: '-0.25em'
          }
        }"
        :label="{
          text: yLabel,
          offset: yLabelOffset
        }"
      />

      <!-- two options for x axis -->
      <axis v-if="!xHideAxis"
        :orientation="xTop ? 'top' : 'bottom'"
        :top="height - margin.bottom"
        :left="margin.left"
        :scale="xScale"
        :ticks="{
          count: xTicks || xTickCount,
          rotate: 45,
          label: {
            dx: '0.75em',
            dy: '0.25em'
          }
        }"
        :label="{
          text: xLabel,
          offset: 35
        }"
      />
    </group>
    <group class="graph-inner" :top="margin.top" :left="margin.left">

      <!-- grid -->
      <grid v-if="!hideGrid"
        :xScale="xScale"
        :yScale="yScale"
        :width="innerWidth"
        :height="innerHeight"
        :lineStyle="{
          stroke: 'grey',
          strokeDasharray: '5,5'
        }"
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
import { Axis } from '../axis'

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
      default: 30
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
    Group, Grid, Axis
  }
}
</script>
