<template>
  <defs>
    <linearGradient
      :id="useId"
      :x1="x1"
      :y1="y1"
      :x2="x2"
      :y2="y2"
      :gradient-transform="rotate ? `rotate(${rotate})` : transform"
    >
      <slot />
      <stop
        v-if="!$slots.default"
        :offset="fromOffset"
        :stop-color="from"
        :stop-opacity="fromOpacity"
      />
      <stop
        v-if="!$slots.default"
        :offset="toOffset"
        :stop-color="to"
        :stop-opacity="toOpacity"
      />
    </linearGradient>
  </defs>
</template>
<script>
export default {
  props: {
    useId: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    x1: {
      type: String,
      default: '0'
    },
    x2: {
      type: String,
      default: '1'
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
    rotate: {
      type: String,
      default: null
    },
    transform: {
      type: String,
      default: ''
    }
  }
}
</script>
