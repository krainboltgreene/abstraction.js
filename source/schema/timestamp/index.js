import moment from "moment"

// f() -> moment | Error
export default function timestamp (value) {
  if (new Date(value) === "Invalid Date") {
    throw new Error("Invalid date")
  }

  return moment(new Date(value))
}
