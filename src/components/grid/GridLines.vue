<template>
  <Group :top="top" :left="left">
    <LineShape v-for="(d, i) in ticks"
      :key="`${type}-line-${d}-${i}`"
      :from="fromPoint(d)"
      :to="toPoint(d)"
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
    type: { type: String, required: true },
    top: { type: Number, default: 0 },
    left: { type: Number, default: 0 },
    scale: Function,
    width: Number,
    height: Number,
    numTicks: { type: Number, default: 10 },
    offset: { type: Number, default: 0 },
    lineStyle: {
      type: Object,
      default: () => ({
        stroke: '#eaf0f6',
        strokeWidth: 1
      })
    }
  },
  computed: {
    ticks () { return this.scale.ticks ? this.scale.ticks(this.numTicks) : this.scale.domain() }
  },
  methods: {
    pos (d) { return this.scale(d) + this.offset },
    fromPoint (value) {
      return this.type === 'horizontal' ? new Point({ x: 0, y: this.pos(value) }) : new Point({ x: this.pos(value), y: 0 })
    },
    toPoint (d) {
      return this.type === 'horizontal' ? new Point({ x: this.width, y: this.pos(d) }) : new Point({ x: this.pos(d), y: this.height })
    }
  },
  components: { LineShape, Group }
}
</script>
