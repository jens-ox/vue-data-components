<template>
  <Group :top="top" :left="left">
    <LineShape v-for="(d, i) in ticks"
      v-bind:key="`column-line-${d}-${i}`"
      :from="fromPoint(x(d))"
      :to="toPoint(x(d))"
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
    height: Number,
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
    x (d) { return this.offset ? this.scale(d) + this.offset : this.scale(d) },
    fromPoint (x) { return new Point({ x, y: 0 }) },
    toPoint (x) { return new Point({ x, y: this.height }) }
  },
  components: {
    LineShape, Group
  }
}
</script>
