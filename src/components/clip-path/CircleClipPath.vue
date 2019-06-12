<template>
  <ClipPathElement :useID="useID">
    <circle :cx="cx" :cy="cy" :r="r" v-bind="restProps" />
  </ClipPathElement>
</template>
<script>
import ClipPathElement from './ClipPath'

export default {
  props: {
    useID: {
      type: String,
      required: true
    },
    cx: Number,
    cy: Number,
    r: Number,
    restProps: Object
  },
  components: {
    ClipPathElement
  }
}
</script>