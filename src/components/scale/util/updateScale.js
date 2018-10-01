export default function updateScale (scale, parameters = {}) {
  const nextScale = scale.copy()
  Object.keys(parameters).forEach(key => {
    if (nextScale.hasOwnProperty(key)) nextScale[key](parameters[key])
  })
  return nextScale
}
