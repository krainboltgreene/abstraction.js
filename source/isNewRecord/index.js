import {pipe} from "ramda"
import {props} from "ramda"
import {apply} from "ramda"
import {equals} from "ramda"

// {created, updated, n} -> true | false
export default function isNewRecord (record) {
  return pipe(props(["createdAt", "updatedAt"]), apply(equals))(record)
}
