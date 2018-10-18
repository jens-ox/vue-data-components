<template>
  <Group :top="top" :left="left">
    <LineShape
      v-for="(d, i) in ticks"
      :key="`row-line-${d}-${i}`"
      :from="fromPoint(y(d))"
      :to="toPoint(y(d))"
      :lineStyle="lineStyle"
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
    width: Number,
    numTicks: {
      type: Number,
      default: 10
    },
    lineStyle: {
      type: Object,
      default: () => ({
        stroke: '#eaf0f6',
        strokeWidth: 1
      })
    },
    offset: Number
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
