<template>
  <group>
    <point
      v-for="(point, i) in points"
      :key="`point-${i}`"
      :x-pos="xScale(x(point))"
      :y-pos="yScale(y(point))"
      :r="r(point, i)"
      :point-style="computedStyle(i)"
    />
  </group>
</template>
<script>
import { Group } from '../group'
import Point from './Point'

export default {
  components: { Group, Point },
  props: {
    points: {
      type: Array,
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
    x: {
      type: Function,
      required: true
    },
    y: {
      type: Function,
      required: true
    },
    r: {
      type: Function,
      default: () => 2
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isInactive: {
      type: Boolean,
      default: false
    },
    activePoint: {
      type: Number,
      default: -1
    },
    pointStyle: {
      type: Object,
      default: () => {}
    },
    activeStyle: {
      type: Object,
      default: () => {}
    },
    inactiveStyle: {
      type: Object,
      default: () => {}
    },
    activePointStyle: {
      type: Object,
      default: () => {}
    },
    sameIndexStyle: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    computedStyle (i) {
      if (this.isActive) {
        // point is in active line and hovered
        if (this.activePoint === i) {
          return { ...this.pointStyle, ...this.activeStyle, ...this.activePointStyle }
        }

        // point is in active line but not hovered
        return { ...this.pointStyle, ...this.activeStyle }
      }
      if (this.isInactive) {
        if (this.activePoint === i) {
          // point is in inactive line but has same index
          return { ...this.pointStyle, ...this.inactiveStyle, ...this.sameIndexStyle }
        }

        // point is in inactive line and has different index
        return { ...this.pointStyle, ...this.inactiveStyle }
      }

      // no current interaction
      return this.pointStyle
    }
  }
}
</script>
