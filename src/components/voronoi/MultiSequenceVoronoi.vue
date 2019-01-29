<template>
  <group v-on:mouseleave.native="voronoiOutHandler">
    <rect :width="innerWidth" :height="innerHeight" fill-opacity="0" @mousemove="mouseMoveHandler"/>
  </group>
</template>
<script>
import { Group } from '../group'
import { Delaunay } from 'd3-delaunay'

export default {
  props: {
    voronoiComputationCounter: {
      type: Number,
      default: 0
    },
    series: {
      type: Array,
      required: true
    },
    x: {
      type: Function,
      required: true
    },
    y: {
      type: Function,
      required: true
    },
    xScale: {
      type: Function,
      required: true
    },
    yScale: {
      type: Function,
      required: true
    },
    innerWidth: {
      type: Number,
      required: true
    },
    innerHeight: {
      type: Number,
      required: true
    },
    recomputeVoronoi: {
      type: Boolean,
      default: true
    },
    hoverHandler: Function,
    clickHandler: Function,
    outHandler: Function
  },
  watch: {
    voronoiComputationCounter () {
      if (this.recomputeVoronoi) return
      this.computedDelaunay = this.delaunay
    }
  },
  data () {
    return {
      computedDelaunay: {}
    }
  },
  beforeMount () {
    if (this.recomputeVoronoi) return
    this.computedDelaunay = this.delaunay
  },
  computed: {
    proxyDelaunay () {
      return this.recomputeVoronoi ? this.delaunay : this.computedDelaunay
    },
    data () {
      return this.series.reduce((rec, d, i) => {
        return rec.concat(d.map((point, j) => {
          return {
            ...point,
            indexSeries: i,
            indexPoints: j
          }
        }))
      }, [])
    },
    delaunay () {
      return Delaunay.from(this.data, d => this.xScale(this.x(d)), d => this.yScale(this.y(d)))
    }
  },
  methods: {
    getOffset (e) {
      const bounding = e.target.getBoundingClientRect()
      return this.proxyDelaunay.find(e.layerX - bounding.x, e.layerY - bounding.y)
    },
    voronoiClickHandler (e) {
      if (this.clickHandler) this.clickHandler(this.data[this.getOffset(e)])
    },

    /**
     * retrieves line and point information
     */

    voronoiOutHandler () {
      if (this.outHandler) this.outHandler()
    },

    mouseMoveHandler (e) {
      if (this.hoverHandler) this.hoverHandler(this.data[this.getOffset(e)])
    }
  },
  components: {
    Group
  }
}
</script>
