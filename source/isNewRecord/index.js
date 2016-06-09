import {equals} from "ramda"
import {path} from "ramda"
import {juxt} from "ramda"

const timestamps = [
  path(["attributes", "createdAt"]),
  path(["attributes", "updatedAt"])
]
const asTimestamps = juxt(timestamps)

// {attributes: {created, updated, ...}, ...} -> true | false
export default function isNewRecord (record) {
  return equals(...asTimestamps(record))
}
