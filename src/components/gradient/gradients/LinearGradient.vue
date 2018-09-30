<template>
  <defs>
    <linearGradient
      :id="useID"
      :x1="x1"
      :y1="y1"
      :x2="x2"
      :y2="y2"
      :gradientTransform="rotate ? `rotate(${rotate})` : transform"
      v-bind="restProps"
    >
      <slot />
      <stop :offset="fromOffset" :stop-color="from" :stop-opacity="fromOpacity" v-if="!$slots.default" />
      <stop :offset="toOffset" :stop-color="to" :stop-opacity="toOpacity" v-if="!$slots.default" />
    </linearGradient>
  </defs>
</template>
<script>
export default {
  props: {
    useID: {
      type: String,
      required: true
    },
    from: String,
    to: String,
    x1: {
      type: String,
      default: '0'
    },
    x2: {
      type: String,
      default: '0'
    },
    y1: {
      type: String,
      default: '0'
    },
    y2: {
      type: String,
      default: '1'
    },
    fromOffset: {
      type: String,
      default: '0%'
    },
    fromOpacity: {
      type: Number,
      default: 1
    },
    toOffset: {
      type: String,
      default: '100%'
    },
    toOpacity: {
      type: Number,
      default: 1
    },
    rotate: Object,
    transform: String,
    vertical: {
      type: Boolean,
      default: true
    },
    restProps: Object
  }
}
</script>
