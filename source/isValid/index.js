import {isEmpty} from "ramda"

// {errors: [...], ...} -> true | false
export default function isValid (record) {
  return isEmpty(record.errors)
}
