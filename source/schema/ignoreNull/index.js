import {ifElse} from "ramda"
import {isNil} from "ramda"
import {always} from "ramda"

// f() -> fa()
export default function ignoreNull (cast) {
  return ifElse(isNil, always(null), cast)
}
