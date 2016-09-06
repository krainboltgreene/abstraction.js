import {isEmpty} from "ramda"

export default function isValid (record) {
  return isEmpty(record.__abstraction__.errors())
}
