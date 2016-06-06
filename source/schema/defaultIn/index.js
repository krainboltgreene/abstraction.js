// (anything) -> f() -> f(anything) -> f()
export default function defaultIn (value, cast) {
  return (raw) => cast(raw || value)
}
