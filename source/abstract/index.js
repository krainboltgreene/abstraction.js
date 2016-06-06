import {keys} from "ramda"
import {mapObjIndexed} from "ramda"
import {pick} from "ramda"
import {pipe} from "ramda"
import {prop} from "ramda"

const coerce = (schema) => (value, key) => prop(key, schema)(value)
const coerced = (schema) => pipe(
  pick(keys(schema)),
  mapObjIndexed(coerce(schema))
)

// {...} -> f()
export default function abstract (configuration) {
  const {name} = configuration
  const {schema} = configuration
  const attributesFrom = coerced(schema)

  return (raw) => {
    const attributes = attributesFrom(raw)

    return {
      type: name,
      raw,
      attributes
    }
  }
}
