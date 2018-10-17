<template>
  <Axis
    :orientation="ORIENT.left"
    :hideAxisLine="hideAxisLine"
    :hideTicks="hideTicks"
    :hideZero="hideZero"
    :label="label"
    :labelOffset="labelOffset"
    :labelProps="labelProps"
    :left="left"
    :numTicks="numTicks"
    :rangePadding="rangePadding"
    :scale="scale"
    :stroke="stroke"
    :strokeWidth="strokeWidth"
    :strokeDasharray="strokeDasharray"
    :tickFormat="tickFormat"
    :tickLabelProps="Object.assign({}, {
      'text-anchor': 'end',
      'dx': '-0.25em',
      'dy': '0.25em'
    }, tickLabelProps)"
    :tickLength="tickLength"
    :tickStroke="tickStroke"
    :tickTransform="tickTransform"
    :tickValues="tickValues"
    :tickRotate="tickRotate"
    :top="top"
  />
</template>
<script>
import Axis from './Axis'
import ORIENT from '../constants/orientation'

export default {
  data () {
    return {
      ORIENT
    }
  },
  props: {
    ...Axis.props,
    labelOffset: {
      type: Number,
      default: 36
    }
  },
  components: {
    Axis
  }
}
</script>
