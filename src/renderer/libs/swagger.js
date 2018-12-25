import _ from 'lodash'

export const generateExampleCodeByParam = (param) => {
  const mapped = _.mapValues(param.properties, p => p.example)
  return JSON.stringify(mapped, null, 2)
}

export const transformProperties = (properties) => {
  return Object.keys(properties).map(p => ({
    ...properties[p],
    name: p
  }))
}
