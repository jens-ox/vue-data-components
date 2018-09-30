<template>
  <g>
    <path
      :ref={innerRef}
      :className="`vx-area-closed ${className}`"
      :d="path(data)"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-dasharray="strokeDasharray"
      :fill="fill"
      :transform="`translate(${left}, ${top})`"
      v-bind="restProps"
    />
  </g>
</template>
<script>
import { area } from 'd3-shape'
import { curveLinear } from '../../curve'

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
    x: Function,
    y: Function,
    y0: Function,
    xScale: Function,
    yScale: Function,
    data: Array,
    defined: {
      type: Function,
      default: () => true
    },
    className: {
      type: String,
      default: ''
    },
    strokeDasharray: String,
    strokeWidth: {
      type: Number,
      default: 2
    },
    stroke: {
      type: String,
      default: 'black'
    },
    fill: {
      type: String,
      default: 'rgba(0,0,0,0.3)'
    },
    curve: {
      type: Function,
      default: curveLinear
    },
    innerRef: Function,
    restProps: Object
  },
  methods: {
    path (data) {
      let path = area()
        .x(d => this.xScale(this.x(d)))
        .y0(this.y0 || this.yScale.range()[0])
        .y1(d => this.yScale(this.y(d)))
        .defined(this.defined)

      if (this.curve) path.curve(this.curve)

      return path(data)
    }
  }
}
</script>
