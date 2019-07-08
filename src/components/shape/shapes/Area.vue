<template>
  <Group v-if="$scopedSlots.path">
    <slot
      name="path"
      :scope="path"
    />
  </Group>
  <Group v-else>
    <path
      class="vdc-area"
      :d="path(data)"
      :style="pathStyle"
    />
  </Group>
</template>
<script>
import { area } from 'd3-shape'
import { Group } from '../../group'

export default {
  components: { Group },
  props: {
    x: {
      type: Function,
      default: null
    },
    x0: {
      type: Function,
      default: null
    },
    x1: {
      type: Function,
      default: null
    },
    y: {
      type: Function,
      default: null
    },
    y0: {
      type: Function,
      default: null
    },
    y1: {
      type: Function,
      default: null
    },
    xScale: {
      type: Function,
      default: null
    },
    yScale: {
      type: Function,
      default: null
    },
    data: {
      type: Array,
      default: () => []
    },
    defined: {
      type: Function,
      default: () => true
    },
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
    curve: {
      type: Function,
      default: null
    }
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
  }
}
</script>
