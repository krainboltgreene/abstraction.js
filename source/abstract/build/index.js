import {mapObjIndexed} from "ramda"

const coerce = (schema) => (value, key) => schema[key](value)

export default function build ({schema, attributes}) {
  return mapObjIndexed(coerce(schema), attributes)
}
