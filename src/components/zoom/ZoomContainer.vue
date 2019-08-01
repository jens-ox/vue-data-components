<template>
  <g
    :id="`zoom-container-${_uid}`"
    class="noselect"
    :width="width"
    :height="height"
    :x="0"
    :y="0"
    @mousedown="rectZoom($event)"
    @dblclick="resetZoom"
    @mousemove="rectCreate($event)"
    @mouseup="rectStop"
  >
    <rect
      :x="0"
      :y="0"
      :width="width"
      :height="height"
      :style="{
        fill: 'transparent'
      }"
    />
    <clipPath :id="_uid">
      <rect
        :x="0"
        :y="0"
        :width="width"
        :height="height"
      />
    </clipPath>
    <g :clip-path="`url(#${_uid})`">
      <slot />
    </g>

    <!-- zoom window -->
    <rect
      v-if="mouseOriginX && mouseOriginY && mouseCurrentX && mouseCurrentY"
      fill="rgba(0,0,0,0.2)"
      :x="Math.min(mouseOriginX, mouseCurrentX)"
      :y="Math.min(mouseOriginY, mouseCurrentY)"
      :width="Math.abs(mouseOriginX - mouseCurrentX)"
      :height="Math.abs(mouseOriginY - mouseCurrentY)"
    />
  </g>
</template>
<script>

export default {
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    xScale: {
      type: Function,
      required: true
    },
    yScale: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      mouseOriginX: null,
      mouseOriginY: null,
      mouseCurrentX: null,
      mouseCurrentY: null,
      customDomainX: null,
      customDomainY: null,
      zoomBoundsRect: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    resetZoom () {
      this.mouseOriginX = null
      this.mouseOriginY = null
      this.mouseCurrentX = null
      this.mouseCurrentY = null
      this.customDomainX = null
      this.customDomainY = null
      this.$emit('reset')
    },
    rectZoom (event) {
      this.$emit('zooming')
      const { x, y } = event.target.getBoundingClientRect()
      this.zoomBoundsRect.x = x
      this.zoomBoundsRect.y = y
      this.mouseOriginX = event.x - x
      this.mouseOriginY = event.y - y
    },
    rectCreate (event) {
      if (!this.mouseOriginX || !this.mouseOriginY) return
      this.mouseCurrentX = event.x - this.zoomBoundsRect.x
      this.mouseCurrentY = event.y - this.zoomBoundsRect.y
    },
    rectStop () {
      this.$emit('zoomed')
      // exit case 1: no current mouse position set
      // exit case 2: zoom window has no dimensions
      if (this.mouseCurrentX && this.mouseCurrentY) {
        this.$emit('newDomains', {
          x: [
            this.xScale.invert(Math.min(this.mouseOriginX, this.mouseCurrentX)),
            this.xScale.invert(Math.max(this.mouseOriginX, this.mouseCurrentX))
          ],
          y: [
            this.yScale.invert(Math.max(this.mouseOriginY, this.mouseCurrentY)),
            this.yScale.invert(Math.min(this.mouseOriginY, this.mouseCurrentY))
          ]
        })
      }
      this.mouseOriginX = null
      this.mouseOriginY = null
      this.mouseCurrentX = null
      this.mouseCurrentY = null
    }
  }
}
</script>
<style>
.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
