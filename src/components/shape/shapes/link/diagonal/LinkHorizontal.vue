<template>
  <path
    class="vdc-link-horizontal"
    :d="computedPath"
    v-bind="data"
  />
</template>
<script>
import { linkHorizontal } from 'd3-shape'

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    path: {
      type: Function,
      required: true
    },
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
    }
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
