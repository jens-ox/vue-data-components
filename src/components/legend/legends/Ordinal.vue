<template>
  <Legend
    :scale="scale"
    :domain="domain"
    :labelFormat="labelFormat"
    :labelTransform="labelTransform"
    :direction="direction"
    v-bind="restProps"
  />
</template>
<script>
import Legend from './Legend'
import valueOrIdentity from '../util/valueOrIdentity'

export default {
  props: {  
    scale: {
      type: Function,
      required: true
    },
    direction: String,
    domain: Array,
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
    restProps: Object
  },
  components: {
    Legend
  }
}
</script>