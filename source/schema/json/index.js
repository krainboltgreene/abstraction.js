// f() -> anything | Error
export default function json (value) {
  if (value instanceof String) {
    throw new Error("Non-string given to JSON.parse()")
  }

  return JSON.parse(value)
}
