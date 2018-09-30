<template>
  <Group :className="`vx-axis ${axisClassName}`" :top="top" :left="left">

    <!-- ticks -->
    <Group
      v-for="(val, index) in values"
      v-if="!hideZero || val > 0"
      v-bind:key="`vx-tick-${val}-${index}`"
      :className="`vx-axis-tick ${tickClassName}`"
      :transform="tickTransform"
    >

      <LineShape v-if="!hideTicks" :from="tickFromPoint(val)" :to="tickToPoint(val)" :stroke="tickStroke" />
      <text
        :transform="tickLabelTransform(val)"
        v-bind="computedTickLabelProps"
      >{{ format(val, index) }}</text>
    </Group>

    <!-- axis line -->
    <LineShape
      v-if="!hideAxisLine"
      :className="`vx-axis-line ${axisLineClassName}`"
      :from="axisFromPoint"
      :to="axisToPoint"
      :stroke="stroke"
      :strokeWidth="strokeWidth"
      :strokeDasharray="strokeDasharray"
    />

    <!-- axis label -->
    <text
      v-if="label"
      :class="`vx-axis-label ${labelClassName}`"
      v-bind="labelTransform"
    >
      {{ label }}
    </text>
  </Group>
</template>
<script>
import { LineShape } from '../../shape'
import { Point } from '../../point'
import { Group } from '../../group'
import center from '../utils/center'
import ORIENT from '../constants/orientation'

export default {
  props: {
    axisClassName: {
      type: String,
      default: ''
    },
    axisLineClassName: {
      type: String,
      default: ''
    },
    hideAxisLine: {
      type: Boolean,
      default: false
    },
    hideTicks: {
      type: Boolean,
      default: false
    },
    hideZero: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    labelClassName: {
      type: String,
      default: ''
    },
    labelOffset: {
      type: Number,
      default: 14
    },
    labelProps: {
      type: Object,
      default: () => {}
    },
    left: {
      type: Number,
      default: 0
    },
    numTicks: {
      type: Number,
      default: 10
    },
    orientation: {
      type: String,
      default: ORIENT.bottom
    },
    rangePadding: {
      type: Number,
      default: 0
    },
    scale: {
      type: Function,
      required: true
    },
    stroke: {
      type: String,
      default: 'black'
    },
    strokeWidth: {
      type: Number,
      default: 1
    },
    strokeDasharray: String,
    tickClassName: {
      type: String,
      default: ''
    },
    tickFormat: Function,
    tickLabelProps: {
      type: Object,
      default: () => {}
    },
    tickLabelFontSize: {
      type: Number,
      default: 10
    },
    tickLength: {
      type: Number,
      default: 8
    },
    tickStroke: {
      type: String,
      default: 'black'
    },
    tickTransform: {
      type: String,
      default: ''
    },
    tickRotate: {
      type: Number,
      default: 0
    },
    tickValues: Array,
    top: {
      type: Number,
      default: 0
    }
  },
  computed: {
    values () {
      if (this.tickValues) return this.tickValues
      return this.scale.ticks ? this.scale.ticks(this.numTicks) : this.scale.domain()
    },
    format () {
      if (this.tickFormat) return this.tickFormat
      return this.scale.tickFormat ? this.scale.tickFormat() : d => d
    },
    range () { return this.scale.range() },
    range0 () { return this.range[0] + 0.5 - this.rangePadding },
    range1 () { return this.range[this.range.length - 1] + 0.5 + this.rangePadding },
    horizontal () { return this.orientation !== ORIENT.left && this.orientation !== ORIENT.right },
    isLeft () { return this.orientation === ORIENT.left },
    isTop () { return this.orientation === ORIENT.top },
    tickSign () { return this.isLeft || this.isTop ? -1 : 1 },
    position () { return (this.scale.bandwidth ? center : d => d)(this.scale.copy()) },
    axisFromPoint () {
      return new Point({
        x: this.horizontal ? this.range0 : 0,
        y: this.horizontal ? 0 : this.range0
      })
    },
    axisToPoint () {
      return new Point({
        x: this.horizontal ? this.range1 : 0,
        y: this.horizontal ? 0 : this.range1
      })
    },
    labelTransform () {
      const computedProps = {
        'text-anchor': 'middle',
        'font-family': 'Arial',
        'font-size': 12,
        'fill': 'black',
        ...this.labelProps
      }
      const sign = this.orientation === ORIENT.left || this.orientation === ORIENT.top ? -1 : 1

      let x = null
      let y = null
      let transform = null
      if (this.orientation === ORIENT.top || this.orientation === ORIENT.bottom) {
        x = Math.max(...this.range) / 2
        y = sign * (this.tickLength + this.labelOffset + this.tickLabelFontSize + (this.orientation === ORIENT.bottom ? computedProps['font-size'] : 0))
      } else {
        x = sign * (Math.max(...this.range) / 2)
        y = -(this.tickLength + this.labelOffset)
        transform = `rotate(${sign * 90})`
      }

      return { x, y, transform, ...computedProps }
    },
    computedTickLabelFontSize () { return Math.max(this.tickLabelFontSize, this.computedTickLabelProps['font-size'] || 0) },
    computedTickLabelProps () {
      return {
        'text-anchor': 'middle',
        'font-family': 'Arial',
        'font-size': 10,
        'fill': 'black',
        ...this.tickLabelProps
      }
    }
  },
  methods: {
    tickFromPoint (val) {
      return new Point({
        x: this.horizontal ? this.position(val) : 0,
        y: this.horizontal ? 0 : this.position(val)
      })
    },
    tickToPoint (val) {
      return new Point({
        x: this.horizontal ? this.position(val) : this.tickSign * this.tickLength,
        y: this.horizontal ? this.tickLength * this.tickSign : this.position(val)
      })
    },
    tickLabelX (val) {
      return this.tickToPoint(val).x
    },
    tickLabelY (val) {
      return this.tickToPoint(val).y + (this.horizontal && !this.isTop ? this.computedTickLabelFontSize : 0)
    },
    tickLabelTransform (val) {
      return `translate(${this.tickLabelX(val)}, ${this.tickLabelY(val)}), rotate(${this.tickRotate})`
    }
  },
  components: {
    LineShape, Group
  }
}
</script>
