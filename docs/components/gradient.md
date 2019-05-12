# Gradient

Gradients can be used as background colors or to fill shapes.

## LinearGradient

This is the abstract gradient used by all other gradients available here. This is only to be used if you dislike the other available gradients.

By default, a `from` and a `to` color is specified. If multiple colors are to be used, stops can be manually specified in the slot of the gradient.

**Type**: Basic

**Wraps**: [linearGradient](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient)

**Props**

| Name        | Type   | Default    | Description                                                            |
| :---------- | :----- | :--------- | :--------------------------------------------------------------------- |
| useID       | String | _required_ | The ID used to reference the gradient                                  |
| from        | String | `null`     | Starting color of the gradient, unused if stops are manually specified |
| to          | String | `null`     | Ending color of the gradient, unused if stops are manually specified   |
| x1          | String | 0          | First x-coordinate of the gradient                                     |
| x2          | String | 1          | Second x-coordinate of the gradient                                    |
| y1          | String | 0          | First y-coordinate of the gradient                                     |
| y2          | String | 1          | Second y-coordinate of the gradient                                    |
| fromOffset  | String | 0%         | Offset of the starting gradient stop                                   |
| toOffset    | String | 100%       | Offset of the ending gradient stop                                     |
| fromOpacity | Number | 1          | Starting opacity                                                       |
| toOpacity   | Number | 1          | Ending opacity                                                         |
| rotate      | Number | `null`     | Rotation of the gradient, overwritten by `transform`                   |
| transform   | String | `null`     | Transformation applied to the gradient                                 |

**Example**: look at the implementation of the other gradients.

## Predefined linear gradients

Currently available:

- GradientDarkgreenGreen
- GradientLightgreenGreen
- GradientOrangeRed
- GradientPinkBlue
- GradientPinkRed
- GradientPurpleOrange
- GradientPurpleRed
- GradientPurpleTeal
- GradientSteelPurple
- GradientTealBlue

**Props**: Identical to [LinearGradient](#lineargradient), but with pre-set `from` and `to`.

**Example**:

<svg :width="300" :height="200" style="margin: 0 auto">
  <GradientTealBlue useID="teal" />
  <rect :width="300" :height="200" fill="url(#teal)" :rx="14" />
</svg>

```vue
<svg :width="300" :height="200">
  <GradientTealBlue useID="teal" />
  <rect :width="300" :height="200" fill="url(#teal)" :rx="14" />
</svg>

<script>
import { GradientTealBlue } from 'vue-data-components'

export default {
  components: {
    GradientTealBlue
  }
}
</script>
```

## RadialGradient

More or less identical to [LinearGradient](#lineargradient), but radial.

**Type**: Basic

**Wraps**: [radialGradient](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient)

**Props**

| Name        | Type   | Default    | Description                                                            |
| :---------- | :----- | :--------- | :--------------------------------------------------------------------- |
| useID       | String | _required_ | The ID used to reference the gradient                                  |
| from        | String | `null`     | Starting color of the gradient, unused if stops are manually specified |
| to          | String | `null`     | Ending color of the gradient, unused if stops are manually specified   |
| fromOffset  | String | 0%         | Offset of the starting gradient stop                                   |
| toOffset    | String | 100%       | Offset of the ending gradient stop                                     |
| fromOpacity | Number | 1          | Starting opacity                                                       |
| toOpacity   | Number | 1          | Ending opacity                                                         |
| rotate      | Number | `null`     | Rotation of the gradient, overwritten by `transform`                   |
| transform   | String | `null`     | Transformation applied to the gradient                                 |

**Example**:

<svg :width="300" :height="200" style="margin: 0 auto">
  <RadialGradient useID="radial" from="#FCE38A" to="#F38181"  />
  <rect :width="300" :height="200" fill="url(#radial)" :rx="14" />
</svg>

```vue
<svg :width="300" :height="200">
  <RadialGradient useID="radial" from="#FCE38A" to="#F38181"  />
  <rect :width="300" :height="200" fill="url(#radial)" :rx="14" />
</svg>

<script>
import { RadialGradient } from 'vue-data-components'

export default {
  components: {
    RadialGradient
  }
}
</script>
```

<script>
  import { GradientTealBlue, RadialGradient } from '../../src/components/gradient'

  export default {
    components: {
      GradientTealBlue, RadialGradient
    }
  }
</script>
