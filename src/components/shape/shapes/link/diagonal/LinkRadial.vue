<template>
  <path
    :ref="innerRef"
    :class="`vx-link-radius ${className}`"
    :d="computedPath(data)"
    v-bind="data"
  />
</template>
<script>
import { linkRadial } from 'd3-shape'

export default {
  props: {
    innerRef: Function,
    angle: {
      type: Function,
      default: d => d.x
    },
    radius: {
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
    data: Array,
    path: Function,
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    pathRadialDiagonal () {
      return data => {
        const link = linkRadial()
        link.angle(this.angle)
        link.radius(this.radius)
        link.source(this.source)
        link.target(this.target)
        return link(data)
      }
    },
    computedPath () {
      return this.path || this.pathRadialDiagonal
    }
  }
}
</script>
