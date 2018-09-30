<template>
  <path
    :ref="innerRef"
    :class="`vx-link ${className}`"
    :d="computedPath(data)"
    v-bind="data"
  />
</template>
<script>

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    innerRef: Function,
    data: Array,
    percent: {
      type: Number,
      default: 0.5
    },
    x: {
      type: Function,
      default: d => d.y
    },
    y: {
      type: Function,
      default: d => d.x
    },
    source: {
      type: Function,
      default: d => d.source
    },
    target: {
      type: Function,
      default: d => d.target
    },
    path: Function
  },
  computed: {
    pathRadialStep () {
      return data => {
        const sourceData = this.source(data)
        const targetData = this.target(data)

        const sx = this.x(sourceData)
        const sy = this.y(sourceData)
        const tx = this.x(targetData)
        const ty = this.y(targetData)

        const sa = sx - Math.PI / 2
        const sr = sy
        const ta = tx - Math.PI / 2
        const tr = ty

        const sc = Math.cos(sa)
        const ss = Math.sin(sa)
        const tc = Math.cos(ta)
        const ts = Math.sin(ta)
        const sf = Math.abs(ta - sa) > Math.PI ? ta <= sa : ta > sa

        return `
          M${sr * sc},${sr * ss}
          A${sr},${sr},0,0,${sf ? 1 : 0},${sr * tc},${sr * ts}
          L${tr * tc},${tr * ts}
        `
      }
    },
    computedPath () {
      return this.path || this.pathRadialStep
    }
  }
}
</script>
