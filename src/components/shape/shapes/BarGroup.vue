<template>
  <Group :top="top" :left="left">
    <Group v-if="data"
      v-for="(d, i) in data"
      v-bind:key="`bar-group-${i}-${x0(d)}`"
      :left="x0Scale(x0(d))"
    >
      <Bar
        v-if="keys"
        v-for="(key, i) in keys"
        v-bind:key="`bar-group-bar-${i}-${d[key]}-${key}`"
        :x="x1Scale(key)"
        :y="yScale(d[key])"
        :width="x1Scale.bandwidth()"
        :height="height - yScale(d[key])"
        :fill="zScale(key)"
        :rx="4"
        :data="{
          key,
          value: d[key],
          x: format(x0(d)),
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
  props: {
    data: {
      type: Array,
      required: true
    },
    x0: {
      type: Function,
      required: true
    },
    x0Scale: {
      type: Function,
      required: true
    },
    x1Scale: {
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
    height: {
      type: Number,
      required: true
    },
    top: Number,
    left: Number
  },
  computed: {
    format () { return this.x0Scale.tickFormat ? this.x0Scale.tickFormat() : d => d }
  },
  components: {
    Group, Bar
  }
}
</script>
