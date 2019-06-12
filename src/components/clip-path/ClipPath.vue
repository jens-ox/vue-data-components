<template>
  <defs>
    <clipPath :id="useID" v-bind="restProps">
      <slot />
    </clipPath>
  </defs>
</template>
<script>
export default {
  props: {
    useID: {
      type: String,
      required: true
    },
    restProps: Object
  }
}
</script>