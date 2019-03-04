const alignments = {
  'top': true,
  'baseline': true,
  'bottom': true,
  'middle': true
}

function getConfig (mod, cfg) {
  const ret = {
    'plain': !!cfg.plain,
    'width': null || cfg.width,
    'align': cfg.align === 'none' ? false : (alignments[cfg.align] ? cfg.align : 'baseline'),
    'lineHeight': cfg.lineHeight || '1.125em',
    'paddingLeft': cfg.paddingLeft === undefined ? (cfg.padding === undefined ? 0 : cfg.padding) : cfg.paddingLeft,
    'paddingRight': cfg.paddingRight === undefined ? (cfg.padding === undefined ? 0 : cfg.padding) : cfg.paddingRight,
    'afterReflow': cfg.afterReflow instanceof Function ? cfg.afterReflow : false
  }
  ret.padding = ret.paddingLeft + ret.paddingRight
  for (let k in mod) {
    if (k === 'plain') ret.plain = true
    else if (alignments[k]) {
      ret.align = k
    } else if (k === 'none') {
      ret.align = false
    } else if (/\d+/.test(k)) {
      ret.width = parseInt(k)
    }
  }
  return ret
}
/**
 * @param {SVGTextElement} el
 * @param {SVGTSpanElement} span
 * @param {*} config
 */
function newLine (el, span, config) {
  const tmp = span.cloneNode()
  el.insertBefore(tmp, span.nextSibling)
  span.style.display = null
  tmp.removeAttribute('y')
  tmp.setAttribute('dy', config.lineHeight)
  if (!config.align) {
    tmp.setAttribute('x', config.paddingLeft)
  } else {
    tmp.setAttribute('x', 0)
  }
  return tmp
}
/**
 * @param {SVGTextElement} el
 * @param {String} text
 * @param {Object} config
 */
function set (el, text, config) {
  el[config.plain ? 'textContent' : 'innerHTML'] = text || ''
  if (!config.width) return
  const plain = []
  const physLn = el.getBBox().height // physical line height
  // convert text nodes to tspans, clear spans
  for (let i = 0; i < el.childNodes.length; i++) {
    let n = el.childNodes[i]
    if (n instanceof Text) {
      const tmp = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
      tmp.textContent = n.textContent
      el.replaceChild(tmp, n)
      n = tmp
    }
    plain.push(n.textContent.split(' '))
    n.textContent = ''
  }
  if (!config.align) {
    // set explicitly when not aligning (i.e. don't use text's transform)
    el.childNodes[0].setAttribute('x', config.paddingLeft)
  }

  // float texts
  let offset = 0
  let w = config.width - config.padding
  let childCnt = el.childElementCount
  for (let c = 0; c < childCnt; c++) {
    const words = plain[c]
    let wc = words.length
    let span = el.childNodes[c + offset]
    let txt = ''
    let forceBreak = false
    for (let i = 0; i < wc; i++) {
      span.textContent += i ? ' ' + words[i] : words[i]
      forceBreak = el.getBBox().width > w
      while (forceBreak) {
        span.textContent = txt
        span = newLine(el, span, config)
        txt = span.textContent = words[i]
        offset++
        if (el.getBBox().width > w) {
          span.style.display = 'none' // too long word, hide for further correct measurements
          txt = words[++i]
          if (!txt) forceBreak = false
        } else forceBreak = false
      }
      txt = span.textContent
    }
  }

  for (let i = 0; i < el.childNodes.length; i++) {
    el.childNodes[i].style.display = null
  }

  if (config.align === 'middle') {
    el.setAttribute('transform', `translate(${config.paddingLeft}, ${-(el.getBBox().height - physLn) / 2})`)
  } else if (config.align === 'baseline') {
    el.setAttribute('transform', `translate(${config.paddingLeft}, 0)`)
  } else if (config.align === 'bottom') {
    el.setAttribute('transform', `translate(${config.paddingLeft}, ${-(el.getBBox().height - physLn)})`)
  } else if (config.align === 'top') {
    el.setAttribute('transform', `translate(${config.paddingLeft}, ${physLn})`)
  }
}

/**
 * Creates a new wrapper directive with the given configuration.
 * @param {ITextWrapperConfiguration} config A configuration object.
 */
function directive (config) {
  if (!config) config = {}
  const r = {
    inserted (el, binding) {
      if (!(el instanceof SVGTextElement)) {
        throw new Error('Text-wrap directive must be bound to an SVG text element.')
      }
      el.__WRAP_CONFIG = getConfig(binding.modifiers, config)
      r.update.apply(this, arguments)
    },
    update (el, binding, {
      context
    }) {
      if (binding.value !== binding.oldValue) {
        let cfg = el.__WRAP_CONFIG
        if (binding.value && (typeof binding.value) !== 'string') {
          const text = binding.value.text
          cfg = getConfig({}, Object.assign({}, el.__WRAP_CONFIG, binding.value))
          set(el, text, cfg)
        } else {
          set(el, binding.value, cfg)
        }
        if (cfg.afterReflow) {
          cfg.afterReflow.call(context, el, cfg)
        }
      }
    },
    unbind (el) {
      delete el.__WRAP_CONFIG
    }
  }
  return r
}
const Wrapper = directive()
export default Wrapper

export const ConfiguredWrapper = directive
