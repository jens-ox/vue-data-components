<template>
  <div
    class="vx-legend-label"
    :style="{
      justifyContent: align,
      display: 'flex',
      flex: '1',
      margin
    }"
  >
    {{ label }}
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    margin: {
      type: String,
      required: true
    },
    align: {
      type: String,
      default: ''
    }
  }
}
</script>