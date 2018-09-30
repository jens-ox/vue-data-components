<template>
  <path :class="`vx-arc ${className}`" :d="arc(data)" :style="pathStyle" />
</template>
<script>
import { arc as d3Arc } from 'd3-shape'

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    data: Object,
    centroid: Object,
    innerRadius: Number,
    outerRadius: Number,
    cornerRadius: Number,
    startAngle: Number,
    endAngle: Number,
    padAngle: Number,
    padRadius: Number,
    pathStyle: Object
  },
  computed: {
    arc () {
      const arc = d3Arc()
      if (this.centroid) arc.centroid(this.centroid)
      if (this.innerRadius) arc.innerRadius(this.innerRadius)
      if (this.outerRadius) arc.outerRadius(this.outerRadius)
      if (this.cornerRadius) arc.cornerRadius(this.cornerRadius)
      if (this.startAngle) arc.startAngle(this.startAngle)
      if (this.endAngle) arc.endAngle(this.endAngle)
      if (this.padAngle) arc.padAngle(this.padAngle)
      if (this.padRadius) arc.padRadius(this.padRadius)
      return arc
    }
  }
}
</script>
