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
    pathHorizontalLine () {
      return data => {
        const sourceData = this.source(data)
        const targetData = this.target(data)

        const sx = this.x(sourceData)
        const sy = this.y(sourceData)
        const tx = this.x(targetData)
        const ty = this.y(targetData)

        const path = d3Path()
        path.moveTo(sx, sy)
        path.lineTo(tx, ty)

        return path.toString()
      }
    },
    computedPath () {
      return this.path || this.pathHorizontalLine
    }
  }
}
</script>
