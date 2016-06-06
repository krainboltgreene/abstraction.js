import {ifElse} from "ramda"
import {isNil} from "ramda"
import {identity} from "ramda"

// f() -> fa()
export default function passNull (cast) {
  return ifElse(isNil, cast, identity)
}
