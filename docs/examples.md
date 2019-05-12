# Examples

## Bar Chart

<bar-chart :width="width" :height="height" style="margin-top: 10px" />

<script>
  import BarChart from '../src/components/examples/BarChart.vue'

  export default {
    data () {
      return {
        textWidth: 0,
        windowWidth: 0,
        rotate: 0
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
        return this.windowWidth > 740 ? 740 : this.windowWidth - 32
      },
      height: function () {
        return 0.618 * this.width
      }
    },
    components: {
      BarChart
    }
  }
</script>
