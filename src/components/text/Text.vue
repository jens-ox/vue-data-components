<template>
  <g
    :transform="`rotate(${rotate},${x},${y})`"
  >
    <text
      :x="x"
      :y="y"
      :dx="dx"
      :dy="dy"
      v-wrapper="{
        text, width, align, lineHeight, padding, paddingLeft, paddingRight
      }"
      :style="textStyle"
    />
  </g>
</template>
<script>
import wrapper from './textWrap'

export default {
  props: {
    text: { type: String, required: true },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    dx: { type: Number, default: 0 },
    dy: { type: Number, default: 0 },
    rotate: { type: [Number, String], default: 0 },
    textStyle: {
      type: Object,
      default: () => ({})
    },
    width: { type: [Number, String], default: null },
    align: {
      type: String,
      default: 'baseline',
      validator: value => ['top', 'baseline', 'bottom', 'middle'].includes(value)
    },
    lineHeight: {
      type: [String, Number],
      default: '1.125em'
    },
    padding: { type: Number, default: 0 },
    paddingLeft: { type: Number, default: 0 },
    paddingRight: { type: Number, default: 0 }
  },
  directives: {
    wrapper
  }
}
</script>
