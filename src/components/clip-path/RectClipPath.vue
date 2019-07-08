<template>
  <ClipPathElement
    :use-id="useID"
  >
    <rect
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      v-bind="restProps"
    />
  </ClipPathElement>
</template>
<script>
import ClipPathElement from './ClipPath'

export default {
  components: {
    ClipPathElement
  },
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: 1
    },
    useID: {
      type: String,
      required: true
    },
    restProps: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
