<template>
  <g>
    <path
      class="vdc-line-radial"
      :d="path(data)"
      :fill="fill"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-opacity="strokeOpacity"
      :stroke-linecap="strokeLinecap"
      :curve="curve"
    />
  </g>
</template>
<script>
import { radialLine } from 'd3-shape'
import { curveBasisOpen } from '../../curve'

export default {
  props: {
    angle: {
      type: Function,
      default: null
    },
    radius: {
      type: Function,
      default: null
    },
    defined: Boolean,
    data: {
      type: Array,
      required: true
    },
    fill: {
      type: String,
      default: 'none'
    },
    stroke: {
      type: String,
      default: 'black'
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    strokeOpacity: {
      type: Number,
      default: 1
    },
    curve: {
      type: Function,
      default: curveBasisOpen
    },
    strokeLinecap: {
      type: String,
      default: 'round'
    }
  },
  computed: {
    path () {
      const path = radialLine()
      if (this.angle) path.angle(this.angle)
      if (this.radius) path.radius(this.radius)
      if (this.defined) path.defined(this.defined)
      if (this.curve) path.curve(this.curve)
      return path
    }
  }
}
</script>
