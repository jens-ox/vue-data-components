<template>
  <Tooltip
    style={{ top: 0, transform: `translate(${left}px, ${top}px)`, ...style }}
    {...otherProps}
  >
    {children}
  </Tooltip>
</template>
<script>
// TODO
// export default withBoundingRects(TooltipWithBounds);
// import { withBoundingRects } from '../../vx-bounds'
import Tooltip from './Tooltip'

export default {
  props: {
    offsetLeft: {
      type: Number,
      default: 10
    },
    offsetTop: {
      type: Number,
      default: 10
    },
    rect: Object,
    parentRect: Object,
    getRects: Function,
    ...Tooltip.props
  },
  computed: {
    computedStyle: function () {
      return {
        top: 0,
        transform: `translate(${this.left}px, ${this.top}px)`,
        ...this.style
      }
    },
    left: function () {
      let left = 10
      if (this.rect && this.parentRect) {
        return this.offsetLeft + this.rect.right > this.parentRect.right ||
          this.offsetLeft + this.rect.right > window.innerWidth
          ? left - this.rect.width - this.offsetLeft
          : left + this.offsetLeft
      }
    },
    top: function () {
      let top = 10
      if (this.rect && this.parentRect) {
        return this.offsetTop + this.rect.bottom > this.parentRect.bottom ||
          this.offsetTop + this.rect.bottom > window.innerHeight
          ? top - this.rect.height - this.offsetTop
          : top + this.offsetTop
      }
    }
  }
}
</script>
