<template>
  <svg :width="size" :height="size">
    <Group :top="radius" :left="radius">
      <circle :r="radius" :fill="fill" :style="setStyle" />
    </Group>
  </svg>
</template>
<script>
import { Group } from '../../group'

export default {
  props: {
    fill: String,
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    setStyle: Object
  },
  computed: {
    size () { return Math.max(this.width, this.height) },
    radius () { return this.size / 2 }
  },
  components: {
    Group
  }
}
</script>
