<template>
  <Group class="vx-grid" :top="top" :left="left">
    <Rows v-if="!hideXLines"
      :scale="yScale"
      :width="width"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-opacity="strokeOpacity"
      :stroke-dasharray="strokeDasharray"
      :numTicks="numTicksRows"
      :style="rowLineStyle"
      :offset="yOffset"
    />
    <Columns v-if="!hideYLines"
      :scale="xScale"
      :height="height"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-opacity="strokeOpacity"
      :stroke-dasharray="strokeDasharray"
      :numTicks="numTicksColumns"
      :style="columnLineStyle"
      :offset="xOffset"
    />
  </Group>
</template>
<script>
import { Group } from '../group'
import Rows from './Rows'
import Columns from './Columns'

export default {
  props: {
    hideXLines: {
      type: Boolean,
      default: false
    },
    hideYLines: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    xScale: Function,
    yScale: Function,
    width: Number,
    height: Number,
    stroke: String,
    strokeWidth: {
      type: Number,
      default: 1
    },
    strokeOpacity: {
      type: Number,
      default: 1
    },
    strokeDasharray: String,
    numTicksRows: Number,
    numTicksColumns: Number,
    rowLineStyle: Object,
    columnLineStyle: Object,
    xOffset: Number,
    yOffset: Number
  },
  components: {
    Group, Rows, Columns
  }
}
</script>
