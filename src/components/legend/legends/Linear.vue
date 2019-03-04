<template>
  <Legend
    :scale="scale"
    :domain="computedDomain"
    :labelFormat="labelFormat"
    :labelTransform="labelTransform"
    v-bind="restProps"
  />
</template>
<script>
import Legend from './Legend'

export default {
  props: {
    scale: {
      type: Function,
      required: true
    },
    domain: Array,
    steps: {
      type: Number,
      default: 5
    },
    labelFormat: {
      type: Function,
      default: d => d
    },
    labelTransform: {
      type: Function,
      default: ({ scale, labelFormat }) => {
        return (d, i) => {
          return {
            text: `${labelFormat(d, i)}`,
            value: scale(d)
          }
        }
      }
    },
    restProps: Object
  },
  computed: {
    computedDomain () { return this.domain || this.defaultDomain(this.steps, this.scale) }
  },
  methods: {
    defaultDomain ({ steps, scale }) {
      const domain = scale.domain()
      const start = domain[0]
      const end = domain[domain.length - 1]
      const step = (end - start) / (steps - 1)
      return new Array(steps).fill(1).reduce((acc, cur, i) => {
        acc.push(start + i * step)
        return acc
      }, [])
    }
  },
  components: {
    Legend
  }  
}
</script>