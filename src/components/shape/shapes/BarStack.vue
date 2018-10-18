<template>
  <Group
    :top="top"
    :left="left"
  >
    <Group
      v-if="series"
      v-for="(s, i) in series"
      :key="`vx-bar-stack-${i}`"
    >
      <Bar
        v-for="(d, ii) in s"
        :key="`bar-group-bar-${i}-${ii}-${s.key}`"
        :x="xScale(x(d.data))"
        :y="yScale(d[1])"
        :width="bandwidth"
        :height="barHeight(d)"
        :fill="zScale(s.key)"
        :data="{
          bandwidth,
          paddingInner,
          paddingOuter,
          step,
          key: s.key,
          value: d[1],
          height: barHeight(d),
          width: bandwidth,
          x: x(d.data),
          xFormatted: format(x(d.data)),
          data: d.data
        }"
        v-on:mousemove.native="movementHandler(s.key, d[1], d.data, $event)"
      />
    </Group>
  </Group>
</template>
<script>
import { Group } from '../../group'
import Bar from './Bar'
import { stack as d3stack } from 'd3-shape'

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    x: {
      type: Function,
      required: true
    },
    xScale: {
      type: Function,
      required: true
    },
    yScale: {
      type: Function,
      required: true
    },
    zScale: {
      type: Function,
      required: true
    },
    keys: {
      type: Array,
      required: true
    },
    top: Number,
    left: Number,
    height: Number
  },
  computed: {
    series () { return d3stack().keys(this.keys)(this.data) },
    format () { return this.xScale.tickFormat ? this.xScale.tickFormat() : d => d },
    bandwidth () { return this.xScale.bandwidth() },
    step () { return this.xScale.step() },
    paddingInner () { return this.xScale.paddingInner() },
    paddingOuter () { return this.xScale.paddingOuter() }
  },
  methods: {
    barHeight (d) { return this.yScale(d[0]) - this.yScale(d[1]) },
    movementHandler (key, value, data, $event) {
      if (this.$listeners && this.$listeners.move) {
        this.$emit('move', {
          clientX: $event.layerX,
          clientY: $event.layerY,
          data: {
            ...data, key, value
          }
        })
      }
    }
  },
  components: {
    Group, Bar
  }
}
</script>
