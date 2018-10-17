<template>
  <line
    class="vdc-line"
    :x1="from.x"
    :y1="from.y"
    :x2="to.x"
    :y2="to.y"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :stroke-dasharray="strokeDasharray"
    :transform="transform"
    v-bind="restProps"
  />
</template>
<script>
import { AbstractPoint as Point } from '../../point'

export default {
  props: {
    from: {
      type: Object,
      default: new Point({ x: 0, y: 0 })
    },
    to: {
      type: Object,
      default: new Point({ x: 1, y: 1 })
    },
    stroke: {
      type: String,
      default: 'black'
    },
    strokeWidth: {
      type: Number,
      default: 1
    },
    strokeDasharray: {
      type: String,
      default: ''
    },
    transform: {
      type: String,
      default: ''
    },
    data: Array,
    restProps: Object
  }
}
</script>
