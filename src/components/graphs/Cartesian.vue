<!--
  A cartesian graph usually contains the following components:
  - 0, 1, or 2 axes (with optional label)
  - grid
  - crosshair
  - tooltip
  - markers
  - hidden voronoi tessellation for selection

-->
<template>
  <group :top="margin.top" :left="margin.left">

    <!-- grid -->
    <grid
      v-if="!hideGrid"
      :height="innerHeight"
      :width="innerWidth"
      :hideXLines="hideXLines"
      :hideYLines="hideYLines"
    />
  </group>
</template>
<script>
import { Group } from '../group'
import { Grid } from '../grid'
export default {
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
      type: Object,
      default: () => {
        return {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }
    },
    hideGrid: {
      type: Boolean,
      default: false
    },
    hideYLines: {
      type: Boolean,
      default: false
    },
    hideXLines: {
      type: Boolean,
      default: false
    },
    xScale: Function,
    yScale: Function
  },
  computed: {
    innerWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    innerHeight () {
      return this.height - this.margin.top - this.margin.bottom
    },
    computedXScale () {
      if (this.xScale) return this.xScale
      // const range = this.xRange || [0, innerWidth]
    }
  },
  components: {
    Group, Grid
  }
}
</script>
