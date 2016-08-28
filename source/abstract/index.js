import {keys} from "ramda"
import {mapObjIndexed} from "ramda"
import {pick} from "ramda"
import {pipe} from "ramda"
import {prop} from "ramda"
import {merge} from "ramda"
import {map} from "ramda"
import {identity} from "ramda"
import {reject} from "ramda"

const applicate = (...argument) => (ƒunction) => ƒunction(...argument)
const coerce = (schema) => (value, key) => prop(key, schema)(value)
const coerced = (schema) => pipe(pick(keys(schema)), mapObjIndexed(coerce(schema)))
const virtualized = (virtuals) => (raw) => map((virtual) => virtual(raw), virtuals)

// {...} -> f()
export default function abstract (configuration) {
  const {name} = configuration
  const {source = identity} = configuration
  const {schema} = configuration
  const {virtuals} = configuration
  const {validations} = configuration
  const coercedFrom = coerced(schema)
  const virtualizedFrom = virtualized(virtuals)

  return (raw) => {
    const data = source(raw)
    const coercedAttributes = coercedFrom(data)
    const virtualizedAttributes = virtualizedFrom(data)
    const attributes = merge(coercedAttributes, virtualizedAttributes)
    const errors = keys(reject(applicate(attributes), validations))

    return {
      name,
      raw,
      errors,
      attributes
    }
  }
}
