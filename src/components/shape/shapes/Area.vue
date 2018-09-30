<template>
  <Group v-if="$scopedSlots.path">
    <slot name="path" :scope="path" />
  </Group>
  <Group v-else>
    <path
      :ref="innerRef"
      :class="`vx-area ${className}`"
      :d="path(data)"
      :style="pathStyle"
    />
  </Group>
</template>
<script>
import { area } from 'd3-shape'
import { Group } from '../../group'

export default {
  props: {
    x: Function,
    x0: Function,
    x1: Function,
    y: Function,
    y0: Function,
    y1: Function,
    xScale: Function,
    yScale: Function,
    data: {
      type: Array,
      default: () => []
    },
    defined: {
      type: Function,
      default: () => true
    },
    className: [String, Boolean, Object, Array],
    innerRef: Function,
    pathStyle: {
      type: Object,
      default: () => {
        return {
          strokeWidth: 2,
          stroke: 'black',
          fill: 'rgba(0,0,0,0.3)'
        }
      }
    },
    curve: Function
  },
  computed: {
    path () {
      const path = area()
      if (this.x) path.x((...args) => this.xScale(this.x(...args)))
      if (this.x0) path.x0((...args) => this.xScale(this.x0(...args)))
      if (this.x1) path.x1((...args) => this.xScale(this.x1(...args)))
      if (this.y) path.y((...args) => this.yScale(this.y(...args)))
      if (this.y0) path.y0((...args) => this.yScale(this.y0(...args)))
      if (this.y1) path.y1((...args) => this.yScale(this.y1(...args)))
      if (this.defined) path.defined(this.defined)
      if (this.curve) path.curve(this.curve)
      return path
    }
  },
  components: {
    Group
  }
}
</script>
