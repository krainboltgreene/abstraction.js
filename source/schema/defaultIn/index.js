// (f(), anything) -> f(anything) -> f()
export default function defaultIn (cast, value) {
  return (raw) => cast(raw || value)
}
