// anything -> f() -> fa()
export default function defaultIn (value, cast) {
  return (raw) => cast(raw || value)
}
