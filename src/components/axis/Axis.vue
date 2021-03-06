<template>
  <Group
    :top="top"
    :left="left"
  >
    <!-- ticks -->
    <Group
      v-for="(val, index) in _ticks.values"
      :key="`vdc-tick-${val}-${index}`"
    >
      <LineShape
        v-if="!_ticks.hide"
        :from="tickFromPoint(val)"
        :to="tickToPoint(val)"
        :line-style="_ticks.lineStyle"
      />
      <g :transform="tickLabelTransform(val)">
        <text-component
          v-bind="_ticks.label"
          :text="_ticks.format(val, index)"
        />
      </g>
    </Group>

    <!-- axis line -->
    <LineShape
      v-if="!_line.hide"
      :from="axisFromPoint"
      :to="axisToPoint"
      :line-style="_line.lineStyle"
    />

    <!-- axis label -->
    <text-component
      v-if="_label.text"
      class="vdc-axis-label"
      v-bind="_label"
    />
  </Group>
</template>
<script>
import { LineShape } from '../shape'
import { AbstractPoint as Point } from '../point'
import { Group } from '../group'
import { TextComponent } from '../text'
import deepmerge from 'deepmerge'

export default {
  components: {
    LineShape, Group, TextComponent
  },
  props: {
    top: { type: Number, default: 0 },
    left: { type: Number, default: 0 },
    hideSubZero: { type: Boolean, default: false },
    rangePadding: { type: Number, default: 0 },
    scale: { type: Function, required: true },

    label: { type: Object, default: () => ({}) },
    ticks: { type: Object, default: () => ({}) },
    line: { type: Object, default: () => ({}) },

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
      const rotate = (this.ticks && this.ticks.label && this.ticks.label.rotate) ? this.ticks.label.rotate : 0

      // values are too complex to be inlined
      let values = this.scale.ticks ? this.scale.ticks(count) : this.scale.domain()
      if (this.hideSubZero) values = values.filter(value => value > 0)

      // set dominant baseline
      let dominantBaseline
      switch (this.orientation) {
        case 'bottom':
          dominantBaseline = 'text-before-edge'
          break
        case 'top':
          dominantBaseline = 'text-after-edge'
          break
        default:
          dominantBaseline = 'middle'
          break
      }

      return deepmerge({
        hide: false,
        count,
        length: 8,
        values,
        format: this.scale.tickFormat ? this.scale.tickFormat() : d => d,
        lineStyle: {
          stroke: 'black',
          strokeWidth: 1,
          fontSize: 10
        },
        label: {
          rotate,
          width: 100,
          textStyle: {
            textAnchor: this.horizontal ? (rotate === 0 ? 'middle' : 'start') : (this.orientation === 'left' ? 'end' : 'start'),
            dominantBaseline,
            fontFamily: 'Arial',
            fill: 'black',
            fontSize: 10
          }
        }
      }, this.ticks)
    },
    _line () {
      return deepmerge({
        hide: false,
        lineStyle: {
          stroke: 'black'
        }
      }, this.line)
    },
    _label () {
      // pre-set defaults for values used during computation
      const fontSize = (this.label && this.label.textStyle && this.label.textStyle.fontSize) ? this.label.textStyle.fontSize : 12
      const offset = (this.label && this.label.offset) ? this.label.offset : 10

      const x = this.tickSign * (Math.max(...this.range) / 2)
      let y = null
      let transform = null
      if (this.horizontal) {
        y = this.tickSign * (this._ticks.length + offset + fontSize)
      } else {
        y = -(this._ticks.length + offset + fontSize)
        transform = `rotate(${this.tickSign * 90})`
      }

      return deepmerge({
        offset,
        style: {
          textAnchor: 'middle',
          fontFamily: 'Arial',
          fontSize,
          fill: 'black',
          fontWeight: 'bold'
        },
        dx: x,
        dy: y,
        transform
      }, this.label)
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
      const tickLabelY = this.tickToPoint(val).y
      return `translate(${tickLabelX}, ${tickLabelY})`
    }
  }
}
</script>
