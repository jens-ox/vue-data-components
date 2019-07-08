<template>
  <defs>
    <radialGradient
      :id="useId"
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
    </radialGradient>
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
