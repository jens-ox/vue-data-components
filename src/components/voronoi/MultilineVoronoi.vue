<template>
  <group>
    <path
      v-for="(polygon, i) in voronoiPolygons"
      :key="`polygon-${i}`"
      stroke="none"
      fill="rgba(0,0,0,0)"
      :d="polygon.path ? `M${polygon.path.join('L')}Z` : null"
      @mouseover="voronoiHoverHandler(polygon.offset)"
      @click="voronoiClickHandler(polygon.offset)"
    />
  </group>
</template>
<script>
import { Group } from '../group'
import { Delaunay } from 'd3-delaunay'

export default {
  props: {
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
    hoverHandler: Function,
    clickHandler: Function
  },
  computed: {
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
    },
    voronoi () {
      return this.delaunay.voronoi([
        0,
        0,
        this.innerWidth,
        this.innerHeight
      ])
    },
    voronoiPolygons () {
      const iterator = this.voronoi.cellPolygons()
      let polygon = iterator.next()
      let array = []
      let done = polygon.done
      let offset = 0
      while (!done) {
        array.push({
          offset,
          path: polygon.value
        })
        polygon = iterator.next()
        offset++
        done = polygon.done
      }
      return array
    }
  },
  methods: {
    voronoiClickHandler (offset) {
      if (this.clickHandler) this.clickHandler(this.data[offset])
    },

    /**
     * retrieves line and point information
     */
    voronoiHoverHandler (offset) {
      if (this.hoverHandler) this.hoverHandler(this.data[offset])
    }
  },
  components: {
    Group
  }
}
</script>
