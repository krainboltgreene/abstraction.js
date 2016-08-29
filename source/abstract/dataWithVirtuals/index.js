import {map} from "ramda"

// [VirtualMapping, SourceData] -> VirtualizedData
export default function dataWithVirtuals ([virtuals, data]) {
  return map((virtual) => virtual(data), virtuals)
}
