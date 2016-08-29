import {mapObjIndexed} from "ramda"
import {prop} from "ramda"
import {keys} from "ramda"
import {pick} from "ramda"

// [CoercionMapping, SourcedData] -> CoercedData
export default function dataWithCoercion ([coercions, data]) {
  return mapObjIndexed(
    (value, key) => prop(key, coercions)(value),
    pick(keys(coercions), data)
  )
}
