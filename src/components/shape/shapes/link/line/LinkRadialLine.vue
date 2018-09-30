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
    className: {
      type: String,
      default: ''
    },
    innerRef: Function,
    data: Array,
    percent: {
      type: Number,
      default: 0.2
    },
    x: {
      type: Function,
      default: d => d.y
    },
    y: {
      type: Function,
      default: d => d.x
    },
    source: {
      type: Function,
      default: d => d.source
    },
    target: {
      type: Function,
      default: d => d.target
    },
    path: Function
  },
  computed: {
    pathRadialLine () {
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

        const path = d3Path()
        path.moveTo(sr * sc, sr * ss)
        path.lineTo(tr * tc, tr * ts)

        return path.toString()
      }
    },
    computedPath () {
      return this.path || this.pathRadialLine
    }
  }
}
</script>
