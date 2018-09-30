<template>
  <path
    :ref="innerRef"
    :class="`vx-link ${className}`"
    :d="computedPath(data)"
    v-bind="data"
  />
</template>
<script>
import { path as d3Path } from 'd3-path'

export default {
  props: {
    innerRef: Function,
    className: {
      type: String,
      default: ''
    },
    data: Array,
    path: Function,
    x: {
      type: Function,
      default: d => d.x
    },
    y: {
      type: Function,
      default: d => d.y
    },
    source: {
      type: Function,
      default: d => d.source
    },
    target: {
      type: Function,
      default: d => d.target
    },
    percent: {
      type: Number,
      default: 0.2
    }
  },
  computed: {
    pathRadialCurve () {
      return data => {
        const sourceData = this.source(data)
        const targetData = this.target(data)

        const sa = this.x(sourceData) - Math.PI / 2
        const sr = this.y(sourceData)
        const ta = this.x(targetData) - Math.PI / 2
        const tr = this.y(targetData)

        const sc = Math.cos(sa)
        const ss = Math.sin(sa)
        const tc = Math.cos(ta)
        const ts = Math.sin(ta)

        const sx = sr * sc
        const sy = sr * ss
        const tx = tr * tc
        const ty = tr * ts

        const dx = tx - sx
        const dy = ty - sy
        const ix = this.percent * (dx + dy)
        const iy = this.percent * (dy - dx)

        const path = d3Path()
        path.moveTo(sx, sy)
        path.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty)

        return path.toString()
      }
    },
    computedPath () {
      return this.path || this.pathRadialCurve
    }
  }
}
</script>
