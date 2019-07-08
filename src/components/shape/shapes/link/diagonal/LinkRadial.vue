<template>
  <path
    class="vdc-link-radius"
    :d="computedPath(data)"
    v-bind="data"
  />
</template>
<script>
import { linkRadial } from 'd3-shape'

export default {
  props: {
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
    data: {
      type: Array,
      required: true
    },
    path: {
      type: Function,
      required: true
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
