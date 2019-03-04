<template>
  <div
    :class="`vx-tooltip-portal ${className}`"
    v-bind:style="computedStyle"
    v-bind="restProps"
  >
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    left: Number,
    top: Number,
    className: {
      type: String,
      default: ''
    },
    restProps: Object
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
