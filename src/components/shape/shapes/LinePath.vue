<template>
  <path
    :d="path"
    :style="pathStyle"
  />
</template>
<script>
import deepmerge from 'deepmerge'
import { line } from 'd3-shape'
import { curveLinear } from '../../curve'

const defaultStyle = {
  stroke: 'black',
  strokeWidth: 1
}

export default {
  props: {
    xScale: Function,
    yScale: Function,
    data: Array,
    x: Function,
    y: Function,
    defined: {
      type: Function,
      default: () => true
    },
    pathStyle: {
      type: Object,
      default: () => ({})
    },
    curve: {
      type: Function,
      default: curveLinear
    }
  },
  computed: {
    _style () {
      return deepmerge(defaultStyle, this.pathStyle)
    },
    path () {
      const path = line()
        .x(d => this.xScale(this.x(d)))
        .y(d => this.yScale(this.y(d)))
        .defined(this.defined)
        .curve(this.curve)
      return path(this.data)
    }
  }
}
</script>
