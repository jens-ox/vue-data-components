<template>
  <rect
    :class="`vx-bar ${className}`"
    :x="x"
    :y="y"
    :width="width"
    :height="height"
    :rx="rx"
    :ry="ry"
    :style="[rectStyle]"
  />
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
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
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    rx: {
      type: Number,
      default: 0
    },
    ry: {
      type: Number,
      default: 0
    },
    rectStyle: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
