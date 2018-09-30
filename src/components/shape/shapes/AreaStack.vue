<template>
  <g :transform="`translate(${left}, ${top})`">
    <path
      v-for="(series, i) in seriesData"
      v-bind:key="`area-stack-${i}-${series.key || ''}`"
      :class="`vx-area-stack ${className}`"
      :d="path(series)"
      v-bind="restProps"
    />
    <g
      v-if="!!glyph" className="vx-area-stack-glyphs"
      :transform="`translate(${left}, ${top})`"
    >{{ data.map(glyph) }}</g>
  </g>
</template>
<script>
import { area, stack as d3stack } from 'd3-shape'

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    keys: Array,
    data: Array,
    curve: Function,
    defined: Boolean,
    x: Function,
    x0: Function,
    x1: Function,
    y0: Function,
    y1: Function,
    glyph: Array,
    reverse: {
      type: Boolean,
      default: false
    },
    restProps: Object
  },
  computed: {
    stack () {
      let stack = d3stack()
      if (this.keys) stack.keys(this.keys)

      return stack
    },
    seriesData () {
      const seriesData = this.stack(this.data)
      if (this.reverse) seriesData.reverse()

      return seriesData
    },
    path () {
      let path = area()

      if (this.x) path.x(this.x)
      if (this.x0) path.x0(this.x0)
      if (this.x1) path.x1(this.x1)
      if (this.y0) path.y0(this.y0)
      if (this.y1) path.y1(this.y1)
      if (this.curve) path.curve(this.curve)
      if (this.defined) path.defined(this.defined)

      return path
    }
  }
}
</script>
