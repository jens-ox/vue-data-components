<template>
  <g>
    <path
      class="vdc-linepath"
      :d="path(data)"
      :style="computedPathStyle"
    />
    <g class="vx-linepath-glyphs">
      <slot />
    </g>
  </g>
</template>
<script>
import { line } from 'd3-shape'
import { curveLinear } from '../../curve'

export default {
  data () {
    return {
      defaultStyle: {
        fill: 'none',
        stroke: 'rgba(0,0,0,0.5)',
        strokeWidth: 1
      }
    }
  },
  props: {
    xScale: Function,
    yScale: Function,
    data: Array,
    x: Function,
    y: Function,
    defined: {
      type: Function,
      default: () => true
    },
    pathStyle: {
      type: Object,
      default: () => {}
    },
    activeStyle: {
      type: Object,
      default: () => {}
    },
    isActive: Boolean,
    isInactive: Boolean,
    inactiveStyle: {
      type: Object,
      default: () => {}
    },
    curve: {
      type: Function,
      default: curveLinear
    }
  },
  computed: {
    computedPathStyle () {
      let style = { ...this.defaultStyle, ...this.pathStyle }
      if (this.isActive) {
        return { ...style, ...this.activeStyle }
      }
      if (this.isInactive) {
        return { ...style, ...this.inactiveStyle }
      }
      return style
    }
  },
  methods: {
    path (data) {
      const path = line()
        .x(d => this.xScale(this.x(d)))
        .y(d => this.yScale(this.y(d)))
        .defined(this.defined)
        .curve(this.curve)
      return path(data)
    }
  }
}
</script>
