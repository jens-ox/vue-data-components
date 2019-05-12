<template>
  <Legend
    :scale="scale"
    :domain="computedDomain"
    :labelFormat="labelFormat"
    :labelTransform="computedLabelTransform(labelDelimiter, labelLower, labelUpper)"
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
    labelTransform: Function,
    labelFormat: {
      type: Function,
      default: d => d
    },
    labelDelimiter: {
      type: String,
      default: 'to'
    },
    labelLower: {
      type: String,
      default: 'Less than'
    },
    labelUpper: {
      type: String,
      default: 'More than '
    },
    restProps: Object
  },
  computed: {
    computedDomain () {
      return this.domain || this.scale.range()
    }
  },
  methods: {
    computedLabelTransform (labelDelimiter, labelLower, labelUpper) {
      return this.labelTransform ||
        this.defaultTransform({
          labelDelimiter,
          labelLower,
          labelUpper
        })
    },
    defaultTransform ({ labelDelimiter, labelLower, labelUpper }) {
      return ({ scale, labelFormat }) => {
        function format(labelFormat, value, i) {
          const formattedValue = labelFormat(value, i)
          if (formattedValue === 0) return '0'
          return formattedValue || ''
        }
        return (d, i) => {
          let [x0, x1] = scale.invertExtent(d)
          let delimiter = ` ${labelDelimiter} `
          let value
          if (x0 !== 0 && !x0 && (x1 === 0 || !!x1)) {
            // lower threshold
            value = x1 - 1
            delimiter = labelLower
          } else if ((x0 === 0 || !!x0) && (x1 === 0 || !!x1)) {
            // threshold step
            value = x0
          } else if (!x1 && (x0 === 0 || !!x0)) {
            // upper threshold
            value = x0 + scale.domain()[1]
            x1 = x0
            x0 = undefined
            delimiter = labelUpper
          }
          return {
            extent: [x0, x1],
            text: `${format(labelFormat, x0, i)}${delimiter}${format(labelFormat, x1, i)}`,
            value: scale(value),
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
