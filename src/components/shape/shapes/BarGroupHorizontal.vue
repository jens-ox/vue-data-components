<template>
  <Group
    v-if="data && keys"
    :top="top"
    :left="left"
  >
    <Group
      v-for="(d, i) in data"
      :key="`bar-group-${i}-${y0(d)}`"
      :top="y0Scale(y0(d))"
    >
      <Bar
        v-for="(key, j) in keys"
        :key="`bar-group-bar-${i}-${d[key]}-${j}`"
        :x="0"
        :y="y1Scale(key)"
        :width="width - xScale(d[key])"
        :height="y1Scale.bandwidth()"
        :fill="zScale(key)"
        :data="{
          key,
          value: d[key],
          y: format(y0(d)),
          data: d
        }"
      />
    </Group>
  </Group>
</template>
<script>
import { Group } from '../../group'
import Bar from './Bar'

export default {
  components: { Group, Bar },
  props: {
    data: {
      type: Array,
      required: true
    },
    y0: {
      type: Function,
      required: true
    },
    y0Scale: {
      type: Function,
      required: true
    },
    y1Scale: {
      type: Function,
      required: true
    },
    xScale: {
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
    width: {
      type: Number,
      required: true
    },
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    }
  },
  computed: {
    format () { return this.y0Scale.tickFormat ? this.y0Scale.tickFormat() : d => d }
  }
}
</script>
