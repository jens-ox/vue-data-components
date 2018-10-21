<template>
  <Group :top="top" :left="left">

    <!-- ticks -->
    <Group
      v-for="(val, index) in _ticks.values"
      v-if="!hideSubZero || val > 0"
      :key="`vx-tick-${val}-${index}`"
      :transform="_ticks.transform"
    >

      <LineShape v-if="!_ticks.hide" :from="tickFromPoint(val)" :to="tickToPoint(val)" :lineStyle="_ticks.lineStyle" />
      <text
        :transform="tickLabelTransform(val)"
        v-bind="_ticks.label"
      >{{ _ticks.format(val, index) }}</text>
    </Group>

    <!-- axis line -->
    <LineShape
      v-if="!_line.hide"
      :from="axisFromPoint"
      :to="axisToPoint"
      :lineStyle="_line.lineStyle"
    />

    <!-- axis label -->
    <text
      v-if="_label.text"
      class="vdc-axis-label"
      v-bind="_label"
    >
      {{ _label.text }}
    </text>
  </Group>
</template>
<script>
import { LineShape } from '../shape'
import { AbstractPoint as Point } from '../point'
import { Group } from '../group'
import deepmerge from 'deepmerge'

export default {
  props: {
    top: { type: Number, default: 0 },
    left: { type: Number, default: 0 },
    hideSubZero: { type: Boolean, default: false },
    rangePadding: { type: Number, default: 0 },
    scale: { type: Function, required: true },

    label: Object,
    ticks: Object,
    line: Object,

    orientation: {
      type: String,
      default: 'bottom',
      validator: value => ['top', 'bottom', 'left', 'right'].includes(value)
    }
  },
  computed: {
    _ticks () {
      // pre-set parameters used for computation
      const count = (this.ticks && this.ticks.count) ? this.ticks.count : 10

      return deepmerge({
        hide: false,
        count,
        rotate: 0,
        length: 8,
        transform: '',
        values: this.scale.ticks ? this.scale.ticks(count) : this.scale.domain(),
        format: this.scale.tickFormat ? this.scale.tickFormat() : d => d,
        lineStyle: {
          stroke: 'black',
          strokeWidth: 1,
          fontSize: 10
        },
        label: {
          style: {
            textAnchor: this.horizontal ? 'middle' : (this.orientation === 'left' ? 'end' : 'start'),
            alignmentBaseline: 'middle',
            fontFamily: 'Arial',
            fill: 'black',
            fontSize: 10
          }
        }
      }, this.ticks || {})
    },
    _line () {
      return deepmerge({
        hide: false,
        lineStyle: {
          stroke: 'black'
        }
      }, this.line || {})
    },
    _label () {
      const sign = this.tickSign

      // pre-set defaults for values used during computation
      const fontSize = (this.label && this.label.style && this.label.style.fontSize) ? this.label.style.fontSize : 12
      const offset = (this.label && this.label.offset) ? this.label.offset : 10

      const x = sign * (Math.max(...this.range) / 2)
      let y = null
      let transform = null
      if (this.horizontal) {
        y = sign * (this._ticks.length + offset + fontSize)
      } else {
        y = -(this._ticks.length + offset + fontSize)
        transform = `rotate(${this.tickSign * 90})`
      }

      return deepmerge({
        offset,
        style: {
          textAnchor: this.horizontal ? 'start' : (this.orientation === 'left' ? 'end' : 'start'),
          fontFamily: 'Arial',
          fontSize,
          fill: 'black',
          fontWeight: 'bold'
        },
        x,
        y,
        transform
      }, this.label || {})
    },
    range () { return this.scale.range() },
    horizontal () { return this.orientation === 'bottom' || this.orientation === 'top' },
    tickSign () { return this.orientation === 'left' || this.orientation === 'top' ? -1 : 1 },
    position () { return (this.scale.bandwidth ? this.center : d => d)(this.scale.copy()) },
    axisFromPoint () {
      const start = this.range[0] + 0.5 - this.rangePadding
      return new Point({
        x: this.horizontal ? start : 0,
        y: this.horizontal ? 0 : start
      })
    },
    axisToPoint () {
      const end = this.range[this.range.length - 1] + 0.5 + this.rangePadding
      return new Point({
        x: this.horizontal ? end : 0,
        y: this.horizontal ? 0 : end
      })
    }
  },
  methods: {
    center (scale) {
      let offset = scale.bandwidth() / 2
      if (scale.round()) offset = Math.round(offset)
      return d => scale(d) + offset
    },
    tickFromPoint (val) {
      return new Point({
        x: this.horizontal ? this.position(val) : 0,
        y: this.horizontal ? 0 : this.position(val)
      })
    },
    tickToPoint (val) {
      return new Point({
        x: this.horizontal ? this.position(val) : this.tickSign * this._ticks.length,
        y: this.horizontal ? this._ticks.length * this.tickSign : this.position(val)
      })
    },
    tickLabelTransform (val) {
      const tickLabelX = this.tickToPoint(val).x
      const tickLabelY = this.tickToPoint(val).y + (this.orientation === 'bottom' ? this._ticks.label.style.fontSize : 0)
      return `translate(${tickLabelX}, ${tickLabelY}), rotate(${this._ticks.rotate})`
    }
  },
  components: {
    LineShape, Group
  }
}
</script>
