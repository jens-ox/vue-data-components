<template>
  <g
    class="vdc-group"
    :transform="transform || `translate(${left}, ${top})`"
  >
    <slot />
  </g>
</template>
<script>
export default {
  props: {
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    transform: String
  }
}
</script>
