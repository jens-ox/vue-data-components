<template>
  <defs>
    <clipPath
      :id="useId"
      v-bind="restProps"
    >
      <slot />
    </clipPath>
  </defs>
</template>
<script>
export default {
  props: {
    useId: {
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
