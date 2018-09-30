<template>
  <path
    :ref="innerRef"
    :class="`vx-link-horizontal ${className}`"
    :d="computedPath"
    v-bind="data"
  />
</template>
<script>
import { linkHorizontal } from 'd3-shape'

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    innerRef: Function,
    data: Object,
    x: {
      type: Function,
      default (d) { return d.x }
    },
    y: {
      type: Function,
      default (d) { return d.y }
    },
    source: {
      type: Function,
      default (d) { return d.source }
    },
    target: {
      type: Function,
      default (d) { return d.target }
    },
    path: Function
  },
  computed: {
    pathHorizontalDiagonal () {
      let link = linkHorizontal()
      link.x(this.y)
      link.y(this.x)
      link.source(this.source)
      link.target(this.target)
      return link(this.data)
    },
    computedPath () {
      return this.path ? this.path(this.data) : this.pathHorizontalDiagonal
    }
  }
}
</script>
