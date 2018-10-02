<template>
  <Group :class="`vx-columns ${className}`" :top="top" :left="left">
    <LineShape v-for="(d, i) in ticks"
      v-bind:key="`column-line-${d}-${i}`"
      :from="fromPoint(x(d))"
      :to="toPoint(x(d))"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-dasharray="strokeDasharray"
      :style="lineStyle"
      v-bind="restProps"
    />
  </Group>
</template>
<script>
import { LineShape } from '../shape'
import { Group } from '../group'
import { AbstractPoint as Point } from '../point'

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
    scale: Function,
    height: Number,
    stroke: {
      type: String,
      default: '#eaf0f6'
    },
    strokeWidth: {
      type: Number,
      default: 1
    },
    strokeDasharray: String,
    className: {
      type: String,
      default: ''
    },
    numTicks: {
      type: Number,
      default: 10
    },
    lineStyle: Object,
    offset: Number,
    restProps: Object
  },
  computed: {
    ticks () { return this.scale.ticks ? this.scale.ticks(this.numTicks) : this.scale.domain() }
  },
  methods: {
    x (d) { return this.offset ? this.scale(d) + this.offset : this.scale(d) },
    fromPoint (x) { return new Point({ x, y: 0 }) },
    toPoint (x) { return new Point({ x, y: this.height }) }
  },
  components: {
    LineShape, Group
  }
}
</script>
