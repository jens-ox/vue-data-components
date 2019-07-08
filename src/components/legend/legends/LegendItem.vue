<template>
  <div
    class="vx-legend-item"
    :style="computedStyle"
    v-bind="additionalProps(restProps, label)"
  >
    <slot />
  </div>
</template>
<script>
import additionalProps from '../util/additionalProps'

export default {
  props: {
    flexDirection: {
      type: String,
      default: null
    },
    margin: {
      type: String,
      default: null
    },
    label: {
      type: Object,
      required: true
    },
    restProps: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      additionalProps
    }
  },
  computed: {
    computedStyle () {
      return {
        display: 'flex',
        alignItems: 'center',
        flexDirection: this.flexDirection,
        margin: this.margin
      }
    }
  }
}
</script>
