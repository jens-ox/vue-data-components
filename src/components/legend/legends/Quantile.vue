<template>
  <Legend
    :scale="scale"
    :domain="domain"
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
    labelFormat: {
      type: Function,
      default: x => x
    },
    labelTransform: Function,
    labelDelimiter: {
      type: String,
      default: '-'
    },
    restProps: Object
  },
  computed: {
    computedDomain () { return this.domain || this.scale.range() }
  },
  methods: {
    computedLabelTransform (labelDelimiter) {
      return this.labelTransform || this.defaultTransform({ labelDelimiter })
    },
    defaultTransform ({ labelDelimiter }) {
      return ({ scale, labelFormat }) => {
        return (d, i) => {
          const [x0, x1] = scale.invertExtent(d)
          return {
            extent: [x0, x1],
            text: `${labelFormat(x0, i)} ${labelDelimiter} ${labelFormat(x1, i)}`,
            value: scale(x0),
            datum: d,
            index: i
          }
        }
      }
    }
  },
  components: {
    Legend
  } 
}
</script>