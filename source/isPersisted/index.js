import {pipe} from "ramda"
import {prop} from "ramda"
import {isNil} from "ramda"
import {not} from "ramda"

// {id, n} -> true | false
export default function isPersisted (record) {
  return pipe(prop("id"), isNil, not)(record)
}
