# Axis

## Axis

**Type**: complex

**Children**:

- label (component [TextComponent](TODO)): exposed as `label`
- ticks (component [LineShape](TODO)): exposed as `ticks`
- tick labels (component [TextComponent](TODO)): exposed as `ticks.label`

**Props**:

| Name        | Type     | Default    | Description                                                            |
| :---------- | :------- | :--------- | :--------------------------------------------------------------------- |
| top         | Number   | 0          | Margin to the top of the axis.                                         |
| left        | Number   | 0          | Margin to the left of the axis.                                        |
| hideSubZero | Boolean  | false      | Whether or not to hide sub-zero values.                                |
| scale       | Function | _required_ | Scaling function. See TODO for scaling functions.                      |
| orientation | String   | bottom     | Orientation of the axis. Allowed are _top_, _bottom_, _left_, _right_. |

**Example**

<svg :width="302" :height="50" style="display: block; margin: 0 auto">
  <axis
    :scale="xScale"
    :left="5"
    :ticks="{
      label: {
        rotate: 45,
        dx: 5,
        dy: -5
      }
    }"
  ></axis>
</svg>

```vue
<template>
  <svg>
    <axis
      :scale="xScale"
      :left="5"
      :ticks="{
        label: {
          rotate: 90,
          dx: 5,
          dy: -5
        }
      }"
    ></axis>
  </svg>
</template>
<script>
import { Axis, scaleLinear } from 'vue-data-components'

export default {
  data() {
    return {
      xScale: scaleLinear({
        range: [0, 200],
        domain: [0, 10]
      })
    }
  },
  components: {
    Axis
  }
}
</script>
```

<script>
  import { Axis } from '../../src/components/axis'
  import { scaleLinear } from '../../src/components/scale'

  export default {
    data () {
      return {
        xScale: scaleLinear({
          range: [0, 200],
          domain: [0, 10]
        })
      }
    },
    components: {
      Axis
    }
  }
</script>
