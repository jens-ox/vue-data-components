---
home: true
actionText: Get Started →
actionLink: /guide/
footer: Copyright © 2018-present Jens Ochsenmeier
---
<div style="text-align: center">
  <div style="display: inline-block; margin: 0 auto; background-color: #F9F7E8; border-radius: 1em; box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2); padding: 1em; margin: 1em">
    <MultilineGraph :width="width" :height="height" />
  </div>
</div>

<script>
  import MultilineGraph from '../src/components/examples/MultilineGraph.vue'

  export default {
    data () {
      return {
        windowWidth: 0
      }
    },
    beforeMount () {
      this.windowWidth = window.innerWidth
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          this.windowWidth = window.innerWidth
        })
      })
    },
    computed: {
      width: function () {
        return this.windowWidth > 800 ? 800 : this.windowWidth - 16
      },
      height: function () {
        return 0.618 * this.width
      }
    },
    components: {
      MultilineGraph
    }
  }
</script>