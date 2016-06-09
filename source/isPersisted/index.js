import {isNil} from "ramda"
import {path} from "ramda"

// {attributes: {id, ...}, ...} -> true | false
export default function isPersisted (record) {
  return !isNil(path(["attributes", "id"], record))
}
