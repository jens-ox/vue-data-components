<template>
  <circle
    :style="computedStyle"
    :cx="xPos"
    :cy="yPos"
    :r="r"
  />
</template>
<script>
export default {
  props: {
    xPos: {
      type: Number,
      required: true
    },
    yPos: {
      type: Number,
      required: true
    },
    r: {
      type: Number,
      default: 2
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isInactive: {
      type: Boolean,
      default: false
    },
    pointStyle: {
      type: Object,
      default: () => {}
    },
    activeStyle: {
      type: Object,
      default: () => {}
    },
    inactiveStyle: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    computedStyle () {
      if (this.isActive) {
        return { ...this.pointStyle, ...this.activeStyle }
      }
      if (this.isInactive) {
        return { ...this.pointStyle, ...this.inactiveStyle }
      }
      return this.pointStyle
    }
  }
}
</script>
