<template>
  <path
    class="vdc-linepath"
    :d="path(data)"
    :style="pathStyle"
  />
</template>
<script>
import { line } from 'd3-shape'
import { curveLinear } from '../../curve'

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
      default: () => {}
    },
    curve: {
      type: Function,
      default: curveLinear
    }
  },
  methods: {
    path (data) {
      const path = line()
        .x(d => this.xScale(this.x(d)))
        .y(d => this.yScale(this.y(d)))
        .defined(this.defined)
        .curve(this.curve)
      return path(data)
    }
  }
}
</script>
