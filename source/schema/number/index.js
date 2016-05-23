// {defaultTo} -> f() -> true | false | Error
export default function number (options = {}) {
  const {defaultTo} = options

  if (defaultTo) {
    return (value = defaultTo) => Number(value)
  }

  return (value) => Number(value)
}
