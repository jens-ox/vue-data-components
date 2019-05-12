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
      :setStyle="shapeStyle(label)"
    ></component>
  </div>
</template>
<script>
import ShapeRect from '../shapes/Rect'
import ShapeCircle from '../shapes/Circle'

import valueOrIdentity from '../util/valueOrIdentity'

export default {
  props: {
    width: Number,
    height: Number,
    margin: String,
    label: Object,
    fill: {
      type: Function,
      default: valueOrIdentity
    },
    size: {
      type: Function,
      default: () => {},
    },
    shape: {
      type: String,
      default: 'rect'
    },
    shapeStyle: {
      type: Function,
      default: () => undefined
    }
  },
  components: {
    ShapeRect, ShapeCircle
  }
}
</script>