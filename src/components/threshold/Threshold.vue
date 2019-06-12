<template>
  <g :class="`vdc-threshold ${className}`">
    <AreaShape :curve="curve" :data="data" :x="x" :y1="y1" :xScale="xScale" :yScale="yScale">
      <g slot="path" slot-scope="{scope:path}">
        <ClipPathElement useID="threshold-clip-below">
          <path :d="path.y0(clipBelowTo)(data)" />
        </ClipPathElement>
        <ClipPathElement useID="threshold-clip-above">
          <path :d="path.y0(clipAboveTo)(data)" />
        </ClipPathElement>
      </g>
    </AreaShape>
    <AreaShape
      :curve="curve"
      :data="data"
      :x="x"
      :y0="y0"
      :y1="y1"
      :xScale="xScale"
      :yScale="yScale"
      clip-path="url(#threshold-clip-below)"
      :pathStyle="belowAreaStyle"
    />
    <AreaShape
      :curve="curve"
      :data="data"
      :x="x"
      :y0="y0"
      :y1="y1"
      :xScale="xScale"
      :yScale="yScale"
      clip-path="url(#threshold-clip-above)"
      :pathStyle="aboveAreaStyle"
    />
  </g>
</template>
<script>
import { AreaShape } from '../shape'
import { ClipPathElement } from '../clip-path'

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    curve: Function,
    xScale: Function,
    yScale: Function,
    clipAboveTo: Number,
    clipBelowTo: Number,
    data: Array,
    x: Function,
    y0: Function,
    y1: Function,
    aboveAreaStyle: Object,
    belowAreaStyle: Object
  },
  components: {
    AreaShape, ClipPathElement
  }
}
</script>