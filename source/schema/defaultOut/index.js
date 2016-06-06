// (anything) -> f() -> f(anything) -> f() | anything
export default function defaultOut (value, cast) {
  return (raw) => cast(raw) || value
}
