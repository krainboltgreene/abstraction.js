// {defaultTo, nullAllowed} -> f() -> true | false | Error
export default function boolean (options = {}) {
  const {defaultTo} = options

  if (defaultTo) {
    return (value = defaultTo) => Boolean(value)
  }

  return (value) => Boolean(value)
}
