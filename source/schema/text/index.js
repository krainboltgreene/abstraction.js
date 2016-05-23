// {defaultTo} -> f() -> true | false | Error
export default function text (options = {}) {
  const {defaultTo} = options

  if (defaultTo) {
    return (value = defaultTo) => String(value)
  }

  return (value) => String(value)
}
