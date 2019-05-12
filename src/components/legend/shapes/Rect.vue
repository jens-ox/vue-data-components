<template>
  <svg :width="size" :height="size">
    <Group>
      <rect :width="size" :height="size" :fill="fill" :style="setStyle"></rect>
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
    size () { return Math.max(this.width, this.height) }
  },
  components: {
    Group
  }
}
</script>
