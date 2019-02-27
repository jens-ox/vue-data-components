<template>
  <group
    v-on:mouseleave.native="outHandler"
  >
    <path
      v-for="(polygon, i) in proxyPolygons"
      :key="`polygon-${i}`"
      :class="_paths.class(polygon, i)"
      :style="_paths.style(polygon, i)"
      :d="polygon.path ? `M${polygon.path.join('L')}Z` : null"
      @mouseover="_paths.hoverHandler(data[polygon.offset])"
      @click="_paths.clickHandler(data[polygon.offset])"
    />
  </group>
</template>
<script>
import { Group } from '../group'
import { Delaunay } from 'd3-delaunay'

export default {
  props: {
    recompute: {
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
    paths: Object,
    outHandler: {
      type: Function,
      default: () => {}
    }
  },
  watch: {
    recompute () {
      if (this.recomputeVoronoi) return
      this.computedPolygons = this.voronoiPolygons
    }
  },
  data () {
    return {
      computedPolygons: {}
    }
  },
  beforeMount () {
    if (this.recomputeVoronoi) return
    this.computedPolygons = this.voronoiPolygons
  },
  computed: {
    _paths () {
      return {
        hoverHandler: () => {},
        clickHandler: () => {},
        class: () => 'voronoi-default',
        style: () => {},
        ...this.paths
      }
    },
    proxyPolygons () {
      return this.recomputeVoronoi ? this.voronoiPolygons : this.computedPolygons
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
  components: {
    Group
  }
}
</script>
<style scoped>
.voronoi-default {
  stroke: none;
  fill: rgba(0, 0, 0, 0);
}
</style>
