// anything -> f() -> fa()
export default function defaultOut (value, cast) {
  return (raw) => cast(raw) || value
}
