<template>
  <div
    class="vx-legend-shape"
    :style="{
      display: 'flex',
      width: !!size ? size(label) : width,
      height: !!size ? size(label) : height,
      margin
    }"
  >
    <component
      :is="`shape-${shape}`"
      :width="width"
      :height="height"
      :fill="fill(label)"
      :size="size(label)"
      :set-style="shapeStyle(label)"
    />
  </div>
</template>
<script>
import ShapeRect from '../shapes/Rect'
import ShapeCircle from '../shapes/Circle'

import valueOrIdentity from '../util/valueOrIdentity'

export default {
  components: {
    ShapeRect, ShapeCircle
  },
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    margin: {
      type: String,
      required: true
    },
    label: {
      type: Object,
      required: true
    },
    fill: {
      type: Function,
      default: valueOrIdentity
    },
    size: {
      type: Function,
      default: () => {}
    },
    shape: {
      type: String,
      default: 'rect'
    },
    shapeStyle: {
      type: Function,
      default: () => undefined
    }
  }
}
</script>
