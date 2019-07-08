<template>
  <g :class="`vdc-threshold ${className}`">
    <AreaShape
      :curve="curve"
      :data="data"
      :x="x"
      :y1="y1"
      :x-scale="xScale"
      :y-scale="yScale"
    >
      <g
        slot="path"
        slot-scope="{scope:path}"
      >
        <ClipPathElement :use-id="`threshold-clip-below-${_uid}`">
          <path :d="path.y0(clipBelowTo)(data)" />
        </ClipPathElement>
        <ClipPathElement :use-id="`threshold-clip-above-${_uid}`">
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
      :x-scale="xScale"
      :y-scale="yScale"
      :clip-path="`url(#threshold-clip-below-${_uid})`"
      :path-style="belowAreaStyle"
    />
    <AreaShape
      :curve="curve"
      :data="data"
      :x="x"
      :y0="y0"
      :y1="y1"
      :x-scale="xScale"
      :y-scale="yScale"
      :clip-path="`url(#threshold-clip-above-${_uid})`"
      :path-style="aboveAreaStyle"
    />
  </g>
</template>
<script>
import { AreaShape } from '../shape'
import { ClipPathElement } from '../clip-path'
import { curveBasis } from '../curve'

export default {
  components: { AreaShape, ClipPathElement },
  props: {
    className: {
      type: String,
      default: ''
    },
    curve: {
      type: Function,
      default: curveBasis
    },
    xScale: {
      type: Function,
      required: true
    },
    yScale: {
      type: Function,
      required: true
    },
    clipAboveTo: {
      type: Number,
      required: true
    },
    clipBelowTo: {
      type: Number,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    x: {
      type: Function,
      required: true
    },
    y0: {
      type: Function,
      required: true
    },
    y1: {
      type: Function,
      required: true
    },
    aboveAreaStyle: {
      type: Object,
      default: () => ({})
    },
    belowAreaStyle: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
