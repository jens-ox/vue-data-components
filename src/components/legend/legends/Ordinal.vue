<template>
  <Legend
    :scale="scale"
    :domain="domain"
    :label-format="labelFormat"
    :label-transform="labelTransform"
    :direction="direction"
    v-bind="restProps"
  />
</template>
<script>
import Legend from './Legend'
import valueOrIdentity from '../util/valueOrIdentity'

export default {
  components: { Legend },
  props: {
    scale: {
      type: Function,
      required: true
    },
    direction: {
      type: String,
      default: ''
    },
    domain: {
      type: Array,
      required: true
    },
    labelTransform: {
      type: Function,
      default: ({ scale, labelFormat }) => {
        return (d, i) => {
          return {
            datum: d,
            index: i,
            text: `${labelFormat(d, i)}`,
            value: scale(d)
          }
        }
      }
    },
    labelFormat: {
      type: Function,
      default: valueOrIdentity
    },
    restProps: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
