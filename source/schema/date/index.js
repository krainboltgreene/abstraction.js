// f() -> Date | Error
export default function date (value) {
  if (new Date(value) === "Invalid date") {
    throw new Error("Invalid date")
  }

  return new Date(value)
}
