<template>
  <Group class="vdc-grid" :top="top" :left="left">
    <grid-lines
      v-if="!_linesHorizontal.hide"
      v-bind="_linesHorizontal"
    />
    <grid-lines
      v-if="!_linesVertical.hide"
      v-bind="_linesVertical"
    />
  </Group>
</template>
<script>
import deepmerge from 'deepmerge'
import GridLines from './GridLines'
import { Group } from '../group'

export default {
  props: {
    // scaling
    xScale: { type: Function, required: true },
    yScale: { type: Function, required: true },

    // dimensions
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    top: { type: Number, default: 0 },
    left: { type: Number, default: 0 },

    // children
    linesHorizontal: { type: Object, default: () => ({}) },
    linesVertical: { type: Object, default: () => ({}) },
    lineStyle: { type: Object, default: () => ({}) }
  },
  computed: {
    _linesHorizontal () {
      return deepmerge({
        type: 'horizontal',
        scale: this.yScale,
        length: this.width,
        hide: false,
        lineStyle: this.lineStyle
      }, this.linesHorizontal)
    },
    _linesVertical () {
      return deepmerge({
        type: 'vertical',
        scale: this.xScale,
        length: this.height,
        hide: false,
        lineStyle: this.lineStyle
      }, this.linesVertical)
    }
  },
  components: {
    Group, GridLines
  }
}
</script>
