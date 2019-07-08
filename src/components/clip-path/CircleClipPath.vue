<template>
  <ClipPathElement :use-id="useId">
    <circle
      :cx="cx"
      :cy="cy"
      :r="r"
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
    useId: {
      type: String,
      required: true
    },
    cx: {
      type: Number,
      required: true
    },
    cy: {
      type: Number,
      required: true
    },
    r: {
      type: Number,
      required: true
    },
    restProps: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
