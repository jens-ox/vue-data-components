<template>
  <rect
    class="vdc-bar"
    :x="x"
    :y="y"
    :width="width"
    :height="height"
    :rx="rx"
    :ry="ry"
    :style="_barStyle"
  />
</template>
<script>
import deepmerge from 'deepmerge'

export default {
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    rx: {
      type: Number,
      default: 0
    },
    ry: {
      type: Number,
      default: 0
    },
    barStyle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    _barStyle() {
      return deepmerge(
        {
          fill: 'rgba(0,0,0,0.2)',
          stroke: 'black'
        },
        this.barStyle
      )
    }
  }
}
</script>
