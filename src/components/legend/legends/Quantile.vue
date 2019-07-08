<template>
  <Legend
    :scale="scale"
    :domain="domain"
    :label-format="labelFormat"
    :label-transform="labelTransform"
    v-bind="restProps"
  />
</template>
<script>
import Legend from './Legend'

export default {
  components: { Legend },
  props: {
    scale: {
      type: Function,
      required: true
    },
    domain: {
      type: Array,
      required: true
    },
    labelFormat: {
      type: Function,
      default: x => x
    },
    labelTransform: {
      type: Function,
      default: null
    },
    labelDelimiter: {
      type: String,
      default: '-'
    },
    restProps: {
      type: Object,
      default: () => ({})
    }
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
  }
}
</script>
