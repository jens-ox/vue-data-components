<template>
  <Axis
    :axisClassName="`vx-axis-bottom ${axisClassName}`"
    :orientation="ORIENT.bottom"

    :axisLineClassName="axisLineClassName"
    :hideAxisLine="hideAxisLine"
    :hideTicks="hideTicks"
    :hideZero="hideZero"
    :label="label"
    :labelClassName="labelClassName"
    :labelOffset="labelOffset"
    :labelProps="labelProps"
    :left="left"
    :numTicks="numTicks"
    :rangePadding="rangePadding"
    :scale="scale"
    :stroke="stroke"
    :strokeWidth="strokeWidth"
    :strokeDasharray="strokeDasharray"
    :tickClassName="tickClassName"
    :tickFormat="tickFormat"
    :tickLabelProps="Object.assign({}, {
      'dx': '0',
      'dy': '0.25em',
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
    ...Axis.props
  },
  components: {
    Axis
  }
}
</script>
