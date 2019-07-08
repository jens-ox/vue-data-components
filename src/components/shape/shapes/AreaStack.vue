<template>
  <g :transform="`translate(${left}, ${top})`">
    <path
      v-for="(series, i) in seriesData"
      :key="`area-stack-${i}-${series.key || ''}`"
      class="`vdc-area-stack"
      :d="path(series)"
    />
    <g
      v-if="!!glyph"
      class="vdc-area-stack-glyphs"
      :transform="`translate(${left}, ${top})`"
    >
      {{ data.map(glyph) }}
    </g>
  </g>
</template>
<script>
import { area, stack as d3stack } from 'd3-shape'

export default {
  props: {
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    keys: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    curve: {
      type: Function,
      required: true
    },
    defined: Boolean,
    x: {
      type: Function,
      required: true
    },
    x0: {
      type: Function,
      required: true
    },
    x1: {
      type: Function,
      required: true
    },
    y0: {
      type: Function,
      required: true
    },
    y1: {
      type: Function,
      required: true
    },
    glyph: {
      type: Array,
      required: true
    },
    reverse: {
      type: Boolean,
      default: false
    }
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
