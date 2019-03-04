export default {
  data () {
    return {
      containerStyle: {
        position: 'relative',
        width: 'inherit',
        height: 'inherit'
      },
      tooltipOpen: false,
      tooltipLeft: 0,
      tooltipTop: 0,
      tooltipTimeout: null,
      tooltipData: []
    }
  },
  methods: {
    updateTooltip ({ tooltipOpen, tooltipLeft = undefined, tooltipTop = undefined, tooltipData = undefined }) {
      this.tooltipOpen = tooltipOpen
      this.tooltipLeft = tooltipLeft
      this.tooltipTop = tooltipTop
      this.tooltipData = tooltipData
    },
    showTooltip ({ tooltipLeft, tooltipTop, tooltipData }) {
      this.updateTooltip({
        tooltipOpen: true,
        tooltipLeft,
        tooltipTop,
        tooltipData
      })
    },
    hideTooltip (delay = 0) {
      this.tooltipTimeout = setTimeout(() => {
        this.updateTooltip({
          tooltipOpen: false
        })
      }, delay)
    }
  }
}
