# Text

## TextComponent

**Type**: basic

**Props**:

| Name         | Type           | Default    | Description                                                                                                            |
| :----------- | :------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------- |
| text         | String         | _required_ | Text to be displayed.                                                                                                  |
| x            | Number         | 0          | Absolute text displacement in x, applied before rotation-relative displacement.                                        |
| y            | Number         | 0          | Absolute text displacement in y, applied before rotation-relative displacement.                                        |
| dx           | Number         | 0          | Rotation-relative text displacement in x.                                                                              |
| dy           | Number         | 0          | Rotation-relative text displacement in y.                                                                              |
| rotate       | Number, String | 0          | Angle used to rotate the text clockwise. Any [angle](https://developer.mozilla.org/en-US/docs/Web/CSS/angle) is legal. |
| textStyle    | Object         | {}         | CSS applied to the SVG text element.                                                                                   |
| width        | Number, String | null       | If set, limit the width of the text to the specified length.                                                           |
| align        | String         | baseline   | Specify how to align the text. Can be top, baseline, bottom or middle.                                                 |
| lineHeight   | String, Number | 1.125em    | Height of the text lines.                                                                                              |
| padding      | Number         | 0          | Padding applied around the text.                                                                                       |
| paddingLeft  | Number         | 0          | Padding applied to the left of the text.                                                                               |
| paddingRight | Number         | 0          | Padding applied to the right of the text.                                                                              |

**Example**

<svg :width="300" :height="200" style="margin: 0 auto">
  <text-component
    text="Hello World, this is a test!"
    :x="50" :y="20" :rotate="45"
    :width="50"
    :textStyle="{ fill: 'gray' }"
  ></text-component>
</svg>

```vue
<template>
  <svg :width="300" :height="200">
    <text-component
      text="Hello World, this is a test!"
      :x="50"
      :y="20"
      :rotate="45"
      :width="50"
      :textStyle="{ fill: 'gray' }"
    ></text-component>
  </svg>
</template>
<script>
import { TextComponent } from 'vue-data-components'

export default {
  components: { TextComponent }
}
</script>
```

<script>
  import { TextComponent } from '../../src/components/text'

  export default {
    components: {
      TextComponent
    }
  }
</script>
