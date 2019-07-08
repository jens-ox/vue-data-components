<template>
  <Group
    :top="top"
    :left="left"
  >
    <g
      v-for="(arcInstance, i) in arcs"
      :key="`pie-arc-${i}`"
    >
      <path v-bind="renderFunctionArguments.generatePathProps(arcInstance, i)" />
      <text
        v-if="renderFunctionArguments.generateCentroid(arcInstance)"
        fill="white"
        text-anchor="middle"
        :x="labelX(arcInstance)"
        :y="labelY(arcInstance)"
        dy=".33em"
        :font-size="9"
      >
        {{ labelText(arcInstance) }}
      </text>
    </g>
  </Group>
</template>
<script>
import { Group } from '../../group'
import { arc as d3Arc, pie as d3Pie } from 'd3-shape'

export default {
  components: { Group },
  props: {
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      required: true
    },
    centroid: {
      type: Function,
      default: null
    },
    innerRadius: {
      type: Number,
      default: 0
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
      default: 0
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
    fill: {
      type: String,
      default: 'white'
    },
    fillOpacity: {
      type: Function,
      default: () => 1
    },
    pieSort: {
      type: Function,
      default: null
    },
    pieSortValues: {
      type: Function,
      default: null
    },
    pieValue: {
      type: Function,
      default: null
    }
  },
  computed: {
    path () {
      const path = d3Arc()
      path.innerRadius(this.innerRadius)
      if (this.outerRadius) path.outerRadius(this.outerRadius)
      if (this.cornerRadius) path.cornerRadius(this.cornerRadius)
      if (this.padRadius) path.padRadius(this.padRadius)
      return path
    },
    pie () {
      const pie = d3Pie()
      if (this.pieSort !== undefined) pie.sort(this.pieSort)
      if (this.pieSortValues !== undefined) pie.sortValues(this.pieSortValues)
      if (this.pieValue) pie.value(this.pieValue)
      if (this.padAngle != null) pie.padAngle(this.padAngle)
      if (this.startAngle != null) pie.startAngle(this.startAngle)
      if (this.endAngle != null) pie.endAngle(this.endAngle)
      return pie
    },
    arc () { return this.pie(this.data) },
    arcs () { return this.pie(this.data) },
    renderFunctionArguments () {
      return {
        arcs: this.arcs,
        generatePathProps: (arc, index) => ({
          d: this.path(arc),
          'outer-radius': this.outerRadius,
          'inner-radius': this.innerRadius,
          fill: this.fill,
          'fill-opacity': this.fillOpacity(arc),
          'corner-radius': this.cornerRadius,
          'pad-angle': this.padAngle,
          index,
          centroid: this.centroid ? this.path.centroid(arc) : undefined
        }),
        generateCentroid: arc => this.centroid && this.centroid(this.path.centroid(arc), arc)
      }
    }
  },
  methods: {
    labelX (arc) {
      return this.renderFunctionArguments.generateCentroid(arc).x
    },
    labelY (arc) {
      return this.renderFunctionArguments.generateCentroid(arc).y
    },
    labelText (arc) {
      return this.renderFunctionArguments.generateCentroid(arc).text
    }
  }
}
</script>
