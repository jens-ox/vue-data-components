# Shape

## LineShape

**Type**: Basic

**Wraps**: [line](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line)

**Props**

| Name      | Type   | Default                 | Description                     |
| :-------- | :----- | :---------------------- | :------------------------------ |
| from      | Point  | `Point({ x: 0, y: 0 })` | Starting Point                  |
| to        | Point  | `Point({ x: 1, y: 1 })` | End Point                       |
| lineStyle | Object | _none_                  | Styling of the line SVG element |

**Example**

<svg :width="300" :height="200" style="margin: 0 auto">
  <line-shape
    :from="startPoint"
    :to="endPoint"
    :lineStyle="{
      stroke: 'black'
    }"
  ></line-shape>
</svg>

<script>
  import { LineShape } from '../../src/components/shape'
  import { AbstractPoint as Point } from '../../src/components/point'

  export default {
    computed: {
      startPoint () {
        return new Point({ x: 10, y: 10 })
      },
      endPoint () {
        return new Point ({ x: 40, y: 50 })
      }
    },
    components: {
      LineShape
    }
  }
</script>
