<template>
  <path
    class="vdc-arc"
    :d="arc(data)"
    :style="pathStyle"
  />
</template>
<script>
import { arc as d3Arc } from 'd3-shape'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    centroid: {
      type: Object,
      default: null
    },
    innerRadius: {
      type: Number,
      default: null
    },
    outerRadius: {
      type: Number,
      default: null
    },
    cornerRadius: {
      type: Number,
      default: null
    },
    startAngle: {
      type: Number,
      default: null
    },
    endAngle: {
      type: Number,
      default: null
    },
    padAngle: {
      type: Number,
      default: null
    },
    padRadius: {
      type: Number,
      default: null
    },
    pathStyle: {
      type: Object,
      default: () => ({})
    }
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
