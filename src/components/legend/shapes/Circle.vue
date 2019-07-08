<template>
  <svg
    :width="size"
    :height="size"
  >
    <Group
      :top="radius"
      :left="radius"
    >
      <circle
        :r="radius"
        :fill="fill"
        :style="setStyle"
      />
    </Group>
  </svg>
</template>
<script>
import { Group } from '../../group'

export default {
  components: { Group },
  props: {
    fill: {
      type: String,
      default: '#cccccc'
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    setStyle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    size () { return Math.max(this.width, this.height) },
    radius () { return this.size / 2 }
  }
}
</script>
