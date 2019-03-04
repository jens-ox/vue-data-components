# Grid

Contains components for building background grids for orientation.

## Grid

Main Grid component.

**Type**: complex

**Children**:
- [GridLines](#gridlines): exposed as `linesHorizontal`, `linesVertical`
- [Group](group.html#group-2)

**Props**:

|Name|Type|Default|Description|
|:---|:---|:------|:----------|
|xScale|Function|*required*|scaling along the x axis. See TODO for more on scales.|
|yScale|Function|*required*|scaling along the y axis. See TODO for more on scales.|
|width|Number|*required*|Width of the grid.|
|height|Number|*required*|Height of the grid.|
|top|Number|0|Margin to the top. This will usually be the margin of your graph to the svg container.|
|left|Number|0|Margin to the left. This will usually be the margin of your graph to the svg container.|
|lineStyle|Object|`{}`|Base style for the grid lines. Can be overwritten by passing styles via `linesHorizontal` and/or `linesVertical`.|

**Example**

<svg :width="302" :height="202" style="display: block; margin: 0 auto">
  <grid
    :top="1"
    :left="1"
    :width="300"
    :height="200"
    :xScale="xScale"
    :yScale="yScale"
    :lineStyle="{
      stroke: 'grey'
    }"
  />
</svg>

```vue
<template>
  <svg width="300" height="200">
    <grid
      :width="300"
      :height="200"
      :xScale="xScale"
      :yScale="yScale"
    />
  </svg>
</template>
<script>
import { Grid, scaleLinear } from 'vue-data-components'

export default {
  data () {
    return {
      xScale: scaleLinear({
        range: [0, 300],
        domain: [0, 10]
      }),
      yScale: scaleLinear({
        range: [200, 0],
        domain: [0, 8]
      })
    }
  },
  components: { Grid }
}
</script>
```

## GridLines

Set of parallel lines, used by Grid component. Not really meant to be used elsewhere :sweat_smile:

**Type**: complex

**Children**: no children exposed

**Props**:

|Name|Type|Default|Description|
|:---|:---|:------|:----------|
|type|String|*required*|Either `horizontal` or `vertical`, specifies the orientation of the axis this lines belong to. The actual lines will be orthogonal to this orientation.|
|scale|Function|*required*|Scale used to place the lines. See TODO for more on scales.|
|length|Number|*required*|Length of the lines.|
|height|Number|*required*|Height of the grid.|
|top|Number|0|Margin to the top. This will usually be the margin of your graph to the svg container.|
|left|Number|0|Margin to the left. This will usually be the margin of your graph to the svg container.|
|tickCount|Number|10|Number of lines to generate.|
|lineStyle|Object|`{}`|Style applied to the lines.|

**Example**

<svg :width="302" :height="202" style="display: block; margin: 0 auto">
  <grid-lines
    :top="1"
    :left="1"
    :width="300"
    :height="200"
    :scale="xScale"
    orientation="horizontal"
    length="200"
    :lineStyle="{
      stroke: 'aqua'
    }"
  />
</svg>

```vue
<template>
  <svg width="300" height="200">
    <grid-lines
      :width="300"
      :height="200"
      :scale="xScale"
      orientation="horizontal"
      length="200"
      :lineStyle="{
        stroke: 'aqua'
      }"
    />
  </svg>
</template>
<script>
import { GridLines, scaleLinear } from 'vue-data-components'

export default {
  data () {
    return {
      scale: scaleLinear({
        range: [0, 300],
        domain: [0, 10]
      })
    }
  },
  components: { GridLines }
}
</script>
```

<script>
  import { Grid, GridLines } from '../../src/components/grid'
  import { scaleLinear } from '../../src/components/scale'

  export default {
    data () {
      return {
        windowWidth: 0,
        xScale: scaleLinear({
          range: [0, 300],
          domain: [0, 10]
        }),
        yScale: scaleLinear({
          range: [200, 0],
          domain: [0, 8]
        })
      }
    },
    beforeMount () {
      this.windowWidth = window.innerWidth
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          this.windowWidth = window.innerWidth
        })
      })
    },
    computed: {
      width: function () {
        return this.windowWidth > 800 ? 800 : this.windowWidth - 16
      },
      height: function () {
        return 0.618 * this.width
      }
    },
    components: {
      Grid, GridLines
    }
  }
</script>