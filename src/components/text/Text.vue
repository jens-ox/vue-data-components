<template>
  <g :transform="`translate(${x},${y}),rotate(${rotate})`">
    <text
      v-wrapper="{
        text,
        width,
        align,
        lineHeight,
        padding,
        paddingLeft,
        paddingRight
      }"
      :dx="dx"
      :dy="dy"
      :style="_textStyle"
    />
  </g>
</template>
<script>
import wrapper from './textWrap'
import deepmerge from 'deepmerge'

export default {
  directives: { wrapper },
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
      validator: value =>
        ['top', 'baseline', 'bottom', 'middle'].includes(value)
    },
    lineHeight: {
      type: [String, Number],
      default: '1.125em'
    },
    padding: { type: Number, default: 0 },
    paddingLeft: { type: Number, default: 0 },
    paddingRight: { type: Number, default: 0 }
  },
  computed: {
    _textStyle () {
      return deepmerge(
        {
          fill: 'black'
        },
        this.textStyle
      )
    }
  }
}
</script>
