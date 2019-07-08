<template>
  <svg
    :width="size"
    :height="size"
  >
    <Group>
      <rect
        :width="size"
        :height="size"
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
    size () { return Math.max(this.width, this.height) }
  }
}
</script>
