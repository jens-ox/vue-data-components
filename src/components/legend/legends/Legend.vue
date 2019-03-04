<template>
  <div
    :class="`vx-legend ${className}`"
    :style="computedStyle"
  >
    <LegendItem
      v-for="(label, i) in labels(scale, labelFormat)"
      :key="`legend-${label}-${i}`"
      :margin="itemMargin"
      :label="label"
      v-bind="restProps"
    >
      <LegendShape
        :height="shapeHeight"
        :width="shapeWidth"
        :margin="shapeMargin"
        :label="label"
        :fill="fill"
        :size="size"
        :shapeStyle="shapeStyle"
      />
      <LegendLabel :label="label.text" :margin="labelMargin" :align="labelAlign" />
    </LegendItem>
  </div>
</template>
<script>
import LegendItem from './LegendItem'
import LegendLabel from './LegendLabel'
import LegendShape from './LegendShape'
import valueOrIdentity from '../util/valueOrIdentity'

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    setStyle: {
      type: Object,
      default: () => {
        return {
          display: 'flex'
        }
      }
    },
    shapeStyle: Object,
    scale: {
      type: Function,
      required: true
    },
    shapeWidth: {
      type: [Number, String],
      default: 15
    },
    shapeHeight: {
      type: [Number, String],
      default: 15
    },
    shapeMargin: {
      type: String,
      default: '2px 4px 2px 0'
    },
    labelAlign: {
      type: String,
      default: 'left'
    },
    labelMargin: {
      type: String,
      default: '0 15px 0 0'
    },
    itemMargin: {
      type: String,
      default: '0'
    },
    direction: {
      type: String,
      default: 'column'
    },
    itemDirection: {
      type: String,
      defalut: 'row'
    },
    fill: {
      type: Function,
      default: valueOrIdentity
    },
    size: {
      type: Function,
      default: valueOrIdentity
    },
    labelFormat: {
      type: Function,
      default: valueOrIdentity
    },
    labelTransform: {
      type: Function,
      default: ({ scale, labelFormat }) => {
        return (d, i) => {
          return {
            datum: d,
            index: i,
            text: `${labelFormat(d, i)}`,
            value: scale(d)
          }
        }
      }
    },
    restProps: Object
  },
  computed: {
    computedDomain () { return this.domain || this.scale.domain() },
    computedStyle () {
      return {
        ...this.setStyle,
        flexDirection: this.direction
      }
    }
  },
  methods: {
    labels (scale, labelFormat) { 
      return this.computedDomain.map(this.labelTransform({ 
        scale,
        labelFormat
      }))
    }
  },
  components: {
    LegendItem, LegendLabel, LegendShape
  }
}
</script>
