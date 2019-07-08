<template>
  <div
    :class="`vx-tooltip-portal ${className}`"
    :style="computedStyle"
    v-bind="restProps"
  >
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    className: {
      type: String,
      default: ''
    },
    restProps: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    computedStyle: function () {
      return {
        position: 'absolute',
        backgroundColor: 'white',
        color: '#666666',
        padding: '.3rem .5rem',
        borderRadius: '3px',
        fontSize: '14px',
        boxShadow: '0 1px 2px rgba(33,33,33,0.2)',
        lineHeight: '1em',
        pointerEvents: 'none',
        top: `${this.top}px`,
        left: `${this.left}px`
      }
    }
  }
}
</script>
