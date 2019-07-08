<template>
  <Group
    :top="top"
    :left="left"
  >
    <LineShape
      v-for="(d, i) in ticks"
      :key="`${type}-line-${d}-${i}`"
      :from="fromPoint(d)"
      :to="toPoint(d)"
      :line-style="_lineStyle"
    />
  </Group>
</template>
<script>
import deepmerge from 'deepmerge'
import { LineShape } from '../shape'
import { Group } from '../group'
import { AbstractPoint as Point } from '../point'

export default {
  components: { LineShape, Group },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['horizontal', 'vertical'].includes(value)
    },
    scale: { type: Function, required: true },
    length: { type: Number, required: true },
    top: { type: Number, default: 0 },
    left: { type: Number, default: 0 },
    tickCount: { type: Number, default: 10 },
    lineStyle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ticks () { return this.scale.ticks ? this.scale.ticks(this.tickCount) : this.scale.domain() },
    _lineStyle () {
      return deepmerge({
        stroke: '#eaf0f6',
        strokeWidth: 1
      }, this.lineStyle)
    }
  },
  methods: {
    fromPoint (value) {
      return this.type === 'horizontal' ? new Point({ x: 0, y: this.scale(value) }) : new Point({ x: this.scale(value), y: 0 })
    },
    toPoint (d) {
      return this.type === 'horizontal' ? new Point({ x: this.length, y: this.scale(d) }) : new Point({ x: this.scale(d), y: this.length })
    }
  }
}
</script>
