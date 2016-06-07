import {keys} from "ramda"
import {mapObjIndexed} from "ramda"
import {pick} from "ramda"
import {pipe} from "ramda"
import {prop} from "ramda"
import {merge} from "ramda"
import {map} from "ramda"

const coerce = (schema) => (value, key) => prop(key, schema)(value)
const coerced = (schema) => pipe(pick(keys(schema)), mapObjIndexed(coerce(schema)))
const virtualized = (virtuals) => (raw) => map((virtual) => virtual(raw), virtuals)

// {...} -> f()
export default function abstract (configuration) {
  const {name} = configuration
  const {schema} = configuration
  const {virtuals} = configuration
  const coercedFrom = coerced(schema)
  const virtualizedFrom = virtualized(virtuals)

  return (raw) => {
    const coercedAttributes = coercedFrom(raw)
    const virtualizedAttributes = virtualizedFrom(raw)
    const attributes = merge(coercedAttributes, virtualizedAttributes)

    return {
      type: name,
      raw,
      attributes
    }
  }
}
