import {mapObjIndexed} from "ramda"

const coerce = (schema) => (value, key) => schema[key](value)

// {...} -> f()
export default function abstract (configuration) {
  const {name} = configuration
  const {schema} = configuration

  return (raw) => {
    return {
      type: name,
      raw,
      attributes: mapObjIndexed(coerce(schema), raw)
    }
  }
}
