<template>
  <Group :class="`vx-rows ${className}`" :top="top" :left="left">
    <LineShape
      v-for="(d, i) in ticks"
      v-bind:key="`row-line-${d}-${i}`"
      :from="fromPoint(y(d))"
      :to="toPoint(y(d))"
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
import { Point } from '../point'

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
    width: Number,
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
    y (d) { return this.offset ? this.scale(d) + this.offset : this.scale(d) },
    fromPoint (y) { return new Point({ x: 0, y }) },
    toPoint (y) { return new Point({ x: this.width, y }) }
  },
  components: {
    LineShape, Group
  }
}
</script>
