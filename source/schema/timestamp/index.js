import moment from "moment"

export default function timestamp (value) {
  return moment(new Date(value))
}
