<template>
  <line-path
    :data="sequence"
    :x="x"
    :y="y"
    :x-scale="xScale"
    :y-scale="yScale"
    :path-style="computedStyle"
    :curve="curve"
  />
</template>
<script>
import { LinePath } from '../shape'
import { curveLinear } from '../curve'
export default {
  components: { LinePath },
  props: {
    xScale: {
      type: Function,
      required: true
    },
    yScale: {
      type: Function,
      required: true
    },
    sequence: {
      type: Array,
      required: true
    },
    x: {
      type: Function,
      required: true
    },
    y: {
      type: Function,
      required: true
    },
    pathStyle: {
      type: Object,
      default: () => ({})
    },
    activeStyle: {
      type: Object,
      default: () => ({})
    },
    isActive: Boolean,
    isInactive: Boolean,
    inactiveStyle: {
      type: Object,
      default: () => ({})
    },
    curve: {
      type: Function,
      default: curveLinear
    }
  },
  data () {
    return {
      defaultStyle: {
        fill: 'none',
        stroke: 'rgba(0,0,0,0.5)',
        strokeWidth: 1
      }
    }
  },
  computed: {
    computedStyle () {
      let style = { ...this.defaultStyle, ...this.pathStyle }
      if (this.isActive) {
        return { ...style, ...this.activeStyle }
      }
      if (this.isInactive) {
        return { ...style, ...this.inactiveStyle }
      }
      return style
    }
  }
}
</script>
