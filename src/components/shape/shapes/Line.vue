<template>
  <line
    class="vdc-line"
    :x1="from.x"
    :y1="from.y"
    :x2="to.x"
    :y2="to.y"
    :style="_style"
  />
</template>
<script>
import deepmerge from 'deepmerge'
import { AbstractPoint as Point } from '../../point'

export default {
  props: {
    from: {
      type: Object,
      default: new Point({ x: 0, y: 0 })
    },
    to: {
      type: Object,
      default: new Point({ x: 1, y: 1 })
    },
    lineStyle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    _style() {
      return deepmerge(
        {
          stroke: 'black',
          strokeWidth: 1
        },
        this.lineStyle
      )
    }
  }
}
</script>
