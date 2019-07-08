<template>
  <svg
    :width="width"
    :height="height"
  >

    <!-- grid -->
    <grid
      v-if="!grid.hide"
      v-bind="_grid"
    />

    <!-- y axis -->
    <axis
      v-if="!yAxis.hide"
      v-bind="_yAxis"
    />

    <!-- x axis -->
    <axis
      v-if="!xAxis.hide"
      v-bind="_xAxis"
    />

    <!-- inner graph -->
    <group
      class="graph-inner"
      :top="margin.top"
      :left="margin.left"
    >
      <slot />
    </group>
  </svg>
</template>
<script>
import deepmerge from 'deepmerge'
import { Group } from '../group'
import { Grid } from '../grid'
import { Axis } from '../axis'

export default {
  components: {
    Group, Grid, Axis
  },
  props: {
    // scaling
    xScale: { type: Function, required: true },
    yScale: { type: Function, required: true },

    // dimensions
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    margin: {
      type: Object,
      default: () => {
        return { top: 0, left: 0, right: 0, bottom: 0 }
      }
    },

    // components
    grid: { type: Object, default: () => ({}) },
    xAxis: { type: Object, default: () => ({}) },
    yAxis: { type: Object, default: () => ({}) }
  },
  computed: {
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
    },

    // grid
    _grid () {
      return deepmerge({
        hide: false,
        xScale: this.xScale,
        yScale: this.yScale,
        width: this.width - this.margin.left - this.margin.right,
        height: this.height - this.margin.bottom - this.margin.top,
        top: this.margin.top,
        left: this.margin.left,
        linesHorizontal: {
          tickCount: this._yAxis.ticks.count
        },
        linesVertical: {
          tickCount: this._xAxis.ticks.count
        }
      }, this.grid)
    },

    // x axis
    _xAxis () {
      return deepmerge({
        orientation: 'bottom',
        top: this.height - this.margin.bottom,
        left: this.margin.left,
        scale: this.xScale,
        ticks: {
          count: this.xTickCount
        }
      }, this.xAxis)
    },

    // y axis
    _yAxis () {
      return deepmerge({
        orientation: 'left',
        top: this.margin.top,
        left: this.margin.left,
        scale: this.yScale,
        ticks: {
          count: this.yTickCount
        }
      }, this.yAxis)
    }
  }
}
</script>
