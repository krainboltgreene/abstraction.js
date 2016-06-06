// (f(), anything) -> f(anything) -> f() | anything
export default function defaultOut (cast, value) {
  return (raw) => cast(raw) || value
}
