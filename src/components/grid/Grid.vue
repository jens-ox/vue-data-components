<template>
  <Group class="vx-grid" :top="top" :left="left">
    <grid-lines v-if="!hideHorizontalLines"
      type="horizontal"
      :scale="yScale"
      :width="width"
      :lineStyle="computedHorizontalLineStyle"
      :numTicks="numTicksHorizontal"
      :offset="yOffset"
    />
    <grid-lines v-if="!hideVerticalLines"
      type="vertical"
      :scale="xScale"
      :height="height"
      :lineStyle="computedVerticalLineStyle"
      :numTicks="numTicksVertical"
      :offset="xOffset"
    />
  </Group>
</template>
<script>
import GridLines from './GridLines'
import { Group } from '../group'

export default {
  props: {
    hideHorizontalLines: { type: Boolean, default: false },
    hideVerticalLines: { type: Boolean, default: false },
    top: { type: Number, default: 0 },
    left: { type: Number, default: 0 },
    xScale: Function,
    yScale: Function,
    width: Number,
    height: Number,
    lineStyle: {
      type: Object,
      default: () => ({
        stroke: '#eaf0f6',
        strokeWidth: 1
      })
    },
    numTicksHorizontal: Number,
    numTicksVertical: Number,
    horizontalLineStyle: Object,
    verticalLineStyle: Object,
    xOffset: Number,
    yOffset: Number
  },
  computed: {
    computedHorizontalLineStyle () {
      return { ...this.lineStyle, ...this.horizontalLineStyle }
    },
    computedVerticalLineStyle () {
      return { ...this.lineStyle, ...this.verticalLineStyle }
    }
  },
  components: {
    Group, GridLines
  }
}
</script>
